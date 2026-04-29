import React, { Component } from "react";
import { Form, Input, Button, Alert } from "antd";
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
            </Form>
        );
    }
}

export default LoginForm;
