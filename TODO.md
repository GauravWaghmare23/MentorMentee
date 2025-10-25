# TODO List for Fixing Route Errors and Integrating Auth

- [x] Fix function name in app/(teacher)/_layout.jsx from 'StudentLayout' to 'TeacherLayout'
- [x] Update navigation routes in AuthGate/AuthGate.jsx to use correct nested paths: '(college)/CollegeHome', '(teacher)/TeacherHome', '(student)/StudentHome'
- [x] Fix logout route in context/AuthContext.js from '/login' to 'LogIn'
- [x] Integrate LogIn.jsx with useAuth hook, add error handling and loading
- [x] Integrate SignUp.jsx with useAuth hook, add error handling and loading
