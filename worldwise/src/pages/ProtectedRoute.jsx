import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/FakeAuthContext"
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])


    return children;


}

export default ProtectedRoute
