import React, { Component } from "react";
import LoginForm from "../../components/auth/LoginForm";

class LoginPage extends Component {
    render() {
        const pageStyle = {
            minHeight: "100vh",
            display: "flex",
            fontFamily: "'Segoe UI', sans-serif",
        };

        // Left panel — branding
        const leftStyle = {
            width: "45%",
            background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 40px",
            color: "#fff",
        };

        const logoBoxStyle = {
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #4f8ef7, #1677ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            marginBottom: 24,
            boxShadow: "0 8px 24px rgba(79,142,247,0.4)",
        };

        const brandTitleStyle = {
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: 0.5,
        };

        const brandSubStyle = {
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            lineHeight: 1.7,
            maxWidth: 280,
        };

        const featureListStyle = {
            marginTop: 40,
            listStyle: "none",
            padding: 0,
            width: "100%",
            maxWidth: 280,
        };

        const featureItemStyle = {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            fontSize: 13,
            color: "rgba(255,255,255,0.75)",
        };

        const dotStyle = {
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#4f8ef7",
            flexShrink: 0,
        };

        // Right panel — form
        const rightStyle = {
            flex: 1,
            background: "#f7f9fc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
        };

        const cardStyle = {
            width: "100%",
            maxWidth: 400,
            background: "#fff",
            borderRadius: 12,
            padding: "36px 36px 32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        };

        const headingStyle = {
            fontSize: 22,
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: 6,
        };

        const subheadingStyle = {
            fontSize: 13,
            color: "#888",
            marginBottom: 28,
        };

        const dividerStyle = {
            borderTop: "1px solid #f0f0f0",
            margin: "20px 0",
        };

        const hintStyle = {
            textAlign: "center",
            fontSize: 12,
            color: "#bbb",
        };

        return (
            <div style={pageStyle}>
                {/* Left branding */}
                <div style={leftStyle}>
                    <div style={logoBoxStyle}>⚡</div>
                    <div style={brandTitleStyle}>DevAPIHub</div>
                    <div style={brandSubStyle}>
                        Nền tảng quản lý API và công cụ AI tập trung cho doanh nghiệp
                    </div>
                    <ul style={featureListStyle}>
                        {[
                            "Quản lý công cụ AI tạo nội dung",
                            "Phân quyền người dùng chi tiết",
                            "Theo dõi hoạt động hệ thống",
                        ].map((f) => (
                            <li key={f} style={featureItemStyle}>
                                <span style={dotStyle} />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right form */}
                <div style={rightStyle}>
                    <div style={cardStyle}>
                        <div style={headingStyle}>Chào mừng trở lại</div>
                        <div style={subheadingStyle}>Đăng nhập vào trang quản trị</div>

                        <LoginForm onLoginSuccess={this.props.onLoginSuccess} />

                        <div style={dividerStyle} />
                        <div style={hintStyle}>admin / admin</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
