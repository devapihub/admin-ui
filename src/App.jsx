import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ToolsPage from "./pages/ToolsPage/ToolsPage.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: "",
        };
    }

    componentDidMount() {
        // nếu đã có token -> coi như login rồi
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && username) {
            this.setState({
                isLoggedIn: true,
                username: username,
            });
        }
    }

    handleLoginSuccess = (username) => {
        this.setState({
            isLoggedIn: true,
            username: username,
        });
    };

    handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        this.setState({
            isLoggedIn: false,
            username: "",
        });
    };

    render() {
        const { isLoggedIn, username } = this.state;

        return (
            <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    {/* Home (cần login) */}
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

                    {/* Quản lý Công cụ AI */}
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

                    {/* Quản lý Người dùng */}
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

                    {/* Login page */}
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

                    {/* fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default App;
