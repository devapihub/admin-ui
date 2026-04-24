import React, { Component } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

class Topbar extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false };
        this.avatarRef = React.createRef();
    }

    handleMouseEnter = () => {
        this.setState({ dropdownOpen: true });
    };

    handleMouseLeave = () => {
        this.setState({ dropdownOpen: false });
    };

    render() {
        const { username, onLogout } = this.props;
        const { dropdownOpen } = this.state;
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
