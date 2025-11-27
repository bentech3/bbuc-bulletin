# Bishop Barham University College - Digital Notice Board System

## System Overview

A comprehensive, secure digital notice board system for Bishop Barham University College that replaces physical notice boards with a centralized, real-time platform.

## Features Implemented

### Core Features
- ✅ User authentication with email/password
- ✅ Role-based access control (Admin, Staff, Students)
- ✅ Rich notice creation and management
- ✅ Multi-level approval workflow
- ✅ Notice categories and priorities (Urgent, Normal, Low)
- ✅ Bookmarking and liking notices
- ✅ Real-time notifications system
- ✅ Commenting on notices
- ✅ Search and filtering
- ✅ Audit logging for all actions
- ✅ Department management
- ✅ Notification preferences
- ✅ Scheduled publishing and auto-expiry
- ✅ View counter for notices
- ✅ Archive and restore functionality

### Database Schema
- **profiles**: User profile information
- **user_roles**: Role assignments (admin, principal, registrar, dean, etc.)
- **notices**: All notice content with priority, scheduling, attachments
- **notice_approvals**: Multi-level approval workflow
- **comments**: Threaded commenting system
- **notice_bookmarks**: Saved/bookmarked notices
- **notice_likes**: Like tracking
- **notifications**: In-app notification system
- **notification_subscriptions**: User notification preferences
- **departments**: Faculty and department structure
- **audit_logs**: Complete audit trail

## Pushing to GitHub

### Step 1: Connect GitHub in Lovable
1. Click the **GitHub** button in the top-right corner of Lovable
2. Click **Connect to GitHub**
3. Authorize the Lovable GitHub App
4. Select your GitHub account/organization
5. Click **Create Repository**

### Step 2: Repository Details
- Repository will be created automatically with all your code
- Choose repository name (e.g., `bbuc-digital-notice-board`)
- Select visibility (Public or Private)

### Step 3: Automatic Sync
- All changes you make in Lovable will automatically push to GitHub
- Changes pushed to GitHub will automatically sync to Lovable
- This is bidirectional and real-time

## Local Development Setup

If you want to work locally after connecting to GitHub:

### Prerequisites
- Node.js 18+ installed
- Git installed

### Clone and Setup
```bash
# Clone your repository
git clone https://github.com/YOUR-USERNAME/bbuc-digital-notice-board.git
cd bbuc-digital-notice-board

# Install dependencies
npm install

# Create .env file with Supabase credentials
# (Get these from your Lovable project)
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
Your `.env` file needs:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

## Deployment

### Deploy from Lovable (Recommended)
1. Click **Publish** button in top-right
2. Your app is live at `yourproject.lovable.app`
3. Connect custom domain in Settings → Domains (requires paid plan)

### Deploy to Other Platforms
The code is standard React + Vite and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting platform

## Next Steps for Full Implementation

### High Priority Features to Add
1. **Multi-Factor Authentication (MFA)**
   - Add OTP verification for admin and approvers
   - Implement MFA setup in user profile

2. **File Upload System**
   - Rich text editor with image upload
   - PDF attachment support
   - Video embedding
   - Banner image upload for notices

3. **Digital Signage Mode**
   - Full-screen auto-scrolling display
   - Dedicated URL for TV displays
   - Configurable scroll speed and timing

4. **Email Notifications**
   - Integration with email service (Resend)
   - Email templates for different notice types
   - Digest emails for subscribed users

5. **Advanced Dashboards**
   - Admin analytics dashboard
   - Staff dashboard with draft management
   - Student dashboard with saved notices

6. **Guest Access**
   - Public view of notices without login
   - SEO optimization for public URLs

## User Roles

### Admin
- Full system control
- User management
- Role assignments
- Department management
- View audit logs
- System configuration

### Staff (Various Levels)
- **Communication Officer**: Create and submit notices
- **Department Head**: Approve department notices
- **Dean**: Approve faculty notices
- **Registrar**: Final approval for academic notices
- **Principal**: Highest approval authority

### Students
- View approved notices
- Search and filter
- Comment on notices
- Bookmark/save notices
- Receive notifications
- Manage notification preferences

## Security Features

- Row-Level Security (RLS) on all tables
- Role-based access control
- Audit logging for all actions
- Secure password handling
- Session management
- Input validation and sanitization

## Support

For issues or questions:
1. Check the code documentation
2. Review the database schema in Supabase
3. Check audit logs for debugging
4. Contact system administrator

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with RLS
- **Authentication**: Supabase Auth
- **Routing**: React Router
- **State Management**: React Query, Context API
- **UI Components**: shadcn/ui, Radix UI

## License

Copyright © 2025 Bishop Barham University College. All rights reserved.
