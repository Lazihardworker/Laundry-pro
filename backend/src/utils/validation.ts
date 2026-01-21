import { z } from 'zod';

// Auth Schemas
export const registerSchema = z.object({
  phone: z.string().min(11, 'Phone number must be at least 11 digits'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase, one lowercase, and one number'
    ),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
});

export const loginSchema = z.object({
  phone: z.string().min(11, 'Phone number is required'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Service Schemas
export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  category: z.enum(['BASIC', 'PREMIUM', 'EXPRESS', 'CORPORATE']),
  serviceType: z.string().min(1, 'Service type is required'),
  basePrice: z.number().positive('Base price must be positive'),
  pricingUnit: z.string().min(1, 'Pricing unit is required'),
  estimatedHours: z.number().int().positive('Estimated hours must be positive'),
  isExpress: z.boolean().default(false),
  branchId: z.string().uuid().optional(),
  description: z.string().optional(),
  careInstructions: z.string().optional(),
});

// Order Schemas
export const createOrderSchema = z.object({
  serviceId: z.string().uuid('Invalid service ID'),
  branchId: z.string().uuid('Invalid branch ID'),
  pickupType: z.enum(['pickup', 'dropoff', 'delivery']),
  pickupAddress: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    instructions: z.string().optional(),
  }),
  pickupScheduledFor: z.string().datetime('Invalid pickup date/time'),
  deliveryAddress: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
  }).optional(),
  deliveryScheduledFor: z.string().datetime().optional(),
  items: z.array(z.object({
    itemName: z.string().min(1, 'Item name is required'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    unitPrice: z.number().positive('Unit price must be positive'),
    color: z.string().optional(),
    brand: z.string().optional(),
    size: z.string().optional(),
    fabricType: z.string().optional(),
  })).min(1, 'At least one item is required'),
  isExpress: z.boolean().default(false),
  notes: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'RECEIVED', 'WASHING', 'IRONING', 'READY', 'DELIVERED', 'CANCELLED']),
  notes: z.string().optional(),
});

export const assignStaffSchema = z.object({
  staffId: z.string().uuid('Invalid staff ID'),
});

// Issue Schemas
export const createIssueSchema = z.object({
  orderId: z.string().uuid().optional(),
  issueType: z.enum(['damaged', 'lost', 'delay', 'stain', 'wrong_item', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

// Staff Schemas
export const createStaffSchema = z.object({
  userId: z.string().uuid(),
  branchId: z.string().uuid(),
  role: z.string().min(1, 'Role is required'),
  permissions: z.record(z.boolean()).optional(),
  employeeId: z.string().optional(),
  salary: z.number().positive().optional(),
});

export const updateStaffSchema = z.object({
  role: z.string().optional(),
  permissions: z.record(z.boolean()).optional(),
  salary: z.number().positive().optional(),
  isActive: z.boolean().optional(),
});

// Review Schemas
export const createReviewSchema = z.object({
  orderId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  serviceQuality: z.number().int().min(1).max(5).optional(),
  timeliness: z.number().int().min(1).max(5).optional(),
  communication: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
});

// Branch Schemas
export const createBranchSchema = z.object({
  name: z.string().min(1, 'Branch name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  lga: z.string().optional(),
  phone: z.string().min(11, 'Phone number is required'),
  email: z.string().email('Invalid email').optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  openingHours: z.record(z.object({
    open: z.string(),
    close: z.string(),
  })).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type CreateIssueInput = z.infer<typeof createIssueSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
