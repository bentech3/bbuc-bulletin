# Bishop Barham University College - Digital Notice Board System

A modern, secure, and comprehensive digital notice board system designed specifically for Bishop Barham University College, Kabale, Uganda.

## 🎯 Project Overview

This system eliminates the need for physical notice boards by providing a centralized, real-time platform for official university communications across all faculties, departments, and the entire student body.

## ✨ Key Features

### Authentication & Security
- 🔐 Secure email/password authentication
- 👥 Role-based access control (11 different roles)
- 🛡️ Row-level security on all database tables
- 📋 Complete audit trail of all actions
- 🔑 MFA support for administrators (database ready)

### Notice Management
- 📝 Rich content creation with attachments support
- ⚡ Priority levels: Urgent, Normal, Low
- 📅 Scheduled publishing and auto-expiry
- 🔄 Multi-level approval workflow
- 📊 View count tracking
- 🗄️ Archive and restore functionality
- 🎯 Target audience specification

### User Engagement
- 💬 Threaded commenting system
- ❤️ Like and bookmark notices
- 🔍 Advanced search and filtering
- 🔔 Real-time notification system
- ⚙️ Customizable notification preferences
- 📱 Fully responsive design

### Administration
- 👨‍💼 User and role management
- 🏢 Department and faculty organization
- 📈 Analytics and reporting (database ready)
- 🔍 Comprehensive audit logs
- 🎛️ System configuration controls

## 🚀 Quick Start

### View the Live Application
This project is deployed on Lovable Cloud and accessible at your provided URL.

### Connect to GitHub

1. **In Lovable Editor:**
   - Click the **GitHub** button (top-right)
   - Select **Connect to GitHub**
   - Authorize the Lovable GitHub App
   - Choose your GitHub account/organization
   - Click **Create Repository**

2. **Repository Setup:**
   - Name your repository (e.g., `bbuc-notice-board`)
   - Choose visibility (Public/Private)
   - Repository will be created with all code

3. **Automatic Sync:**
   - Changes in Lovable → Auto-push to GitHub
   - Changes in GitHub → Auto-sync to Lovable
   - Bidirectional real-time synchronization

### Local Development (Optional)

```bash
# Clone the repository
git clone https://github.com/bentech3/bbuc-bulletin-hub.git
cd your-repo-name

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials from Lovable

# Start development server
npm run dev
```

## 👥 User Roles

The system supports 11 distinct roles with hierarchical permissions:

| Role | Permissions | Approval Authority |
|------|-------------|-------------------|
| **Admin** | Full system control | All levels |
| **Principal** | College-wide oversight | Final authority |
| **Registrar** | Academic affairs | Academic notices |
| **Dean** | Faculty management | Faculty notices |
| **Department Head** | Department oversight | Department notices |
| **Guild Leader** | Student affairs | Student notices |
| **Admissions Officer** | Admissions notices | Admissions-related |
| **Communication Officer** | Create notices | Initial submission |
| **Faculty** | View & comment | - |
| **Staff** | View & comment | - |
| **Student** | View, comment, interact | - |

## 📊 Database Schema

### Core Tables
- **profiles**: User information and preferences
- **user_roles**: Role assignments and permissions
- **notices**: All notice content and metadata
- **notice_approvals**: Approval workflow tracking
- **comments**: Discussion threads
- **departments**: Organizational structure

### Engagement Tables
- **notice_bookmarks**: Saved notices
- **notice_likes**: Like tracking
- **notifications**: Real-time alerts
- **notification_subscriptions**: User preferences

### Administration
- **audit_logs**: Complete action history
- **departments**: Faculty and department management

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query + React Context
- **Routing**: React Router v6
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with Row-Level Security
- **Authentication**: Supabase Auth
- **Build Tool**: Vite

## 🔒 Security Features

- ✅ Row-Level Security (RLS) on all tables
- ✅ Role-based access control (RBAC)
- ✅ Secure authentication with session management
- ✅ Input validation and sanitization
- ✅ Audit logging for accountability
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ SQL injection protection

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktop (1440px+)

## 🎨 Design System

Custom design system featuring:
- **Primary Color**: University Blue (#1e3a8a)
- **Secondary Color**: Academic Gold (#d97706)
- **Status Colors**: Approved (green), Pending (amber), Rejected (red)
- **Typography**: Professional academic aesthetic
- **Components**: Consistent, accessible UI components

## 📈 Roadmap

### Phase 1: Core Features ✅ (Current)
- [x] Authentication system
- [x] Role management
- [x] Notice creation and viewing
- [x] Approval workflow
- [x] Comments and engagement
- [x] Notifications infrastructure

### Phase 2: Enhanced Features (Next)
- [ ] Multi-Factor Authentication (MFA)
- [ ] Rich text editor with file uploads
- [ ] Email notification integration
- [ ] Advanced analytics dashboard
- [ ] Digital signage mode for TV displays
- [ ] Mobile app (PWA)

### Phase 3: Advanced Features (Future)
- [ ] AI-powered content suggestions
- [ ] Multilingual support
- [ ] Advanced reporting tools
- [ ] Integration with university systems
- [ ] SMS notifications
- [ ] Calendar integration

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Deployment

### Deploy on Lovable (Recommended)
1. Click **Publish** in Lovable editor
2. App is live at `yourproject.lovable.app`
3. Connect custom domain in Settings → Domains (paid plan)

### Deploy Elsewhere
Compatible with:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting platform

Build command: `npm run build`
Output directory: `dist`

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Copyright © 2025 Bishop Barham University College. All rights reserved.

## 📞 Support

For system issues or questions:
- Contact: System Administrator
- Email: admin@bbuc.ac.ug
- Location: Bishop Barham University College, Kabale, Uganda

## 🙏 Acknowledgments

- Bishop Barham University College administration
- Development team
- Lovable platform
- Open-source community

---

**Built with ❤️ for Bishop Barham University College**
