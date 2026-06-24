import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const {
        user,
        logout,
        isAuthenticated
    } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <nav>

            <Link to="/">
                Home
            </Link>

            <Link to="/events">
                Events
            </Link>

            {!isAuthenticated && (
                <>
                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>
                </>
            )}

            {isAuthenticated &&
             user?.role === "student" && (
                <>
                    <Link to="/my-registrations">
                        My Registrations
                    </Link>
                </>
            )}

            {isAuthenticated &&
             user?.role === "organizer" && (
                <>
                    <Link to="/create-event">
                        Create Event
                    </Link>
                </>
            )}

            {isAuthenticated && (
                <button onClick={handleLogout}>
                    Logout
                </button>
            )}

        </nav>
    );
}

export default Navbar;