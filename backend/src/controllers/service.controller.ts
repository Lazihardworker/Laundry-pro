import { Response } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/error';
import { createServiceSchema } from '../utils/validation';

// Get All Services
export const getServices = async (req: any, res: Response) => {
  try {
    const { category, branchId, isActive } = req.query;

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    } else {
      where.isActive = true;
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
          },
        },
      },
      orderBy: {
        basePrice: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error: any) {
    throw error;
  }
};

// Get Single Service
export const getService = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        branch: true,
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    if (!service) {
      throw new AppError('Service not found', 404);
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    throw error;
  }
};

// Create Service (Admin only)
export const createService = async (req: any, res: Response) => {
  try {
    const serviceData = createServiceSchema.parse(req.body);

    const service = await prisma.service.create({
      data: serviceData,
      include: {
        branch: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
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

// Update Service (Admin only)
export const updateService = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, serviceType, basePrice, pricingUnit, estimatedHours, isExpress, description, careInstructions, isActive } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(serviceType && { serviceType }),
        ...(basePrice && { basePrice }),
        ...(pricingUnit && { pricingUnit }),
        ...(estimatedHours && { estimatedHours }),
        ...(isExpress !== undefined && { isExpress }),
        ...(description !== undefined && { description }),
        ...(careInstructions !== undefined && { careInstructions }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        branch: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error: any) {
    throw error;
  }
};

// Delete Service (Admin only)
export const deleteService = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    // Check if service has orders
    const ordersCount = await prisma.order.count({
      where: { serviceId: id },
    });

    if (ordersCount > 0) {
      // Soft delete - just mark as inactive
      await prisma.service.update({
        where: { id },
        data: { isActive: false },
      });

      return res.status(200).json({
        success: true,
        message: 'Service deactivated successfully',
      });
    }

    // Hard delete if no orders
    await prisma.service.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    throw error;
  }
};
