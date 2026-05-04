import React, { Component } from "react";
import { Form, Input, Button, Alert, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import adminClient from "../../api/adminClient.js";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = { error: "", loading: false };
    }

    handleSubmit = async (values) => {
        this.setState({ loading: true, error: "" });
        try {
            const { data } = await adminClient.post("/auth/login", {
                username: values.username,
                password: values.password,
            });

            localStorage.setItem("token", data.jwt);
            localStorage.setItem("username", data.username);

            adminClient.get("/public/hello")
                .then((res) => console.log("[public/hello]", res.data))
                .catch((err) => console.error("[public/hello] error:", err));

            this.props.onLoginSuccess(data.username);
        } catch (err) {
            const msg = err.response?.status === 401
                ? "Sai username hoặc password"
                : "Đăng nhập thất bại, vui lòng thử lại";
            this.setState({ error: msg, loading: false });
        }
    };

    render() {
        const { error, loading } = this.state;

        return (
            <Form ref={this.formRef} onFinish={this.handleSubmit} layout="vertical" autoComplete="off">
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[{ required: true, message: "Vui lòng nhập username" }]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Nhập username"
                        size="large"
                        autoComplete="username"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Vui lòng nhập password" }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập password"
                        size="large"
                        autoComplete="current-password"
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 8 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        block
                        style={{ background: "linear-gradient(135deg, #4f8ef7, #1677ff)", border: "none" }}
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>

                <div style={{ textAlign: "center", fontSize: 13 }}>
                    Chưa có tài khoản?{" "}
                    <Link to="/register">Đăng ký ngay</Link>
                </div>

                <Divider plain style={{ fontSize: 12, color: "#aaa", margin: "20px 0 16px" }}>hoặc</Divider>

                <Button
                    size="large"
                    block
                    onClick={() => { window.location.href = "/api/auth/google"; }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid #d9d9d9", background: "#fff", color: "#444", fontWeight: 500 }}
                >
                    <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                    Đăng nhập với Google
                </Button>
            </Form>
        );
    }
}

export default LoginForm;
