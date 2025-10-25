# MentorMentee App

A React Native Expo app for a mentor-mentee platform with role-based authentication using Appwrite. Supports Students, Teachers, and College Admins.

## Overview

This app uses Expo Router for file-based navigation, Appwrite for backend authentication, and role-based access control. Users sign up with roles (student, teacher, college), log in, and are directed to role-specific screens.

## Appwrite Integration

Appwrite handles user authentication via the Account service.

### Key Functions in `lib/Appwrite.js`

- **Client Setup**: Configures Appwrite client with endpoint, project ID, and platform from environment variables (`EXPO_PUBLIC_APPWRITE_ENDPOINT`, `EXPO_PUBLIC_APPWRITE_PROJECT_ID`, `EXPO_PUBLIC_APPWRITE_PLATFORM`).
- **Account Instance**: Exports `account` for authentication operations.

### Authentication Operations in `context/AuthContext.js`

- **fetchUser()**: Retrieves current session and user preferences (role, name) on app load.
- **signup(email, password, role, name)**: Creates user account, logs in, and sets preferences.
- **login(email, password)**: Creates email-password session and fetches user data.
- **logout()**: Deletes current session and resets state.

User preferences store role and name for role-based navigation.

## AuthGate Navigation

`AuthGate/AuthGate.jsx` manages initial navigation based on auth state.

### Logic

- Checks `user`, `role`, and `loading` from `AuthContext`.
- If not loading:
  - No user: Navigate to `LogIn`.
  - User exists: Route based on role:
    - `college` → `(college)/CollegeHome`
    - `teacher` → `(teacher)/TeacherHome`
    - `student` → `(student)/StudentHome`
    - Invalid role → `LogIn`
- Renders `null` (invisible component).

Triggers on mount and state changes.

## Routes and Navigation

Uses Expo Router with file-based routing. Root layout (`app/_layout.jsx`) wraps `AuthProvider` and `Slot`.

### Route Structure

- **Root (`app/index.jsx`)**: Renders `AuthGate` for initial routing.
- **Auth Screens**:
  - `app/LogIn.jsx`: Login form, calls `login()` on submit.
  - `app/SignUp.jsx`: Signup form with role selection (Student, Teacher, College), calls `signup()` on submit.
- **Role-Based Layouts** (using Tabs):
  - `app/(student)/_layout.jsx`: Tabs for `StudentHome` and `StudentProfile`.
  - `app/(teacher)/_layout.jsx`: Tabs for `TeacherHome` and `TeacherProfile`.
  - `app/(college)/_layout.jsx`: Tabs for `CollegeHome` and `CollegeProfile`.
- **Screens**:
  - **Student**: `StudentHome` (welcome), `StudentProfile` (user info).
  - **Teacher**: `TeacherHome` (welcome), `TeacherProfile` (user info).
  - **College**: `CollegeHome` (welcome), `CollegeProfile` (user info).
- All profile screens display name, email, role, and logout button.

### Navigation Flow

1. App starts at `/` (index), renders AuthGate.
2. AuthGate redirects to login or role home.
3. Post-login/signup, manual redirect to role home.
4. Within roles, tab navigation between home and profile.
5. Logout redirects to `LogIn`.

## Environment Variables

Set in `.env` or Expo config:

- `EXPO_PUBLIC_APPWRITE_ENDPOINT`
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
- `EXPO_PUBLIC_APPWRITE_PLATFORM`

## Get Started

1. Install dependencies: `npm install`
2. Start app: `npx expo start`
3. Open in emulator, simulator, or Expo Go.

## Learn More

- [Expo Docs](https://docs.expo.dev/)
- [Appwrite Docs](https://appwrite.io/docs)
- [Expo Router](https://docs.expo.dev/router/introduction/)
