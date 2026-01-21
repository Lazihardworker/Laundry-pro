import axios, { AxiosError } from 'axios';
import type {
  User,
  AuthResponse,
  Service,
  Order,
  ApiResponse,
  CreateOrderInput,
  DashboardStats,
  Issue,
  Notification,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, logout user
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (data: {
    phone: string;
    email?: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  login: async (phone: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', {
      phone,
      password,
    });
    return response.data.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<ApiResponse<User>>('/auth/profile', data);
    return response.data.data;
  },
};

// Services API
export const servicesApi = {
  getAll: async (params?: {
    category?: string;
    branchId?: string;
  }): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>('/services', { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<Service> => {
    const response = await api.get<ApiResponse<Service>>(`/services/${id}`);
    return response.data.data;
  },
};

// Orders API
export const ordersApi = {
  getAll: async (params?: {
    status?: string;
    limit?: number;
    page?: number;
  }): Promise<{ orders: Order[]; pagination: any }> => {
    const response = await api.get<ApiResponse<{ orders: Order[]; pagination: any }>>('/orders', {
      params,
    });
    return response.data.data;
  },

  getById: async (id: string): Promise<Order> => {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  },

  create: async (data: CreateOrderInput): Promise<Order> => {
    const response = await api.post<ApiResponse<Order>>('/orders', data);
    return response.data.data;
  },

  updateStatus: async (id: string, status: string, notes?: string): Promise<Order> => {
    const response = await api.patch<ApiResponse<Order>>(`/orders/${id}/status`, {
      status,
      notes,
    });
    return response.data.data;
  },

  track: async (orderNumber: string): Promise<Order> => {
    const response = await api.get<ApiResponse<Order>>(`/orders/track/${orderNumber}`);
    return response.data.data;
  },

  assignStaff: async (id: string, staffId: string): Promise<Order> => {
    const response = await api.patch<ApiResponse<Order>>(`/orders/${id}/assign`, {
      staffId,
    });
    return response.data.data;
  },
};

// Admin API
export const adminApi = {
  getDashboardStats: async (params?: {
    branchId?: string;
    period?: string;
  }): Promise<DashboardStats & { recentOrders: Order[]; issues: Issue[] }> => {
    const response = await api.get<ApiResponse<any>>('/admin/dashboard', { params });
    return response.data.data;
  },

  getRevenueAnalytics: async (params?: {
    branchId?: string;
    period?: string;
  }): Promise<any> => {
    const response = await api.get<ApiResponse<any>>('/admin/analytics/revenue', { params });
    return response.data.data;
  },

  getStaffPerformance: async (params?: {
    branchId?: string;
  }): Promise<any[]> => {
    const response = await api.get<ApiResponse<any[]>>('/admin/staff/performance', { params });
    return response.data.data;
  },

  getBranches: async (): Promise<any[]> => {
    const response = await api.get<ApiResponse<any[]>>('/admin/branches');
    return response.data.data;
  },

  createBranch: async (data: any): Promise<any> => {
    const response = await api.post<ApiResponse<any>>('/admin/branches', data);
    return response.data.data;
  },

  getIssues: async (params?: {
    status?: string;
    severity?: string;
  }): Promise<Issue[]> => {
    const response = await api.get<ApiResponse<Issue[]>>('/admin/issues', { params });
    return response.data.data;
  },

  resolveIssue: async (id: string, data: {
    resolutionNotes: string;
    compensationAmount?: number;
    compensationType?: string;
  }): Promise<Issue> => {
    const response = await api.patch<ApiResponse<Issue>>(`/admin/issues/${id}/resolve`, data);
    return response.data.data;
  },
};

export default api;
