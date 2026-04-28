import React, { Component } from "react";
import { Card, Typography } from "antd";
import LoginForm from "../../components/auth/LoginForm";

const { Title, Text } = Typography;

const FEATURES = [
    "Quản lý công cụ AI tạo nội dung",
    "Phân quyền người dùng chi tiết",
    "Theo dõi hoạt động hệ thống",
];

class LoginPage extends Component {
    render() {
        return (
            <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Segoe UI', sans-serif" }}>
                {/* Left branding */}
                <div
                    style={{
                        width: "45%",
                        background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "48px 40px",
                        color: "#fff",
                    }}
                >
                    <div
                        style={{
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
                        }}
                    >
                        ⚡
                    </div>
                    <Title level={2} style={{ color: "#fff", margin: 0, marginBottom: 12 }}>
                        DevAPIHub
                    </Title>
                    <Text style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: 280, lineHeight: 1.7 }}>
                        Nền tảng quản lý API và công cụ AI tập trung cho doanh nghiệp
                    </Text>
                    <ul style={{ marginTop: 40, listStyle: "none", padding: 0, width: "100%", maxWidth: 280 }}>
                        {FEATURES.map((f) => (
                            <li
                                key={f}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "10px 0",
                                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                                    fontSize: 13,
                                    color: "rgba(255,255,255,0.75)",
                                }}
                            >
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4f8ef7", flexShrink: 0, display: "inline-block" }} />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right form */}
                <div
                    style={{
                        flex: 1,
                        background: "#f7f9fc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px 24px",
                    }}
                >
                    <Card style={{ width: "100%", maxWidth: 420, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                        <Title level={3} style={{ marginBottom: 4 }}>Chào mừng trở lại</Title>
                        <Text type="secondary" style={{ display: "block", marginBottom: 28 }}>
                            Đăng nhập vào trang quản trị
                        </Text>
                        <LoginForm onLoginSuccess={this.props.onLoginSuccess} />
                        <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 20, paddingTop: 16, textAlign: "center" }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>admin / admin</Text>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default LoginPage;
