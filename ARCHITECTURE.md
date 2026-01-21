# LaundryPro - Product Architecture Document

## 🎯 PRODUCT VISION

LaundryPro is a modern, scalable web application for professional laundry & dry-cleaning businesses in Nigeria. The platform enables customers to easily place orders, track progress, and manage their laundry needs while providing business owners with powerful tools to manage operations, staff, and growth.

---

## 📊 BUSINESS CONTEXT

### Target Users
1. **Customers** - Non-technical, mobile-first users seeking convenient laundry services
2. **Staff** - Operations team processing orders and managing daily tasks
3. **Admin/Owner** - CEO/Management overseeing business performance and growth

### Core Business Goals
- Reduce operational errors (lost clothes, delays)
- Improve customer communication and experience
- Streamline order tracking and status updates
- Enable data-driven decision making
- Scale to multiple branches

---

## 🏗️ TECHNICAL STACK

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 14.1.0 |
| **TypeScript** | Type Safety | 5.x |
| **Tailwind CSS** | Styling | 3.3+ |
| **Radix UI** | Component Library | Latest |
| **Framer Motion** | Animations | 12.27+ |
| **TanStack Query** | Data Fetching | 5.17+ |
| **Zustand** | State Management | 4.5+ |
| **Recharts** | Data Visualization | 2.10+ |
| **Lucide React** | Icons | 0.309+ |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 20+ |
| **Express** | Web Framework | 4.18+ |
| **TypeScript** | Type Safety | 5.3+ |
| **Prisma** | Database ORM | 5.8+ |
| **PostgreSQL** | Primary Database | 15+ |
| **JWT** | Authentication | 9.0+ |
| **Zod** | Validation | 3.22+ |
| **bcryptjs** | Password Hashing | 2.4+ |

### Infrastructure (Recommended)
- **Hosting**: Vercel (Frontend), Railway/Render (Backend)
- **Database**: Supabase/Neon/Amazon RDS
- **Storage**: AWS S3/Cloudflare R2 (for images)
- **Notifications**: Twilio (SMS), WhatsApp Business API

---

## 🗄️ DATABASE SCHEMA

### Core Tables

#### Users
```prisma
- id (UUID, PK)
- phone (unique)
- email (unique, optional)
- password_hash
- first_name, last_name
- role (CUSTOMER | STAFF | ADMIN)
- address (JSON)
- notification_preferences (JSON)
- is_active, is_verified
- timestamps
```

#### Branches
```prisma
- id (UUID, PK)
- name, address, city, state, lga
- coordinates (JSON)
- phone, email
- opening_hours (JSON)
- is_active
- timestamps
```

#### Services
```prisma
- id (UUID, PK)
- name, category (BASIC|PREMIUM|EXPRESS|CORPORATE)
- service_type
- base_price, pricing_unit
- estimated_hours
- is_express
- branch_id (FK)
- description, care_instructions
- timestamps
```

#### Orders
```prisma
- id (UUID, PK)
- order_number (unique)
- customer_id, branch_id, service_id (FK)
- assigned_staff_id (FK, optional)
- status (PENDING|RECEIVED|WASHING|IRONING|READY|DELIVERED|CANCELLED)
- pickup_type, pickup_address, pickup_scheduled_for
- delivery_address, delivery_scheduled_for
- subtotal, delivery_fee, express_fee, discount, total_amount
- is_express, promised_by
- items (relation to OrderItem)
- timestamps
```

#### Order Items
```prisma
- id (UUID, PK)
- order_id (FK)
- item_name, quantity
- unit_price, total_price
- color, brand, size, fabric_type
- condition_received, condition_returned
- image_urls
- timestamp
```

#### Payments
```prisma
- id (UUID, PK)
- order_id (FK)
- amount
- payment_method, payment_provider
- provider_reference, provider_response
- status (PENDING|PROCESSING|COMPLETED|FAILED|REFUNDED)
- paid_at, timestamps
```

#### Staff
```prisma
- id (UUID, PK)
- user_id (unique FK)
- branch_id (FK)
- role, permissions (JSON)
- employee_id (unique)
- hire_date, salary
- total_orders_handled, average_rating
- timestamps
```

#### Issues
```prisma
- id (UUID, PK)
- order_id (FK, optional)
- reporter_id (FK)
- issue_type, severity
- description, image_urls
- status (OPEN|INVESTIGATING|RESOLVED|CLOSED)
- resolved_by_id, resolution_notes
- compensation_amount, compensation_type
- timestamps
```

#### Notifications
```prisma
- id (UUID, PK)
- user_id (FK)
- order_id (FK, optional)
- type, title, message
- channels (array)
- is_read, sent_at, read_at
- data (JSON)
- timestamps
```

#### Subscriptions
```prisma
- id (UUID, PK)
- customer_id (FK)
- plan_name, plan_type
- max_items_per_month, max_pickups_per_month
- monthly_price
- start_date, end_date
- billing_cycle
- status (ACTIVE|PAUSED|CANCELLED|EXPIRED)
- is_auto_renew
- timestamps
```

#### Reviews
```prisma
- id (UUID, PK)
- order_id (unique FK)
- customer_id, staff_id (FK)
- rating, service_quality, timeliness, communication
- comment
- response_text, responded_by, responded_at
- is_visible
- timestamps
```

#### Activity Logs
```prisma
- id (UUID, PK)
- user_id (FK, optional)
- order_id (FK, optional)
- action, entity_type, entity_id
- old_values, new_values (JSON)
- description
- ip_address, user_agent
- timestamp
```

---

## 🎨 UI/UX DESIGN PRINCIPLES

### Design Philosophy
- **Minimalist & Clean**: Reduce cognitive load
- **Mobile-First**: Optimize for small screens first
- **Color Coding**: Use consistent colors for order statuses
- **Large Touch Targets**: Minimum 44px for interactive elements
- **Progressive Disclosure**: Show information as needed

### Status Color Coding
| Status | Color | Hex |
|--------|-------|-----|
| Pending | Gray | #F3F4F6 |
| Received | Blue | #DBEAFE |
| Washing | Cyan | #ECFEFF |
| Ironing | Purple | #FAF5FF |
| Ready | Green | #F0FDF4 |
| Delivered | Emerald | #D1FAE5 |
| Cancelled | Red | #FEF2F2 |

---

## 📱 USER FLOWS

### Customer Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CUSTOMER JOURNEY                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. LANDING                                                         │
│     ├─ View services & pricing                                     │
│     ├─ Learn about features                                        │
│     └─ Register/Login                                              │
│                                                                     │
│  2. PLACE ORDER                                                    │
│     ├─ Select service type (Basic/Premium/Express/Corporate)       │
│     ├─ Choose branch                                               │
│     ├─ Add items (name, quantity, details)                         │
│     ├─ Select pickup option (pickup/dropoff/delivery)              │
│     ├─ Schedule pickup/delivery time                               │
│     ├─ Add notes                                                   │
│     └─ Confirm order                                               │
│                                                                     │
│  3. TRACK ORDER                                                    │
│     ├─ View order status                                           │
│     ├─ See progress indicator                                      │
│     ├─ View estimated completion time                              │
│     └─ Get real-time notifications                                 │
│                                                                     │
│  4. ORDER HISTORY                                                  │
│     ├─ View all past orders                                        │
│     ├─ Filter by status                                            │
│     ├─ Reorder previous items                                      │
│     └─ Leave review & rating                                       │
│                                                                     │
│  5. PROFILE                                                        │
│     ├─ Manage address                                              │
│     ├─ Notification preferences                                    │
│     └─ Subscription management                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Staff Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                           STAFF JOURNEY                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. DASHBOARD                                                      │
│     ├─ View assigned orders                                        │
│     ├─ See pending tasks                                           │
│     └─ Check today's schedule                                      │
│                                                                     │
│  2. PROCESS ORDERS                                                 │
│     ├─ Receive order (confirm items)                               │
│     ├─ Update status (Washing → Ironing → Ready)                   │
│     ├─ Flag issues (damaged, stains, delays)                       │
│     └─ Add internal notes                                          │
│                                                                     │
│  3. DELIVERY MANAGEMENT                                            │
│     ├─ Mark pickup complete                                        │
│     ├─ Schedule delivery                                           │
│     └─ Confirm delivery                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Admin Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                            ADMIN JOURNEY                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. DASHBOARD                                                      │
│     ├─ KPI overview (Revenue, Orders, On-time rate)                │
│     ├─ Charts & analytics                                          │
│     ├─ Recent orders                                               │
│     ├─ Active issues                                               │
│     └─ Staff performance                                           │
│                                                                     │
│  2. ORDERS MANAGEMENT                                              │
│     ├─ View all orders                                             │
│     ├─ Filter by status, date, branch                              │
│     ├─ Assign orders to staff                                      │
│     └─ Handle issues/complaints                                    │
│                                                                     │
│  3. BRANCHES                                                       │
│     ├─ Create/Edit branches                                        │
│     ├─ View branch performance                                     │
│     └─ Manage branch services                                      │
│                                                                     │
│  4. SERVICES                                                       │
│     ├─ Create/Edit services                                        │
│     ├─ Set pricing                                                 │
│     └─ Update service descriptions                                 │
│                                                                     │
│  5. STAFF MANAGEMENT                                               │
│     ├─ Add/Remove staff                                            │
│     ├─ Set permissions                                             │
│     ├─ View performance metrics                                    │
│     └─ Manage salaries & details                                   │
│                                                                     │
│  6. CUSTOMERS                                                      │
│     ├─ View customer database                                      │
│     ├─ See customer history                                        │
│     └─ Manage subscriptions                                        │
│                                                                     │
│  7. REPORTS                                                        │
│     ├─ Daily/Weekly/Monthly reports                                │
│     ├─ Revenue analytics                                           │
│     ├─ Performance metrics                                         │
│     └─ Export data                                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 SECURITY & AUTHENTICATION

### Authentication Flow
1. User registers with phone + password (email optional)
2. Password hashed with bcrypt (10 rounds)
3. JWT tokens generated (access: 15min, refresh: 7 days)
4. Tokens stored securely (httpOnly cookies recommended)
5. Token refresh on expiry

### Role-Based Access Control (RBAC)
| Role | Permissions |
|------|-------------|
| **CUSTOMER** | Create orders, view own orders, update profile, leave reviews |
| **STAFF** | View assigned orders, update status, flag issues |
| **ADMIN** | Full access + staff/branch/service management, reports |

### Security Best Practices
- Rate limiting on all endpoints
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (helmet, CSP)
- CORS configuration
- Secure password hashing
- Environment variable protection

---

## 📡 API STRUCTURE

### REST API Endpoints

#### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
POST   /api/auth/refresh-token - Refresh access token
GET    /api/auth/me            - Get current user
PATCH  /api/auth/profile       - Update profile
```

#### Services
```
GET    /api/services           - List all services
GET    /api/services/:id       - Get service details
POST    /api/services           - Create service (Admin)
PATCH  /api/services/:id       - Update service (Admin)
DELETE /api/services/:id       - Delete service (Admin)
```

#### Orders
```
GET    /api/orders             - List orders (filtered by role)
GET    /api/orders/:id         - Get order details
POST   /api/orders             - Create new order
PATCH  /api/orders/:id/status  - Update order status
PATCH  /api/orders/:id/assign  - Assign staff to order
GET    /api/orders/track/:number - Track order by number
```

#### Admin
```
GET    /api/admin/dashboard    - Dashboard stats
GET    /api/admin/analytics/revenue - Revenue analytics
GET    /api/admin/staff/performance - Staff performance
GET    /api/admin/branches     - List branches
POST   /api/admin/branches     - Create branch
GET    /api/admin/issues       - List issues
PATCH  /api/admin/issues/:id/resolve - Resolve issue
```

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "error": null,
  "details": null
}
```

---

## 🚀 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT DIAGRAM                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│   │   Next.js    │      │   Express    │      │  PostgreSQL  │    │
│   │  (Frontend)  │◄────►│   (Backend)  │◄────►│  (Database)  │    │
│   │    Vercel    │      │   Railway    │      │   Supabase   │    │
│   └──────────────┘      └──────────────┘      └──────────────┘    │
│         ▲                       │                                   │
│         │                       │                                   │
│         │                       ▼                                   │
│         │                ┌──────────────┐                           │
│         │                │  AWS S3/     │                           │
│         │                │  Cloudflare  │                           │
│         │                │  (Images)    │                           │
│         │                └──────────────┘                           │
│         │                                                           │
│         ▼                                                           │
│   ┌──────────────┐                                                 │
│   │   Customer   │                                                 │
│   │   Mobile/Browser                                                │
│   └──────────────┘                                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📈 SCALABILITY CONSIDERATIONS

### Multi-Branch Ready
- Branch-based data filtering
- Staff assignment per branch
- Service availability per branch
- Branch performance analytics

### Future Enhancements
1. **Mobile Apps** - React Native for iOS/Android
2. **Payment Integration** - Paystack, Flutterwave
3. **WhatsApp Integration** - Order updates via WhatsApp
4. **SMS Notifications** - Twilio integration
5. **Loyalty Program** - Points and rewards system
6. **Route Optimization** - Delivery route planning
7. **AI Recommendations** - Wash frequency suggestions

---

## 🧪 TESTING STRATEGY

### Unit Tests
- Controller logic
- Utility functions
- Validation schemas

### Integration Tests
- API endpoints
- Database operations
- Authentication flows

### E2E Tests
- Critical user flows:
  - Customer placing order
  - Staff updating order status
  - Admin viewing dashboard

---

## 📋 MVP DEVELOPMENT ROADMAP

### Phase 1: Foundation (Week 1-2)
- ✅ Database schema design
- ✅ Backend API structure
- ✅ Frontend routing setup
- ✅ Authentication system
- ✅ Basic UI components

### Phase 2: Customer Features (Week 3-4)
- Service selection & pricing
- Order placement flow
- Order tracking
- Order history
- Customer profile

### Phase 3: Staff Features (Week 5)
- Staff dashboard
- Order management interface
- Status updates
- Issue reporting

### Phase 4: Admin Features (Week 6-7)
- Admin dashboard
- KPI & analytics
- Branch management
- Staff management
- Service management
- Reports

### Phase 5: Polish & Launch (Week 8)
- Error handling
- Loading states
- Responsive design
- Performance optimization
- Security audit
- Deployment

---

## 🎯 SUCCESS METRICS

### Customer Experience
- Order placement time < 2 minutes
- Order status visibility 100%
- On-time delivery rate > 95%

### Business Operations
- Daily order tracking
- Revenue analytics
- Staff productivity tracking
- Issue resolution time < 24 hours

### Technical Performance
- API response time < 200ms
- Page load time < 2 seconds
- 99.9% uptime
- Zero data loss

---

*Document Version: 1.0*
*Last Updated: January 2026*
