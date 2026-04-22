import React, { Component } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
    { label: "Trang chủ", path: "/", icon: "🏠" },
    { label: "Ecommerce", path: "/tools", icon: "🛒" },
];

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: false };
    }

    handleToggle = () => {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
        if (this.props.onCollapse) {
            this.props.onCollapse(collapsed);
        }
    };

    render() {
        const { collapsed } = this.state;
        const currentPath = window.location.pathname;
        const width = collapsed ? 56 : 220;

        const sidebarStyle = {
            width,
            minHeight: "100vh",
            background: "#1a1a2e",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.2s ease",
            flexShrink: 0,
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 200,
            overflow: "hidden",
        };

        const logoStyle = {
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "0 12px" : "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
        };

        const logoTextStyle = {
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            whiteSpace: "nowrap",
            overflow: "hidden",
        };

        const toggleBtnStyle = {
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            fontSize: 18,
            padding: "4px",
            lineHeight: 1,
            flexShrink: 0,
        };

        const navStyle = {
            flex: 1,
            paddingTop: 8,
        };

        return (
            <div style={sidebarStyle}>
                <div style={logoStyle}>
                    {!collapsed && <span style={logoTextStyle}>DevAPIHub</span>}
                    <button style={toggleBtnStyle} onClick={this.handleToggle} title="Thu gọn/Mở rộng">
                        {collapsed ? "▶" : "◀"}
                    </button>
                </div>

                <nav style={navStyle}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = currentPath === item.path;
                        const itemStyle = {
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: collapsed ? "12px 0" : "12px 16px",
                            justifyContent: collapsed ? "center" : "flex-start",
                            textDecoration: "none",
                            color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                            background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                            borderLeft: isActive ? "3px solid #4f8ef7" : "3px solid transparent",
                            fontSize: 14,
                            transition: "background 0.15s",
                        };

                        return (
                            <Link key={item.path} to={item.path} style={itemStyle}>
                                <span style={{ fontSize: 18 }}>{item.icon}</span>
                                {!collapsed && (
                                    <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        );
    }
}

export default Sidebar;
