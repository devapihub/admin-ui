import React, { Component } from "react";

class Topbar extends Component {
    render() {
        const { username, onLogout } = this.props;

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

        const rightStyle = {
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 14,
            color: "#555",
        };

        const logoutBtnStyle = {
            padding: "6px 14px",
            borderRadius: 4,
            border: "1px solid #ff4d4f",
            background: "transparent",
            color: "#ff4d4f",
            cursor: "pointer",
            fontSize: 13,
        };

        return (
            <div style={topbarStyle}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e" }}>
                    DevAPIHub Admin
                </span>
                <div style={rightStyle}>
                    <span>Xin chào, <strong>{username}</strong></span>
                    <button style={logoutBtnStyle} onClick={onLogout}>
                        Đăng xuất
                    </button>
                </div>
            </div>
        );
    }
}

export default Topbar;
