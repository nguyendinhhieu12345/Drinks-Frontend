import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import { publicRoutes } from "./router/Router";
import { AppDispatch, RootState, store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, /*useEffect*/ } from "react";
import RequireAuth from "./router/RequireAuth";
import { AnimatePresence } from "framer-motion";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { User } from "./type";
import "@goongmaps/goong-js/dist/goong-js.css";
// import socket from "./socket/socket";

interface LayoutProps {
    children?: React.ReactNode;
}

function App() {
    const dispatch = useDispatch<AppDispatch>();
    // const location = useLocation();
    setupInterceptor(store, dispatch);
    const routerCheck = publicRoutes;
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         socket.emit('joinBranch', useCurrentUser?.data?.branchId); // Join the branch-specific room
    //     });

    //     socket.on("user_create_order", (data) => {
    //         console.log(data);
    //     });

    //     socket.on("user_update_order", (data) => {
    //         console.log(data);
    //     });
    // }, [useCurrentUser?.data?.branchId]);

    return (
        // <Router>
        <div className="App">
            {/* <button onClick={() => {
                socket.emit("employee_update_order", {
                    userId: "U00000001",
                    orderId: "OB000000002"
                })
            }}>
                socket
            </button> */}
            <AnimatePresence>
                <Routes>
                    {routerCheck.map((route, index) => {
                        const Page = route.component;
                        let Layout: FC<LayoutProps> = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = DefaultLayout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <>
                                        <RequireAuth
                                            requiredRole={localStorage.getItem("role")}
                                            user={useCurrentUser}
                                        >
                                            <Layout>
                                                <React.Suspense fallback={<LoadingPage />}>
                                                    <Page />
                                                </React.Suspense>
                                            </Layout>
                                        </RequireAuth>
                                    </>
                                }
                            />
                        );
                    })}
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </AnimatePresence>
        </div>
        // </Router>
    );
}

export default App;
