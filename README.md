<<<<<<< HEAD
# MambaProperties Management System

A scalable, multi-tenant Property Management & Financial SaaS platform built with modern web technologies. MambaProperties automates rent collection, invoicing, tenant management, and financial reporting for property managers and landlords across Africa.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Phase Roadmap](#phase-roadmap)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

MambaProperties is a comprehensive property management solution designed to streamline operations for landlords, property managers, and tenants. The platform handles multiple properties, automates financial processes, and provides real-time insights into property performance.

### Problem Solved
- **Manual rent tracking** → Automated digital collection via M-Pesa
- **Paper invoicing** → Auto-generated digital invoices & receipts
- **Scattered tenant data** → Centralized multi-tenant database
- **No visibility into arrears** → Real-time financial dashboards
- **Slow maintenance response** → Tenant self-service issue tracking

### Target Users
- 🏘️ Property managers managing 10-1000+ properties
- 👨‍💼 Individual landlords with multiple rental units
- 🚀 Growing real estate companies needing scalability
- 🌍 Primary market: East Africa (Kenya focus, expandable)

---

## ✨ Key Features

### Phase 1: Core Rent Collection & Invoicing ✅
- **Multi-Tenant Architecture**: Separate secure spaces for each user
- **Property Management**: Register unlimited properties with unique IDs
- **M-Pesa Integration**: Direct rent collection via STK Push & Paybill
- **Automated Invoicing**: Monthly rent statements generated automatically
- **Digital Receipts**: Auto-generated, downloadable payment receipts
- **Tenant Profiles**: Centralized tenant information and history
- **Basic Dashboard**: Overview of properties, occupancy, and collections

### Phase 2: Automation & Reporting 🔄
- **Communication Hub**: Bulk SMS/Email for invoicing and reminders
- **Arrears Alerts**: Automated notifications for overdue payments
- **Financial Dashboards**: Revenue, vacancy, and arrears analytics
- **Admin Tools**: Landlord verification and subscription management
- **Audit Logs**: Complete activity tracking for compliance

### Phase 3: Tenant Portal & Marketplace 🏠
- **Tenant Self-Service**: Payment history, rent balance, downloads
- **Maintenance Requests**: Issue tracking with status updates
- **House Marketplace**: Public listing for tenant searches
- **Advanced Filters**: Location, price, size, availability
- **Viewing Appointments**: Schedule and manage property viewings

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT APPLICATIONS                       │
│   ┌──────────────┬──────────────┬──────────────────────┐   │
│   │ Web App      │ Mobile App   │ Admin Dashboard      │   │
│   │ (React/Vue)  │ (React Native)│ (React)             │   │
│   └──────────────┴──────────────┴──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY & SERVICES                    │
│   ┌────────────────────────────────────────────────────┐   │
│   │  Node.js/Express REST API                          │   │
│   │  - Authentication (JWT)                            │   │
│   │  - Rate Limiting & Middleware                      │   │
│   │  - Request Validation                              │   │
│   └────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                  MICROSERVICES / MODULES                     │
│  ┌──────────────┬──────────────┬──────────────┬──────────┐ │
│  │ User Service │ Property     │ Payment      │ Notif.   │ │
│  │              │ Service      │ Service      │ Service  │ │
│  ├──────────────┼──────────────┼──────────────┼──────────┤ │
│  │ Tenant Srv.  │ Invoice Srv. │ Analytics    │ Integ.   │ │
│  │              │              │ Service      │ Service  │ │
│  └──────────────┴──────────────┴──────────────┴──────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              EXTERNAL INTEGRATIONS & SERVICES                │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │ M-Pesa API   │ SMS Gateway  │ Email Service           │ │
│  │ (Safaricom)  │ (Twilio/etc) │ (SendGrid/AWS SES)      │ │
│  ├──────────────┼──────────────┼──────────────────────────┤ │
│  │ Cloud Storage│ Maps API     │ Analytics               │ │
│  │ (AWS S3)     │ (Google)     │ (Mixpanel/Amplitude)    │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  ┌──────────────────────┬──────────────────────────────┐   │
│  │ PostgreSQL / MongoDB │ Redis Cache                  │   │
│  │ (Primary Database)   │ (Session & Cache)            │   │
│  └──────────────────────┴──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Multi-Tenant SaaS Model**: Data isolation via `tenant_id` in all tables
2. **Microservices-Ready**: Independent services that can scale separately
3. **Stateless API**: Enables horizontal scaling and load balancing
4. **Real-Time Updates**: WebSocket support for live dashboards (Phase 2+)
5. **Scalability**: Database sharding strategy for 10,000+ properties

---

## 📅 Phase Roadmap

### Phase 1: Core MVP (6 Weeks) - KES 400,000
**Goal**: Get rent collection live and prove business value

- [x] User registration & authentication
- [x] Property & unit management
- [x] M-Pesa integration (STK Push & Paybill)
- [x] Automated monthly invoicing
- [x] Digital receipt generation
- [x] Basic landlord dashboard
- [x] Tenant profiles & history
- [x] Deployment & user training

**Go-Live**: Week 6
**Deliverable**: Working rent collection system

---

### Phase 2: Automation & Reporting (5 Weeks) - KES 300,000
**Goal**: Automate communications and provide financial insights

- [ ] Bulk SMS/Email gateway integration
- [ ] Automated rent reminders & arrears alerts
- [ ] Revenue dashboards & analytics
- [ ] Landlord verification workflow
- [ ] Admin subscription management
- [ ] Comprehensive audit logging

**Go-Live**: Week 11
**Deliverable**: Fully automated rental workflow

---

### Phase 3: Tenant Experience & Marketplace (4 Weeks) - KES 200,000
**Goal**: Complete ecosystem with self-service and discovery

- [ ] Tenant self-service portal
- [ ] Maintenance request tracking
- [ ] House marketplace with search
- [ ] Advanced filtering & booking
- [ ] Viewing appointment scheduling
- [ ] Optional utility billing automation

**Go-Live**: Week 15
**Deliverable**: Feature-complete product ready for scale

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: JavaScript/TypeScript
- **Database**: PostgreSQL (primary), Redis (cache)
- **ORM**: Sequelize or TypeORM
- **Authentication**: JWT + OAuth2 (optional)
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Web**: React 18 + TypeScript
- **Mobile**: React Native (optional Phase 2+)
- **State Management**: Redux Toolkit or Zustand
- **UI Library**: Material-UI or Tailwind CSS
- **Testing**: Jest + React Testing Library

### DevOps & Infrastructure
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Deployment**: Docker + AWS ECS / Google Cloud Run
- **Database Hosting**: AWS RDS / Google Cloud SQL
- **Cloud Storage**: AWS S3 / Google Cloud Storage
- **Monitoring**: Sentry (errors), Datadog (performance)

### External Services
- **Payment**: M-Pesa (Safaricom Daraja API)
- **SMS**: Twilio or Africa's Talking
- **Email**: SendGrid or AWS SES
- **Maps**: Google Maps API
- **Analytics**: Mixpanel or Amplitude

---

## 🚀 Getting Started

### Prerequisites
```bash
- Node.js v18+ and npm v9+
- PostgreSQL v12+
- Redis v6+
- Git
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mambaproperties.git
cd mambaproperties
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Initialize database**
```bash
npm run migrate
npm run seed  # Optional: load sample data
```

5. **Start development server**
```bash
npm run dev
```

Server will be available at `http://localhost:3000`

6. **Run tests**
```bash
npm test
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push and create pull request
git push origin feature/your-feature-name
```

---

## 📁 Project Structure

```
mambaproperties/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.js      # Database setup
│   │   ├── env.js           # Environment variables
│   │   └── constants.js     # App constants
│   │
│   ├── api/                 # API Layer
│   │   ├── routes/          # Express routes
│   │   │   ├── auth.js
│   │   │   ├── properties.js
│   │   │   ├── tenants.js
│   │   │   ├── payments.js
│   │   │   └── invoices.js
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── validators/      # Request validation
│   │   └── schemas/         # OpenAPI/Swagger docs
│   │
│   ├── services/            # Business logic
│   │   ├── UserService.js
│   │   ├── PropertyService.js
│   │   ├── PaymentService.js
│   │   ├── InvoiceService.js
│   │   ├── NotificationService.js
│   │   └── AnalyticsService.js
│   │
│   ├── models/              # Database models
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Tenant.js
│   │   ├── Lease.js
│   │   ├── Payment.js
│   │   ├── Invoice.js
│   │   └── AuditLog.js
│   │
│   ├── integrations/        # External service integrations
│   │   ├── mpesa.js         # M-Pesa integration
│   │   ├── sms.js           # SMS gateway
│   │   ├── email.js         # Email service
│   │   └── storage.js       # Cloud storage
│   │
│   ├── utils/               # Helper functions
│   │   ├── logger.js
│   │   ├── errorHandler.js
│   │   ├── validators.js
│   │   └── formatters.js
│   │
│   └── app.js               # Express app setup
│
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── fixtures/           # Test data
│
├── migrations/             # Database migrations
├── seeds/                  # Database seeds
├── docs/                   # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
│
├── .env.example            # Environment template
├── .gitignore
├── package.json
├── package-lock.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 💻 Development Guidelines

### Code Style
- Use **ESLint** for JavaScript linting
- Use **Prettier** for code formatting
- Follow **Airbnb JavaScript Style Guide**
- Use **TypeScript** for type safety

### Commit Messages
```
feat: Add user authentication
fix: Resolve memory leak in payment service
docs: Update API documentation
style: Format code to match style guide
refactor: Simplify invoice generation logic
test: Add tests for payment validation
chore: Update dependencies
```

### Pull Request Process
1. Create branch from `develop`
2. Make atomic commits with clear messages
3. Add tests for new functionality
4. Update documentation
5. Submit PR with description
6. Ensure all CI checks pass
7. Request code review from maintainers
8. Address feedback and merge

### Testing Standards
- Aim for **80%+ code coverage**
- Test happy path and error cases
- Mock external services
- Use descriptive test names
- Keep tests independent and fast

---

## 📚 API Documentation

### Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Base URL
- **Development**: `http://localhost:3000/api/v1`
- **Production**: `https://api.mambaproperties.com/v1`

### Core Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/logout` - User logout

#### Properties
- `GET /properties` - List user's properties
- `POST /properties` - Create new property
- `GET /properties/:id` - Get property details
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

#### Payments
- `POST /payments/mpesa/request` - Request M-Pesa payment
- `POST /payments/mpesa/callback` - M-Pesa callback webhook
- `GET /payments` - List payments
- `GET /payments/:id` - Get payment details

#### Invoices
- `GET /invoices` - List invoices
- `POST /invoices/generate` - Generate invoice
- `GET /invoices/:id` - Get invoice details
- `POST /invoices/:id/send` - Send invoice via SMS/Email

#### Tenants
- `GET /tenants` - List tenants
- `POST /tenants` - Add tenant
- `GET /tenants/:id` - Get tenant details
- `PUT /tenants/:id` - Update tenant info

**Full API documentation**: See `/docs/API.md`

---

## 🚢 Deployment

### Local Development
```bash
# Using docker-compose
docker-compose up -d
npm run dev
```

### Staging
```bash
git push origin feature/your-feature
# Automatic deployment to staging.mambaproperties.com
```

### Production
```bash
git push origin main
# Manual approval required for production deployment
# Automatic deployment to mambaproperties.com
```

### Environment Configuration
See `docs/DEPLOYMENT.md` for detailed deployment instructions.

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Add tests for new features
5. Update documentation
6. Submit a pull request

See `CONTRIBUTING.md` for detailed guidelines.

---

## 📄 License

This project is proprietary software developed for MambaProperties. Unauthorized copying, modification, or distribution is prohibited.

---

## 📞 Support

### For Developers
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Documentation**: Check `/docs` folder

### For Clients
- **Support Email**: support@mambaproperties.com
- **Help Center**: https://help.mambaproperties.com
- **Live Chat**: Available on dashboard

---

## 🗺️ Roadmap

- ✅ Phase 1: Core rent collection (Week 6)
- 🔄 Phase 2: Automation & reporting (Week 11)
- 🔲 Phase 3: Tenant portal & marketplace (Week 15)
- 🔲 Phase 4+: Advanced analytics, utility billing, insurance integrations

---

## 📊 Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Backend API | 🟢 In Development | Phase 1 - 40% complete |
| Database Design | 🟢 Complete | All Phase 1 tables designed |
| M-Pesa Integration | 🟡 Planned | Week 3 start |
| Web Dashboard | 🟡 Planned | Week 4 start |
| Testing | 🟡 Planned | Week 5-6 |
| Documentation | 🟢 In Progress | API docs ongoing |

---

**Last Updated**: February 12, 2026  
**Version**: 1.0.0-alpha  
**Maintained By**: MessoDigitallz# MambaProperties-Management-System
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 85d37d3 (backup: before folder structure refactor)
