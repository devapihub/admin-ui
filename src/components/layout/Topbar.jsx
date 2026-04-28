import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Layout,
    Avatar,
    Badge,
    Button,
    Dropdown,
    Popover,
    Typography,
    List,
    Space,
    Divider,
} from "antd";
import {
    BellOutlined,
    LogoutOutlined,
    MoonOutlined,
    SunOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const { Header } = Layout;
const { Text } = Typography;

const MOCK_NOTIFS = [
    { id: 1, title: "Người dùng mới đăng ký", time: "2 phút trước", unread: true },
    { id: 2, title: "Tool AI được cập nhật", time: "1 giờ trước", unread: true },
    { id: 3, title: "Báo cáo hàng tuần sẵn sàng", time: "3 giờ trước", unread: true },
];

class Topbar extends Component {
    static contextType = ThemeContext;

    render() {
        const { username, onLogout, collapsed, onCollapse } = this.props;
        const { isDark, toggleTheme } = this.context;

        const initial = username ? username.charAt(0).toUpperCase() : "U";
        const unreadCount = MOCK_NOTIFS.filter((n) => n.unread).length;

        const userMenuItems = [
            {
                key: "username",
                label: (
                    <div style={{ padding: "4px 0" }}>
                        <div style={{ fontSize: 12, color: "#888" }}>Đang đăng nhập</div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{username}</div>
                    </div>
                ),
                disabled: true,
            },
            { type: "divider" },
            {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Đăng xuất",
                danger: true,
                onClick: onLogout,
            },
        ];

        const notifContent = (
            <div style={{ width: 320 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Text strong>Thông báo</Text>
                    <Badge count={unreadCount} size="small" />
                </div>
                <List
                    size="small"
                    dataSource={MOCK_NOTIFS}
                    renderItem={(item) => (
                        <List.Item style={{ padding: "8px 0" }}>
                            <Space align="start">
                                <Badge dot={item.unread} offset={[-2, 2]}>
                                    <Avatar size="small" icon={<BellOutlined />} />
                                </Badge>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: item.unread ? 600 : 400 }}>{item.title}</div>
                                    <div style={{ fontSize: 11, color: "#888" }}>{item.time}</div>
                                </div>
                            </Space>
                        </List.Item>
                    )}
                />
                <Divider style={{ margin: "8px 0" }} />
                <Link to="/notifications" style={{ display: "block", textAlign: "center", fontSize: 13 }}>
                    Xem tất cả thông báo
                </Link>
            </div>
        );

        return (
            <Header
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    left: collapsed ? 80 : 220,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 24px",
                    height: 64,
                    transition: "left 0.2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
            >
                <Space>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => onCollapse(!collapsed)}
                        style={{ fontSize: 16 }}
                    />
                    <Text strong style={{ fontSize: 15 }}>DevAPIHub Admin</Text>
                </Space>

                <Space size={4}>
                    <Button
                        type="text"
                        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
                        onClick={toggleTheme}
                        title="Đổi theme"
                    />

                    <Popover
                        content={notifContent}
                        trigger="click"
                        placement="bottomRight"
                    >
                        <Badge count={unreadCount} size="small">
                            <Button type="text" icon={<BellOutlined />} />
                        </Badge>
                    </Popover>

                    <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                        <Avatar
                            style={{ background: "#1677ff", cursor: "pointer" }}
                        >
                            {initial}
                        </Avatar>
                    </Dropdown>
                </Space>
            </Header>
        );
    }
}

export default Topbar;
