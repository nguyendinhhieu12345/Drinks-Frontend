import { logoutUser } from "@/api/authApi/authApi";
import { configRouter } from "@/configs/router";
import { resetStoreAuth } from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { User } from "@/type";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
interface Props {
    children: JSX.Element;
    requiredRole: string | null;
    user?: User;
}

export default function RequireAuth({ children, requiredRole, user }: Props) {
    const location = useLocation();
    // redirects to login if not login
    if (!requiredRole) {
        console.log(user)
        if (user) {
            if (location.pathname === configRouter.login)
                return (
                    <Navigate to={configRouter.dashboardAdmin} state={{ from: location }} replace />
                );
        }
        return children;
    } else {
        if (user) {
            if (requiredRole === "ROLE_ADMIN" || requiredRole === "ROLE_MANAGER") {
                return children;
            }

            else {
                localStorage.setItem("role", "")
                const logoutAccountCurrent = async () => {
                    const data = await logoutUser(localStorage.getItem("fcmTokenId") as string)
                    console.log(data)
                    if (data?.success) {
                        const dispatch = useDispatch<AppDispatch>()
                        localStorage.removeItem("profile")
                        localStorage.setItem("role", "")
                        await dispatch(resetStoreAuth())
                        return <Navigate to={configRouter.login} state={{ from: location }} replace />
                    }
                }
                logoutAccountCurrent()
            }
            return children;
        } else {
            return (
                <Navigate to={configRouter.login} state={{ from: location }} replace />
            );
        }
    }
}
