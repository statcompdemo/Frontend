import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const rawRole = localStorage.getItem("role");
    const userRole = rawRole?.toLowerCase().trim(); // Ensure case-insensitivity and no whitespace
    const location = useLocation();

    console.log("[ProtectedRoute] Role Check:", {
        url: location.pathname,
        userRole,
        allowedRoles,
        hasToken: !!token
    });

    if (!token) {
        console.warn("[ProtectedRoute] No token found, redirecting to login");
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!userRole) {
        console.warn("[ProtectedRoute] No role found in localStorage, redirecting to login");
        localStorage.clear(); // Clear potentially corrupted state
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        console.warn(`[ProtectedRoute] Access Denied: Role "${userRole}" not in`, allowedRoles);

        // Redirect to their own dashboard if they have a role but are in the wrong place
        let redirectPath = "/";
        if (userRole === "spg" || userRole === "spg_user") redirectPath = "/app/dashboard";
        else if (userRole === "admin") redirectPath = "/admin/dashboard";
        else if (userRole === "super_admin" || userRole === "superadmin") redirectPath = "/superadmin/dashboard";

        console.log("[ProtectedRoute] Redirecting unauthorized user to:", redirectPath);
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
