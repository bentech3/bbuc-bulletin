# Sample Login Credentials for BBUC Notice Board System

⚠️ **IMPORTANT**: These are sample accounts for testing purposes. In production, change all passwords immediately.

## Administrator Account
**Email:** `admin@bbuc.ac.ug`  
**Password:** `Admin@2024`  
**Role:** Admin  
**Permissions:** Full system access - user management, role assignment, department management, system settings, audit logs

---

## Staff Account (Dean/Lecturer)
**Email:** `staff@bbuc.ac.ug`  
**Password:** `Staff@2024`  
**Role:** Dean  
**Permissions:** Create notices, submit for approval, view analytics, manage departmental content

---

## Student Account
**Email:** `student@bbuc.ac.ug`  
**Password:** `Student@2024`  
**Role:** Student  
**Permissions:** View approved notices, comment, like, bookmark, receive notifications

---

## How to Create These Accounts

### Option 1: Via Sign Up Page
1. Go to `/auth` in your browser
2. Click "Sign Up"
3. Fill in the form with the credentials above
4. After signup, an admin needs to assign the appropriate role

### Option 2: Via Admin Dashboard (After First Admin is Created)
1. Login as admin
2. Go to Admin Dashboard → Users tab
3. Click "Add User"
4. Fill in the user details and select role
5. User will be created with the specified credentials

---

## Default Roles Available

1. **admin** - Full system control
2. **principal** - High-level administrative access
3. **registrar** - Academic records and enrollment management
4. **dean** - Faculty-level management
5. **department_head** - Department-specific management
6. **guild_leader** - Student leadership
7. **admissions_officer** - Admissions and enrollment
8. **communication_officer** - Communication and public relations
9. **faculty** - Teaching staff
10. **staff** - General staff members
11. **student** - Regular students (default role)

---

## Security Notes

- All passwords must be at least 6 characters
- Email confirmation is disabled for testing (can be enabled in production)
- Multi-factor authentication (MFA) should be enabled for admin and approver roles in production
- Change all default passwords after initial setup
- Use strong, unique passwords for each account

---

## Testing Workflow

1. **Admin Testing:**
   - Login with admin credentials
   - Create users and assign roles
   - Manage departments
   - View audit logs

2. **Staff Testing:**
   - Login with staff credentials
   - Create a notice with rich text, images, and attachments
   - Submit for approval
   - Check approval status

3. **Student Testing:**
   - Login with student credentials
   - Browse approved notices
   - Like and bookmark notices
   - Post comments

---

For questions or issues, contact IT Support at it.support@bbuc.ac.ug
