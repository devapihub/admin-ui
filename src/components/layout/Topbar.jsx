import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext.jsx";

class Topbar extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false, notifOpen: false };
        this.avatarRef = React.createRef();
        this.notifRef = React.createRef();
    }

    handleMouseEnter = () => {
        this.setState({ dropdownOpen: true });
    };

    handleMouseLeave = () => {
        this.setState({ dropdownOpen: false });
    };

    handleNotifToggle = () => {
        this.setState((prev) => ({ notifOpen: !prev.notifOpen }));
    };

    handleNotifBlur = (e) => {
        if (this.notifRef.current && !this.notifRef.current.contains(e.relatedTarget)) {
            this.setState({ notifOpen: false });
        }
    };

    render() {
        const { username, onLogout } = this.props;
        const { dropdownOpen, notifOpen } = this.state;
        const { theme, toggleTheme } = this.context;

        const initial = username ? username.charAt(0).toUpperCase() : "U";

        const topbarStyle = {
            height: 56,
            background: theme.topbar.bg,
            boxShadow: theme.topbar.shadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            flexShrink: 0,
            zIndex: 100,
        };

        const avatarStyle = {
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#1677ff",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            userSelect: "none",
            flexShrink: 0,
        };

        const toggleBtnStyle = {
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 6,
            lineHeight: 1,
        };

        const dropdownStyle = {
            position: "absolute",
            top: 48,
            right: 0,
            background: theme.dropdown.bg,
            borderRadius: 8,
            boxShadow: theme.dropdown.shadow,
            minWidth: 180,
            zIndex: 999,
            overflow: "hidden",
            border: `1px solid ${theme.dropdown.border}`,
        };

        const dropdownHeaderStyle = {
            padding: "12px 16px",
            borderBottom: `1px solid ${theme.dropdown.border}`,
            fontSize: 13,
            color: theme.dropdown.textSub,
        };

        const dropdownUsernameStyle = {
            fontWeight: 600,
            color: theme.dropdown.text,
            fontSize: 14,
        };

        const logoutItemStyle = {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            fontSize: 14,
            color: "#ff4d4f",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            width: "100%",
            textAlign: "left",
        };

        return (
            <div style={topbarStyle}>
                <span style={{ fontSize: 15, fontWeight: 600, color: theme.topbar.text }}>
                    DevAPIHub Admin
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Theme toggle */}
                    <button
                        style={toggleBtnStyle}
                        onClick={toggleTheme}
                        title="Đổi theme"
                    >
                        {theme.toggleIcon}
                    </button>

                    {/* Notification bell */}
                    <div
                        style={{ position: "relative" }}
                        ref={this.notifRef}
                        onBlur={this.handleNotifBlur}
                    >
                        <button
                            style={{ ...toggleBtnStyle, fontSize: 20 }}
                            onClick={this.handleNotifToggle}
                            title="Thông báo"
                        >
                            <span style={{ position: "relative", display: "inline-block" }}>
                                🔔
                                <span style={{
                                    position: "absolute",
                                    top: -4,
                                    right: -4,
                                    background: "#ff4d4f",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    width: 16,
                                    height: 16,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    lineHeight: 1,
                                }}>3</span>
                            </span>
                        </button>

                        {notifOpen && (
                            <div style={{
                                position: "absolute",
                                top: 48,
                                right: 0,
                                background: theme.dropdown.bg,
                                borderRadius: 8,
                                boxShadow: theme.dropdown.shadow,
                                width: 300,
                                zIndex: 999,
                                border: `1px solid ${theme.dropdown.border}`,
                                overflow: "hidden",
                            }}>
                                <div style={{
                                    padding: "12px 16px",
                                    borderBottom: `1px solid ${theme.dropdown.border}`,
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: theme.dropdown.text,
                                }}>
                                    Thông báo
                                </div>
                                {[
                                    { id: 1, title: "Người dùng mới đăng ký", time: "2 phút trước", unread: true },
                                    { id: 2, title: "Tool AI được cập nhật", time: "1 giờ trước", unread: true },
                                    { id: 3, title: "Báo cáo hàng tuần sẵn sàng", time: "3 giờ trước", unread: true },
                                ].map((n) => (
                                    <div
                                        key={n.id}
                                        style={{
                                            padding: "12px 16px",
                                            borderBottom: `1px solid ${theme.dropdown.border}`,
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 10,
                                            cursor: "pointer",
                                            background: n.unread
                                                ? (theme.toggleIcon === "🌙" ? "rgba(22,119,255,0.06)" : "rgba(22,119,255,0.04)")
                                                : "transparent",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = theme.toggleIcon === "🌙" ? "rgba(255,255,255,0.05)" : "#f5f5f5")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? (theme.toggleIcon === "🌙" ? "rgba(22,119,255,0.06)" : "rgba(22,119,255,0.04)") : "transparent")}
                                    >
                                        <span style={{
                                            width: 8, height: 8, borderRadius: "50%",
                                            background: n.unread ? "#1677ff" : "transparent",
                                            flexShrink: 0, marginTop: 5,
                                        }} />
                                        <div>
                                            <div style={{ fontSize: 13, color: theme.dropdown.text, marginBottom: 2 }}>{n.title}</div>
                                            <div style={{ fontSize: 11, color: theme.dropdown.textSub }}>{n.time}</div>
                                        </div>
                                    </div>
                                ))}
                                <Link
                                    to="/notifications"
                                    onClick={() => this.setState({ notifOpen: false })}
                                    style={{
                                        display: "block",
                                        padding: "10px 16px",
                                        textAlign: "center",
                                        fontSize: 13,
                                        color: "#1677ff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Xem tất cả thông báo
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Avatar + dropdown */}
                    <div
                        style={{ position: "relative" }}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        ref={this.avatarRef}
                    >
                        <div style={avatarStyle}>{initial}</div>

                        {dropdownOpen && (
                            <div style={dropdownStyle}>
                                <div style={dropdownHeaderStyle}>
                                    <div style={{ fontSize: 12, marginBottom: 2 }}>Đang đăng nhập</div>
                                    <div style={dropdownUsernameStyle}>{username}</div>
                                </div>
                                <button
                                    style={logoutItemStyle}
                                    onClick={onLogout}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fff2f0")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                    <span>⎋</span>
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Topbar;
