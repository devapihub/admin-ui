import React, { Component } from "react";

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false };
        this.avatarRef = React.createRef();
    }

    handleMouseEnter = () => {
        if (this.leaveTimeout) clearTimeout(this.leaveTimeout);
        this.setState({ dropdownOpen: true });
    };

    handleMouseLeave = () => {
        this.leaveTimeout = setTimeout(() => {
            this.setState({ dropdownOpen: false });
        }, 150);
    };

    render() {
        const { username, onLogout } = this.props;
        const { dropdownOpen } = this.state;

        const initial = username ? username.charAt(0).toUpperCase() : "U";

        const topbarStyle = {
            height: 56,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
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

        const dropdownStyle = {
            position: "absolute",
            top: 48,
            right: 0,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            minWidth: 180,
            zIndex: 999,
            overflow: "hidden",
            border: "1px solid #f0f0f0",
        };

        const dropdownHeaderStyle = {
            padding: "12px 16px",
            borderBottom: "1px solid #f0f0f0",
            fontSize: 13,
            color: "#888",
        };

        const dropdownUsernameStyle = {
            fontWeight: 600,
            color: "#333",
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
                <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>
                    DevAPIHub Admin
                </span>

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
        );
    }
}

export default Topbar;
