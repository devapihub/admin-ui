import React, { Component } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

class DashboardLayout extends Component {
    constructor(props) {
        super(props);
        this.state = { sidebarCollapsed: false };
    }

    handleCollapseChange = (collapsed) => {
        this.setState({ sidebarCollapsed: collapsed });
    };

    render() {
        const { username, onLogout, children } = this.props;
        const { sidebarCollapsed } = this.state;
        const sidebarWidth = sidebarCollapsed ? 56 : 220;

        const contentWrapperStyle = {
            marginLeft: sidebarWidth,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            transition: "margin-left 0.2s ease",
        };

        const mainStyle = {
            flex: 1,
            padding: 24,
            background: "#f0f2f5",
            overflowY: "auto",
            fontFamily: "sans-serif",
        };

        return (
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <Sidebar onCollapse={this.handleCollapseChange} />
                <div style={contentWrapperStyle}>
                    <Topbar username={username} onLogout={onLogout} />
                    <main style={mainStyle}>{children}</main>
                </div>
            </div>
        );
    }
}

export default DashboardLayout;
