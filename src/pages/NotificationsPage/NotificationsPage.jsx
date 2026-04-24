import React, { Component } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const MOCK_NOTIFICATIONS = [
    { id: 1, title: "Người dùng mới đăng ký", desc: "Tài khoản user@example.com vừa đăng ký thành công.", time: "2 phút trước", unread: true, icon: "👤" },
    { id: 2, title: "Tool AI được cập nhật", desc: "Tool ChatGPT Wrapper đã được cập nhật lên phiên bản 2.1.", time: "1 giờ trước", unread: true, icon: "🔧" },
    { id: 3, title: "Báo cáo hàng tuần sẵn sàng", desc: "Báo cáo thống kê tuần 17/2026 đã được tạo.", time: "3 giờ trước", unread: true, icon: "📊" },
    { id: 4, title: "Hệ thống bảo trì hoàn tất", desc: "Quá trình bảo trì định kỳ đã hoàn thành lúc 02:00 AM.", time: "5 giờ trước", unread: false, icon: "✅" },
    { id: 5, title: "Cảnh báo sử dụng API", desc: "Lượng API call đã đạt 80% giới hạn tháng này.", time: "1 ngày trước", unread: false, icon: "⚠️" },
    { id: 6, title: "Người dùng bị khoá tài khoản", desc: "Tài khoản bad_actor@mail.com bị khoá do vi phạm chính sách.", time: "2 ngày trước", unread: false, icon: "🔒" },
];

class NotificationsPage extends Component {
    static contextType = ThemeContext;

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
        const { theme } = this.context;
        const unreadCount = notifications.filter((n) => n.unread).length;

        const cardStyle = {
            background: theme.dropdown.bg,
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: `1px solid ${theme.dropdown.border}`,
            overflow: "hidden",
        };

        const headerStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${theme.dropdown.border}`,
        };

        return (
            <div>
                <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: theme.main.text }}>
                            Thông báo
                        </h2>
                        {unreadCount > 0 && (
                            <span style={{ fontSize: 13, color: theme.dropdown.textSub, marginTop: 4, display: "block" }}>
                                {unreadCount} thông báo chưa đọc
                            </span>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={this.markAllRead}
                            style={{
                                background: "none",
                                border: `1px solid ${theme.dropdown.border}`,
                                borderRadius: 6,
                                padding: "6px 14px",
                                fontSize: 13,
                                color: "#1677ff",
                                cursor: "pointer",
                            }}
                        >
                            Đánh dấu tất cả đã đọc
                        </button>
                    )}
                </div>

                <div style={cardStyle}>
                    <div style={headerStyle}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: theme.dropdown.text }}>
                            Tất cả thông báo
                        </span>
                        <span style={{
                            background: "#1677ff",
                            color: "#fff",
                            borderRadius: 10,
                            padding: "2px 8px",
                            fontSize: 12,
                            fontWeight: 600,
                        }}>
                            {notifications.length}
                        </span>
                    </div>

                    {notifications.map((n, idx) => (
                        <div
                            key={n.id}
                            onClick={() => this.markRead(n.id)}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 14,
                                padding: "16px 20px",
                                borderBottom: idx < notifications.length - 1 ? `1px solid ${theme.dropdown.border}` : "none",
                                cursor: "pointer",
                                background: n.unread
                                    ? (theme.toggleIcon === "🌙" ? "rgba(22,119,255,0.07)" : "rgba(22,119,255,0.04)")
                                    : "transparent",
                                transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = theme.toggleIcon === "🌙" ? "rgba(255,255,255,0.05)" : "#f5f5f5")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? (theme.toggleIcon === "🌙" ? "rgba(22,119,255,0.07)" : "rgba(22,119,255,0.04)") : "transparent")}
                        >
                            <div style={{
                                width: 40, height: 40, borderRadius: "50%",
                                background: theme.toggleIcon === "🌙" ? "rgba(255,255,255,0.08)" : "#f0f2f5",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 18, flexShrink: 0,
                            }}>
                                {n.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontWeight: n.unread ? 600 : 400, fontSize: 14, color: theme.dropdown.text }}>
                                        {n.title}
                                    </span>
                                    {n.unread && (
                                        <span style={{
                                            width: 7, height: 7, borderRadius: "50%",
                                            background: "#1677ff", flexShrink: 0,
                                            display: "inline-block",
                                        }} />
                                    )}
                                </div>
                                <div style={{ fontSize: 13, color: theme.dropdown.textSub, marginBottom: 4 }}>{n.desc}</div>
                                <div style={{ fontSize: 12, color: theme.dropdown.textSub }}>{n.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default NotificationsPage;
