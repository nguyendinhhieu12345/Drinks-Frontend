import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import { publicRoutes } from "./router/Router";
import { AppDispatch, RootState, store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect } from "react";
import RequireAuth from "./router/RequireAuth";
import { AnimatePresence } from "framer-motion";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { User } from "./type";
import "@goongmaps/goong-js/dist/goong-js.css";
import { Socket, io } from "socket.io-client";

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

    useEffect(() => {
        const socket: Socket = io("http://localhost:8900", {
            withCredentials: true,
        });
        socket.on("connect", () => {
            console.log("Connected to server");
        });
    }, []);

    return (
        // <Router>
        <div className="App">
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
