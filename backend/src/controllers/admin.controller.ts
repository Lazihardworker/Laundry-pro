import { Response } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/error';

// Dashboard Statistics
export const getDashboardStats = async (req: any, res: Response) => {
  try {
    const { branchId, period = 'today' } = req.query;

    let startDate = new Date();
    const now = new Date();

    if (period === 'today') {
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const where: any = {
      createdAt: { gte: startDate },
    };

    if (branchId) {
      where.branchId = branchId;
    }

    // Get stats in parallel
    const [
      totalOrders,
      completedOrders,
      pendingOrders,
      totalRevenue,
      issuesCount,
      staffCount,
      customerCount,
    ] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.count({ where: { ...where, status: 'DELIVERED' } }),
      prisma.order.count({ where: { ...where, status: { in: ['PENDING', 'RECEIVED', 'WASHING', 'IRONING'] } } }),
      prisma.order.aggregate({
        where: { ...where, status: 'DELIVERED' },
        _sum: { totalAmount: true },
      }),
      prisma.issue.count({
        where: {
          createdAt: { gte: startDate },
          status: { in: ['OPEN', 'INVESTIGATING'] },
        },
      }),
      prisma.staff.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: 'CUSTOMER', isActive: true } }),
    ]);

    // Calculate on-time delivery rate
    const onTimeDeliveries = await prisma.order.count({
      where: {
        ...where,
        status: 'DELIVERED',
        completedAt: { lte: prisma.order.fields.promisedBy },
      },
    });

    const onTimeRate = completedOrders > 0 ? (onTimeDeliveries / completedOrders) * 100 : 0;

    // Get recent activity
    const recentOrders = await prisma.order.findMany({
      where,
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: { firstName: true, lastName: true, phone: true },
        },
        service: { select: { name: true } },
      },
    });

    // Get issues
    const issues = await prisma.issue.findMany({
      where: {
        createdAt: { gte: startDate },
        status: { in: ['OPEN', 'INVESTIGATING'] },
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        order: {
          select: { orderNumber: true },
        },
        reporter: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalOrders,
          completedOrders,
          pendingOrders,
          totalRevenue: totalRevenue._sum.totalAmount || 0,
          issuesCount,
          staffCount,
          customerCount,
          onTimeRate: Math.round(onTimeRate),
        },
        recentOrders,
        issues,
      },
    });
  } catch (error: any) {
    throw error;
  }
};

// Revenue Analytics
export const getRevenueAnalytics = async (req: any, res: Response) => {
  try {
    const { branchId, period = 'month' } = req.query;

    let startDate = new Date();
    const now = new Date();

    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const where: any = {
      createdAt: { gte: startDate },
      status: 'DELIVERED',
    };

    if (branchId) {
      where.branchId = branchId;
    }

    // Revenue by day
    const revenueByDay = await prisma.$queryRaw`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as orders,
        SUM(total_amount) as revenue
      FROM orders
      WHERE created_at >= ${startDate}
        AND status = 'DELIVERED'
        ${branchId ? prisma.$queryRaw`AND branch_id = ${branchId}` : prisma.$queryRaw``}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Revenue by service
    const revenueByService = await prisma.order.groupBy({
      by: ['serviceId'],
      where,
      _count: { id: true },
      _sum: { totalAmount: true },
    });

    // Get service details
    const services = await prisma.service.findMany({
      where: { id: { in: revenueByService.map((r) => r.serviceId) } },
      select: { id: true, name: true },
    });

    const revenueByServiceData = revenueByService.map((r) => ({
      serviceId: r.serviceId,
      serviceName: services.find((s) => s.id === r.serviceId)?.name || 'Unknown',
      orders: r._count.id,
      revenue: r._sum.totalAmount || 0,
    }));

    // Top customers
    const topCustomers = await prisma.order.groupBy({
      by: ['customerId'],
      where,
      _count: { id: true },
      _sum: { totalAmount: true },
      orderBy: { _sum: { totalAmount: 'desc' } },
      take: 10,
    });

    const customers = await prisma.user.findMany({
      where: { id: { in: topCustomers.map((c) => c.customerId) } },
      select: { id: true, firstName: true, lastName: true, phone: true },
    });

    const topCustomersData = topCustomers.map((c) => ({
      ...customers.find((cust) => cust.id === c.customerId),
      orders: c._count.id,
      totalSpent: c._sum.totalAmount || 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        revenueByDay,
        revenueByService: revenueByServiceData.sort((a, b) => b.revenue - a.revenue),
        topCustomers: topCustomersData,
      },
    });
  } catch (error: any) {
    throw error;
  }
};

// Get Staff Performance
export const getStaffPerformance = async (req: any, res: Response) => {
  try {
    const { branchId } = req.query;

    const staff = await prisma.staff.findMany({
      where: {
        ...(branchId && { branchId: branchId as string }),
        isActive: true,
      },
      include: {
        user: {
          select: { firstName: true, lastName: true, phone: true },
        },
        branch: {
          select: { name: true },
        },
      },
    });

    // Get orders completed by each staff member today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const staffWithStats = await Promise.all(
      staff.map(async (s) => {
        const ordersCount = await prisma.order.count({
          where: {
            assignedStaffId: s.userId,
            updatedAt: { gte: today },
          },
        });

        const reviews = await prisma.review.findMany({
          where: { staffId: s.userId },
          select: { rating: true },
        });

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : null;

        return {
          id: s.id,
          userId: s.userId,
          name: `${s.user.firstName} ${s.user.lastName}`,
          phone: s.user.phone,
          branch: s.branch.name,
          role: s.role,
          ordersToday: ordersCount,
          averageRating: avgRating || s.averageRating?.toNumber() || null,
          isActive: s.isActive,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: staffWithStats,
    });
  } catch (error: any) {
    throw error;
  }
};

// Get Branches
export const getBranches = async (req: any, res: Response) => {
  try {
    const branches = await prisma.branch.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            orders: true,
            staff: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error: any) {
    throw error;
  }
};

// Create Branch
export const createBranch = async (req: any, res: Response) => {
  try {
    const { name, address, city, state, lga, phone, email, coordinates, openingHours } = req.body;

    const branch = await prisma.branch.create({
      data: {
        name,
        address,
        city,
        state,
        lga,
        phone,
        email,
        coordinates,
        openingHours,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Branch created successfully',
      data: branch,
    });
  } catch (error: any) {
    throw error;
  }
};

// Get Issues
export const getIssues = async (req: any, res: Response) => {
  try {
    const { status, severity, branchId } = req.query;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (severity) {
      where.severity = severity;
    }

    const issues = await prisma.issue.findMany({
      where,
      include: {
        order: {
          select: { orderNumber: true },
        },
        reporter: {
          select: { firstName: true, lastName: true, phone: true },
        },
        resolvedBy: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error: any) {
    throw error;
  }
};

// Resolve Issue
export const resolveIssue = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { resolutionNotes, compensationAmount, compensationType } = req.body;
    const { userId } = req.user;

    const issue = await prisma.issue.update({
      where: { id },
      data: {
        status: 'RESOLVED',
        resolutionNotes,
        compensationAmount,
        compensationType,
        resolvedById: userId,
        resolvedAt: new Date(),
      },
      include: {
        order: {
          select: { orderNumber: true },
        },
        reporter: {
          select: { firstName: true, lastName: true, phone: true },
        },
      },
    });

    // Notify customer
    await prisma.notification.create({
      data: {
        userId: issue.reporterId,
        orderId: issue.orderId || undefined,
        type: 'issue_resolved',
        title: 'Issue Resolved',
        message: `Your reported issue has been resolved. ${resolutionNotes || ''}`,
        channels: ['in_app', 'sms'],
      },
    });

    res.status(200).json({
      success: true,
      message: 'Issue resolved successfully',
      data: issue,
    });
  } catch (error: any) {
    throw error;
  }
};
