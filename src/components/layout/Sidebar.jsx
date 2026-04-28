import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    HomeOutlined,
    ShoppingOutlined,
    TeamOutlined,
    SafetyOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const NAV_ITEMS = [
    { label: "Trang chủ", path: "/", icon: <HomeOutlined /> },
    { label: "Ecommerce", path: "/tools", icon: <ShoppingOutlined /> },
    { label: "Quản lý User", path: "/users", icon: <TeamOutlined /> },
    { label: "Phân quyền", path: "/roles", icon: <SafetyOutlined /> },
];

function SidebarInner({ collapsed, onCollapse }) {
    const location = useLocation();

    const menuItems = NAV_ITEMS.map((item) => ({
        key: item.path,
        icon: item.icon,
        label: <Link to={item.path}>{item.label}</Link>,
    }));

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={220}
            collapsedWidth={80}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                background: "#1a1a2e",
                zIndex: 200,
            }}
            trigger={null}
        >
            <div
                style={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                {!collapsed && (
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, whiteSpace: "nowrap" }}>
                        DevAPIHub
                    </span>
                )}
                {collapsed && (
                    <span style={{ color: "#1677ff", fontWeight: 700, fontSize: 20 }}>D</span>
                )}
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                style={{
                    background: "#1a1a2e",
                    border: "none",
                    marginTop: 8,
                }}
            />
        </Sider>
    );
}

class Sidebar extends Component {
    render() {
        return <SidebarInner {...this.props} />;
    }
}

export default Sidebar;
