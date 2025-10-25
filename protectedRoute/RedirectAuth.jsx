import CollegeHome from '../app/(college)/CollegeHome';
import Home from '../app/(student)/StudentHome'
import TeacherHome from '../app/(teacher)/TeacherHome';
import Login from '../app/Login';
import { useAuth } from "../context/authContext"

const RedirectAuth = () => {
    const { user, role } = useAuth();

    if (!user && !role) {
        return <Login />;
    } else if (user && role === "student") {
        return <Home />;
    } else if (user && role === "teacher") {
        return <TeacherHome />;
    } else if (user && role === "college") {
        return <CollegeHome />;
    } else {
        return <Login />;
    }
}

export default RedirectAuth