import { PrismaClient, UserRole, ServiceCategory } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create branches
  const ikejaBranch = await prisma.branch.upsert({
    where: { id: 'ikeja-branch-1' },
    update: {},
    create: {
      id: 'ikeja-branch-1',
      name: 'Ikeja Branch',
      address: '123 Allen Avenue, Ikeja',
      city: 'Ikeja',
      state: 'Lagos',
      lga: 'Ikeja',
      phone: '+234 801 234 5678',
      email: 'ikeja@laundrypro.com',
      coordinates: { lat: 6.6018, lng: 3.3515 },
      openingHours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '18:00' },
        sunday: { open: 'closed' }
      }
    }
  });

  const lekkiBranch = await prisma.branch.upsert({
    where: { id: 'lekki-branch-1' },
    update: {},
    create: {
      id: 'lekki-branch-1',
      name: 'Lekki Branch',
      address: '45 Admiralty Way, Lekki',
      city: 'Lekki',
      state: 'Lagos',
      lga: 'Eti-Osa',
      phone: '+234 802 345 6789',
      email: 'lekki@laundrypro.com',
      coordinates: { lat: 6.4281, lng: 3.4219 },
      openingHours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '18:00' },
        sunday: { open: 'closed' }
      }
    }
  });

  console.log('Branches created');

  // Create admin user
  const adminPasswordHash = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { phone: '+2348000000001' },
    update: {},
    create: {
      id: 'admin-user-1',
      phone: '+2348000000001',
      email: 'admin@laundrypro.com',
      passwordHash: adminPasswordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isVerified: true,
      isActive: true
    }
  });

  // Create staff users
  const staffPasswordHash = await bcrypt.hash('Staff123!', 12);
  const staff1 = await prisma.user.upsert({
    where: { phone: '+2348000000002' },
    update: {},
    create: {
      id: 'staff-user-1',
      phone: '+2348000000002',
      email: 'emmanuel@laundrypro.com',
      passwordHash: staffPasswordHash,
      firstName: 'Emmanuel',
      lastName: 'Adebayo',
      role: UserRole.STAFF,
      isVerified: true,
      isActive: true
    }
  });

  const staff2 = await prisma.user.upsert({
    where: { phone: '+2348000000003' },
    update: {},
    create: {
      id: 'staff-user-2',
      phone: '+2348000000003',
      email: 'grace@laundrypro.com',
      passwordHash: staffPasswordHash,
      firstName: 'Grace',
      lastName: 'Okonkwo',
      role: UserRole.STAFF,
      isVerified: true,
      isActive: true
    }
  });

  // Create staff profiles
  await prisma.staff.upsert({
    where: { userId: staff1.id },
    update: {},
    create: {
      userId: staff1.id,
      branchId: ikejaBranch.id,
      role: 'washer',
      permissions: {
        canUpdateStatus: true,
        canViewOrders: true,
        canReportIssues: true
      },
      employeeId: 'STF001',
      hireDate: new Date('2024-01-01'),
      salary: 60000,
      averageRating: 4.8
    }
  });

  await prisma.staff.upsert({
    where: { userId: staff2.id },
    update: {},
    create: {
      userId: staff2.id,
      branchId: ikejaBranch.id,
      role: 'ironer',
      permissions: {
        canUpdateStatus: true,
        canViewOrders: true,
        canReportIssues: true
      },
      employeeId: 'STF002',
      hireDate: new Date('2024-01-01'),
      salary: 60000,
      averageRating: 4.9
    }
  });

  console.log('Staff created');

  // Create demo customer
  const customerPasswordHash = await bcrypt.hash('Customer123!', 12);
  const customer = await prisma.user.upsert({
    where: { phone: '+2348000000004' },
    update: {},
    create: {
      id: 'customer-user-1',
      phone: '+2348000000004',
      email: 'tunde.balogun@example.com',
      passwordHash: customerPasswordHash,
      firstName: 'Tunde',
      lastName: 'Balogun',
      role: UserRole.CUSTOMER,
      isVerified: true,
      isActive: true,
      address: {
        street: '12 Adeniran Ogunsanya',
        city: 'Surulere',
        state: 'Lagos',
        lga: 'Surulere'
      }
    }
  });

  console.log('Customer created');

  // Create services
  await prisma.service.upsert({
    where: { id: 'service-1' },
    update: {},
    create: {
      id: 'service-1',
      name: 'Wash & Iron',
      category: ServiceCategory.BASIC,
      serviceType: 'wash_iron',
      basePrice: 500,
      pricingUnit: 'piece',
      estimatedHours: 24,
      isExpress: false,
      description: 'Everyday clothes washed and ironed to perfection',
      careInstructions: 'Machine washable, warm iron'
    }
  });

  await prisma.service.upsert({
    where: { id: 'service-2' },
    update: {},
    create: {
      id: 'service-2',
      name: 'Dry Cleaning - Suit',
      category: ServiceCategory.PREMIUM,
      serviceType: 'dry_clean',
      basePrice: 1500,
      pricingUnit: 'piece',
      estimatedHours: 48,
      isExpress: false,
      description: 'Professional dry cleaning for suits and formal wear',
      careInstructions: 'Dry clean only, do not bleach'
    }
  });

  await prisma.service.upsert({
    where: { id: 'service-3' },
    update: {},
    create: {
      id: 'service-3',
      name: 'Express Service',
      category: ServiceCategory.EXPRESS,
      serviceType: 'express',
      basePrice: 750,
      pricingUnit: 'piece',
      estimatedHours: 6,
      isExpress: true,
      description: 'Same-day delivery for urgent laundry needs',
      careInstructions: 'Express handling'
    }
  });

  await prisma.service.upsert({
    where: { id: 'service-4' },
    update: {},
    create: {
      id: 'service-4',
      name: 'Bedding & Linens',
      category: ServiceCategory.BASIC,
      serviceType: 'wash_iron',
      basePrice: 1000,
      pricingUnit: 'piece',
      estimatedHours: 36,
      isExpress: false,
      description: 'Expert cleaning for bed sheets, pillowcases, and linens',
      careInstructions: 'Wash separately, tumble dry low'
    }
  });

  await prisma.service.upsert({
    where: { id: 'service-5' },
    update: {},
    create: {
      id: 'service-5',
      name: 'Corporate Monthly Plan',
      category: ServiceCategory.CORPORATE,
      serviceType: 'subscription',
      basePrice: 25000,
      pricingUnit: 'month',
      estimatedHours: 24,
      isExpress: false,
      description: 'Unlimited laundry for businesses and professionals',
      careInstructions: 'Premium service included'
    }
  });

  console.log('Services created');

  console.log('Seed completed successfully!');
  console.log('\nDemo accounts:');
  console.log('Admin: +2348000000001 / Admin123!');
  console.log('Staff: +2348000000002 / Staff123!');
  console.log('Customer: +2348000000004 / Customer123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
