// Order statuses with colors and icons
export const ORDER_STATUSES = {
  PENDING: { label: 'Pending', color: 'gray', icon: '⏳' },
  RECEIVED: { label: 'Received', color: 'blue', icon: '📦' },
  WASHING: { label: 'Washing', color: 'cyan', icon: '🧺' },
  DRY_CLEANING: { label: 'Dry Cleaning', color: 'purple', icon: '🧥' },
  IRONING: { label: 'Ironing', color: 'violet', icon: '👔' },
  READY: { label: 'Ready', color: 'green', icon: '✅' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'amber', icon: '🚚' },
  DELIVERED: { label: 'Delivered', color: 'emerald', icon: '✓' },
  CANCELLED: { label: 'Cancelled', color: 'red', icon: '✕' },
} as const;

// Service types
export const SERVICE_TYPES = {
  BASIC_WASH_IRON: {
    id: 'basic_wash_iron',
    name: 'Basic Wash & Iron',
    description: 'Standard wash and iron service',
    basePrice: 500,
    unit: 'piece',
    duration: '2-3 days',
    icon: '👕',
    color: 'blue',
  },
  DRY_CLEAN: {
    id: 'dry_clean',
    name: 'Dry Cleaning',
    description: 'Professional dry cleaning',
    basePrice: 1500,
    unit: 'piece',
    duration: '3-4 days',
    icon: '🧥',
    color: 'purple',
  },
  EXPRESS: {
    id: 'express',
    name: 'Express Service',
    description: 'Same day service',
    basePrice: 800,
    unit: 'piece',
    duration: 'Same day (6pm)',
    icon: '⚡',
    color: 'amber',
  },
  CORPORATE: {
    id: 'corporate',
    name: 'Corporate Plan',
    description: 'Monthly subscription for businesses',
    basePrice: 0,
    unit: 'month',
    duration: 'Monthly',
    icon: '🏢',
    color: 'indigo',
  },
} as const;

// Available items for ordering
export const ITEMS_CATALOG = {
  shirts: { name: 'Shirt', price: 500, icon: '👔', category: 'wash_iron' },
  trousers: { name: 'Trousers', price: 500, icon: '👖', category: 'wash_iron' },
  suits: { name: 'Suit (2-piece)', price: 2000, icon: '🤵', category: 'dry_clean' },
  dresses: { name: 'Dress', price: 800, icon: '👗', category: 'dry_clean' },
  bed_sheets: { name: 'Bed Sheet', price: 600, icon: '🛏️', category: 'wash_iron' },
  blankets: { name: 'Blanket/Throw', price: 1200, icon: '🛋️', category: 'dry_clean' },
  jackets: { name: 'Jacket/Blazer', price: 1000, icon: '🧥', category: 'dry_clean' },
  ties: { name: 'Tie', price: 300, icon: '👔', category: 'dry_clean' },
  native_wear: { name: 'Native Wear', price: 800, icon: '👘', category: 'wash_iron' },
  jeans: { name: 'Jeans', price: 600, icon: '👖', category: 'wash_iron' },
  underwear: { name: 'Underwear (per pair)', price: 200, icon: '🩲', category: 'wash_iron' },
  socks: { name: 'Socks (per pair)', price: 150, icon: '🧦', category: 'wash_iron' },
} as const;

// Time slots for pickup/delivery
export const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', time: '08:00 - 11:00' },
  { id: 'midday', label: 'Midday', time: '11:00 - 14:00' },
  { id: 'afternoon', label: 'Afternoon', time: '14:00 - 17:00' },
  { id: 'evening', label: 'Evening', time: '17:00 - 20:00' },
] as const;

// User roles
export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN',
} as const;

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    VERIFY: '/api/auth/verify',
    REFRESH: '/api/auth/refresh',
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    GET: (id: string) => `/api/orders/${id}`,
    UPDATE: (id: string) => `/api/orders/${id}`,
    DELETE: (id: string) => `/api/orders/${id}`,
    HISTORY: '/api/orders/history',
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/profile',
    ADDRESSES: '/api/user/addresses',
  },
  STAFF: {
    DASHBOARD: '/api/staff/dashboard',
    TASKS: '/api/staff/tasks',
    UPDATE_STATUS: (id: string) => `/api/staff/orders/${id}/status`,
  },
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    ANALYTICS: '/api/admin/analytics',
    STAFF: '/api/admin/staff',
    SERVICES: '/api/admin/services',
    REPORTS: '/api/admin/reports',
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
  },
} as const;
