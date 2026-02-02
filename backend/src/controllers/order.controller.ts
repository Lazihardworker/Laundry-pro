import { Response } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/error';
import { createOrderSchema, updateOrderStatusSchema, assignStaffSchema } from '../utils/validation';

// Generate Order Number
const generateOrderNumber = async (): Promise<string> => {
  const year = new Date().getFullYear();
  const prefix = `LRN-${year}`;

  const lastOrder = await prisma.order.findFirst({
    where: {
      orderNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      orderNumber: 'desc',
    },
  });

  let nextNumber = 1;
  if (lastOrder) {
    const lastNumber = parseInt(lastOrder.orderNumber.split('-').pop() || '0');
    nextNumber = lastNumber + 1;
  }

  return `${prefix}-${String(nextNumber).padStart(6, '0')}`;
};

// Create Order
export const createOrder = async (req: any, res: Response) => {
  try {
    const { userId } = req.user;
    const orderData = createOrderSchema.parse(req.body);

    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: orderData.serviceId },
    });

    if (!service || !service.isActive) {
      throw new AppError('Service not available', 400);
    }

    // Calculate totals
    const subtotal = orderData.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const deliveryFee = orderData.pickupType === 'delivery' ? 1500 : 500;
    const expressFee = orderData.isExpress ? subtotal * 0.5 : 0;
    const total = subtotal + deliveryFee + expressFee;

    // Calculate promised time
    const promisedBy = new Date(orderData.pickupScheduledFor);
    promisedBy.setHours(promisedBy.getHours() + service.estimatedHours);

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: await generateOrderNumber(),
        customerId: userId,
        branchId: orderData.branchId,
        serviceId: orderData.serviceId,
        pickupType: orderData.pickupType,
        pickupAddress: JSON.stringify(orderData.pickupAddress),
        pickupScheduledFor: new Date(orderData.pickupScheduledFor),
        deliveryAddress: orderData.deliveryAddress ? JSON.stringify(orderData.deliveryAddress) : null,
        deliveryScheduledFor: orderData.deliveryScheduledFor
          ? new Date(orderData.deliveryScheduledFor)
          : null,
        subtotal,
        deliveryFee,
        expressFee,
        discount: 0,
        totalAmount: total,
        isExpress: orderData.isExpress,
        promisedBy,
        notes: orderData.notes,
        priorityScore: orderData.isExpress ? 10 : 5,
        items: {
          create: orderData.items.map((item) => ({
            itemName: item.itemName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
            color: item.color,
            brand: item.brand,
            size: item.size,
            fabricType: item.fabricType,
          })),
        },
      },
      include: {
        items: true,
        service: true,
        branch: true,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: userId,
        orderId: order.id,
        type: 'order_created',
        title: 'Order Placed Successfully',
        message: `Your order ${order.orderNumber} has been placed. We'll pick up your clothes on ${new Date(order.pickupScheduledFor!).toLocaleDateString()}.`,
        channels: JSON.stringify(['in_app', 'sms', 'email']),
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: userId,
        orderId: order.id,
        action: 'order_created',
        entityType: 'order',
        entityId: order.id,
        newValues: JSON.stringify(order),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    throw error;
  }
};

// Get Orders
export const getOrders = async (req: any, res: Response) => {
  try {
    const { userId, role } = req.user;
    const {
      status,
      limit = '20',
      page = '1',
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const where: any = {};

    // Filter by role
    if (role === 'CUSTOMER') {
      where.customerId = userId;
    } else if (role === 'STAFF') {
      // Get staff's branch
      const staff = await prisma.staff.findUnique({
        where: { userId },
      });
      if (staff) {
        where.branchId = staff.branchId;
      }
    }

    // Filter by status
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
          service: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
          branch: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
          assignedStaff: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          items: true,
        },
        orderBy: { [sortBy as string]: order as 'asc' | 'desc' },
        take: parseInt(limit as string),
        skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      }),
      prisma.order.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error: any) {
    throw error;
  }
};

// Get Single Order
export const getOrder = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            address: true,
          },
        },
        service: true,
        branch: true,
        assignedStaff: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        items: true,
        payments: true,
        issues: true,
        notifications: true,
      },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Check access
    if (role === 'CUSTOMER' && order.customerId !== userId) {
      throw new AppError('Access denied', 403);
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    throw error;
  }
};

// Update Order Status
export const updateOrderStatus = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { status, notes } = updateOrderStatusSchema.parse(req.body);

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status,
        internalNotes: notes || order.internalNotes,
        ...(status === 'DELIVERED' && { deliveryCompletedAt: new Date() }),
        ...(status === 'RECEIVED' && { pickupCompletedAt: new Date() }),
        ...(status === 'DELIVERED' && { completedAt: new Date() }),
      },
      include: {
        customer: true,
        service: true,
      },
    });

    // Create notification for customer
    await prisma.notification.create({
      data: {
        userId: order.customerId,
        orderId: order.id,
        type: 'order_status_update',
        title: 'Order Status Updated',
        message: `Your order ${order.orderNumber} is now ${status.replace('_', ' ')}.`,
        channels: JSON.stringify(['in_app', 'sms']),
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        orderId: order.id,
        action: 'status_updated',
        entityType: 'order',
        entityId: order.id,
        oldValues: JSON.stringify({ status: order.status }),
        newValues: JSON.stringify({ status }),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    throw error;
  }
};

// Assign Staff to Order
export const assignStaff = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { staffId } = assignStaffSchema.parse(req.body);

    const order = await prisma.order.update({
      where: { id },
      data: { assignedStaffId: staffId },
      include: {
        assignedStaff: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: 'Staff assigned successfully',
      data: order,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }
    throw error;
  }
};

// Get Order Tracking
export const trackOrder = async (req: any, res: Response) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        pickupScheduledFor: true,
        deliveryScheduledFor: true,
        promisedBy: true,
        service: {
          select: {
            name: true,
            estimatedHours: true,
          },
        },
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        branch: {
          select: {
            name: true,
            address: true,
            phone: true,
          },
        },
        assignedStaff: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Calculate timeline
    const timeline = [
      {
        status: 'PENDING',
        label: 'Order Placed',
        completed: true,
        time: order.pickupScheduledFor,
      },
      {
        status: 'RECEIVED',
        label: 'Picked Up',
        completed: ['RECEIVED', 'WASHING', 'IRONING', 'READY', 'DELIVERED'].includes(order.status),
      },
      {
        status: 'WASHING',
        label: 'Washing',
        completed: ['WASHING', 'IRONING', 'READY', 'DELIVERED'].includes(order.status),
      },
      {
        status: 'IRONING',
        label: 'Ironing',
        completed: ['IRONING', 'READY', 'DELIVERED'].includes(order.status),
      },
      {
        status: 'READY',
        label: 'Ready',
        completed: ['READY', 'DELIVERED'].includes(order.status),
      },
      {
        status: 'DELIVERED',
        label: 'Delivered',
        completed: order.status === 'DELIVERED',
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        ...order,
        timeline,
      },
    });
  } catch (error: any) {
    throw error;
  }
};
