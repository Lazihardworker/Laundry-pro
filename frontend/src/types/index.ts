export interface User {
  id: string;
  phone: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  profilePictureUrl?: string;
  address?: Address;
  notificationPreferences?: NotificationPreferences;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  lga?: string;
  instructions?: string;
}

export interface NotificationPreferences {
  sms: boolean;
  email: boolean;
  whatsapp: boolean;
}

export interface Service {
  id: string;
  name: string;
  category: 'BASIC' | 'PREMIUM' | 'EXPRESS' | 'CORPORATE';
  serviceType: string;
  basePrice: number;
  pricingUnit: string;
  estimatedHours: number;
  isExpress: boolean;
  branchId?: string;
  branch?: Branch;
  description?: string;
  careInstructions?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lga?: string;
  coordinates?: { lat: number; lng: number };
  phone: string;
  email?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  color?: string;
  brand?: string;
  size?: string;
  fabricType?: string;
}

export type OrderStatus = 'PENDING' | 'RECEIVED' | 'WASHING' | 'IRONING' | 'READY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer?: User;
  branchId: string;
  branch?: Branch;
  serviceId: string;
  service?: Service;
  assignedStaffId?: string;
  assignedStaff?: User;
  status: OrderStatus;
  pickupType: 'pickup' | 'dropoff' | 'delivery';
  pickupAddress: Address;
  pickupScheduledFor: string;
  pickupCompletedAt?: string;
  deliveryScheduledFor?: string;
  deliveryAddress?: Address;
  deliveryCompletedAt?: string;
  subtotal: number;
  deliveryFee: number;
  expressFee: number;
  discount: number;
  totalAmount: number;
  isExpress: boolean;
  promisedBy?: string;
  notes?: string;
  internalNotes?: string;
  priorityScore: number;
  items: OrderItem[];
  payments?: Payment[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  paymentProvider?: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paidAt?: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  orderId?: string;
  order?: Order;
  reporterId: string;
  reporter: User;
  issueType: 'damaged' | 'lost' | 'delay' | 'stain' | 'wrong_item' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  imageUrls?: string[];
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED';
  resolutionNotes?: string;
  resolvedById?: string;
  resolvedBy?: User;
  resolvedAt?: string;
  compensationAmount?: number;
  compensationType?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  orderId?: string;
  type: string;
  title: string;
  message: string;
  channels: string[];
  isRead: boolean;
  sentAt?: string;
  readAt?: string;
  data?: any;
  createdAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  rating: number;
  serviceQuality?: number;
  timeliness?: number;
  communication?: number;
  comment?: string;
  isVisible: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  issuesCount: number;
  staffCount: number;
  customerCount: number;
  onTimeRate: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
  details?: any;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface CreateOrderInput {
  serviceId: string;
  branchId: string;
  pickupType: 'pickup' | 'dropoff' | 'delivery';
  pickupAddress: Address;
  pickupScheduledFor: string;
  deliveryAddress?: Address;
  deliveryScheduledFor?: string;
  items: {
    itemName: string;
    quantity: number;
    unitPrice: number;
    color?: string;
    brand?: string;
    size?: string;
    fabricType?: string;
  }[];
  isExpress: boolean;
  notes?: string;
}
