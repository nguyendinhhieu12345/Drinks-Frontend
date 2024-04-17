import { configRouter } from "@/configs/router";
import { User } from "@/type";
import { Navigate, useLocation } from "react-router-dom";
interface Props {
    children: JSX.Element;
    requiredRole: string | null;
    user?: User;
}

export default function RequireAuth({ children, requiredRole, user }: Props) {
    const location = useLocation();
    // redirects to login if not login
    if (requiredRole) {
        if (user) {
            if (location.pathname === configRouter.login)
                return (
                    <Navigate to={configRouter.dashboardAdmin} state={{ from: location }} replace />
                );
        }
        return children;
    } else {
        if (!user) {
            if (location.pathname.includes("/admin")) {
                return (<Navigate to={configRouter.login} state={{ from: location }} replace />)
            }
        }
        return children
    }
}
