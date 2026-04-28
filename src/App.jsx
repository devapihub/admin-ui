import React, { Component, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme as antdTheme } from "antd";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ToolsPage from "./pages/ToolsPage/ToolsPage.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage.jsx";
import RolePermissionPage from "./pages/RolePermissionPage/RolePermissionPage.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext.jsx";
import "./App.css";

function AntdConfigWrapper({ children }) {
    const { isDark } = useContext(ThemeContext);
    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: {
                    colorPrimary: "#1677ff",
                    borderRadius: 6,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: "",
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && username) {
            this.setState({ isLoggedIn: true, username });
        }
    }

    handleLoginSuccess = (username) => {
        this.setState({ isLoggedIn: true, username });
    };

    handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.setState({ isLoggedIn: false, username: "" });
    };

    render() {
        const { isLoggedIn, username } = this.state;

        return (
            <ThemeProvider>
                <AntdConfigWrapper>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    isLoggedIn ? (
                                        <DashboardLayout username={username} onLogout={this.handleLogout}>
                                            <HomePage />
                                        </DashboardLayout>
                                    ) : (
                                        <Navigate to="/login" replace />
                                    )
                                }
                            />
                            <Route
                                path="/tools"
                                element={
                                    isLoggedIn ? (
                                        <DashboardLayout username={username} onLogout={this.handleLogout}>
                                            <ToolsPage />
                                        </DashboardLayout>
                                    ) : (
                                        <Navigate to="/login" replace />
                                    )
                                }
                            />
                            <Route
                                path="/users"
                                element={
                                    isLoggedIn ? (
                                        <DashboardLayout username={username} onLogout={this.handleLogout}>
                                            <UsersPage />
                                        </DashboardLayout>
                                    ) : (
                                        <Navigate to="/login" replace />
                                    )
                                }
                            />
                            <Route
                                path="/notifications"
                                element={
                                    isLoggedIn ? (
                                        <DashboardLayout username={username} onLogout={this.handleLogout}>
                                            <NotificationsPage />
                                        </DashboardLayout>
                                    ) : (
                                        <Navigate to="/login" replace />
                                    )
                                }
                            />
                            <Route
                                path="/roles"
                                element={
                                    isLoggedIn ? (
                                        <DashboardLayout username={username} onLogout={this.handleLogout}>
                                            <RolePermissionPage />
                                        </DashboardLayout>
                                    ) : (
                                        <Navigate to="/login" replace />
                                    )
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    isLoggedIn ? (
                                        <Navigate to="/" replace />
                                    ) : (
                                        <LoginPage onLoginSuccess={this.handleLoginSuccess} />
                                    )
                                }
                            />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </BrowserRouter>
                </AntdConfigWrapper>
            </ThemeProvider>
        );
    }
}

export default App;
