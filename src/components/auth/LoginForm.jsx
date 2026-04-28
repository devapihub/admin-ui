import React, { Component } from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = { error: "", loading: false };
    }

    handleSubmit = (values) => {
        const { username, password } = values;
        this.setState({ loading: true, error: "" });

        setTimeout(() => {
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                localStorage.setItem("token", "mock-admin-token");
                localStorage.setItem("username", username);
                this.props.onLoginSuccess(username);
            } else {
                this.setState({ error: "Sai username hoặc password", loading: false });
            }
        }, 600);
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

                <Form.Item style={{ marginBottom: 0 }}>
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
            </Form>
        );
    }
}

export default LoginForm;
