import React, { Component } from "react";
import { Card, List, Badge, Button, Typography, Avatar, Space, Tag } from "antd";
import {
    UserOutlined,
    ToolOutlined,
    BarChartOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    LockOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ICON_MAP = {
    "👤": <UserOutlined />,
    "🔧": <ToolOutlined />,
    "📊": <BarChartOutlined />,
    "✅": <CheckCircleOutlined />,
    "⚠️": <WarningOutlined />,
    "🔒": <LockOutlined />,
};

const MOCK_NOTIFICATIONS = [
    { id: 1, title: "Người dùng mới đăng ký", desc: "Tài khoản user@example.com vừa đăng ký thành công.", time: "2 phút trước", unread: true, icon: "👤" },
    { id: 2, title: "Tool AI được cập nhật", desc: "Tool ChatGPT Wrapper đã được cập nhật lên phiên bản 2.1.", time: "1 giờ trước", unread: true, icon: "🔧" },
    { id: 3, title: "Báo cáo hàng tuần sẵn sàng", desc: "Báo cáo thống kê tuần 17/2026 đã được tạo.", time: "3 giờ trước", unread: true, icon: "📊" },
    { id: 4, title: "Hệ thống bảo trì hoàn tất", desc: "Quá trình bảo trì định kỳ đã hoàn thành lúc 02:00 AM.", time: "5 giờ trước", unread: false, icon: "✅" },
    { id: 5, title: "Cảnh báo sử dụng API", desc: "Lượng API call đã đạt 80% giới hạn tháng này.", time: "1 ngày trước", unread: false, icon: "⚠️" },
    { id: 6, title: "Người dùng bị khoá tài khoản", desc: "Tài khoản bad_actor@mail.com bị khoá do vi phạm chính sách.", time: "2 ngày trước", unread: false, icon: "🔒" },
];

class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { notifications: MOCK_NOTIFICATIONS };
    }

    markAllRead = () => {
        this.setState((prev) => ({
            notifications: prev.notifications.map((n) => ({ ...n, unread: false })),
        }));
    };

    markRead = (id) => {
        this.setState((prev) => ({
            notifications: prev.notifications.map((n) =>
                n.id === id ? { ...n, unread: false } : n
            ),
        }));
    };

    render() {
        const { notifications } = this.state;
        const unreadCount = notifications.filter((n) => n.unread).length;

        return (
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <Space align="baseline">
                        <Title level={4} style={{ margin: 0 }}>Thông báo</Title>
                        {unreadCount > 0 && (
                            <Badge count={unreadCount} style={{ backgroundColor: "#1677ff" }} />
                        )}
                    </Space>
                    {unreadCount > 0 && (
                        <Button onClick={this.markAllRead} size="small">
                            Đánh dấu tất cả đã đọc
                        </Button>
                    )}
                </div>

                <Card
                    title={
                        <Space>
                            <span>Tất cả thông báo</span>
                            <Tag color="blue">{notifications.length}</Tag>
                        </Space>
                    }
                >
                    <List
                        dataSource={notifications}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                onClick={() => this.markRead(item.id)}
                                style={{
                                    cursor: "pointer",
                                    padding: "12px 0",
                                    background: "transparent",
                                }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Badge dot={item.unread}>
                                            <Avatar icon={ICON_MAP[item.icon] || <UserOutlined />} />
                                        </Badge>
                                    }
                                    title={
                                        <Space>
                                            <Text strong={item.unread}>{item.title}</Text>
                                            {item.unread && <Badge color="blue" />}
                                        </Space>
                                    }
                                    description={
                                        <div>
                                            <div style={{ marginBottom: 4 }}>{item.desc}</div>
                                            <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}

export default NotificationsPage;
