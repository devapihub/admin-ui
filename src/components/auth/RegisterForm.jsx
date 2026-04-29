import React, { Component } from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import adminClient from "../../api/adminClient.js";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = { error: "", success: "", loading: false };
    }

    handleSubmit = async (values) => {
        this.setState({ loading: true, error: "", success: "" });
        try {
            await adminClient.post("/auth/register", {
                username: values.username,
                password: values.password,
            });
            this.setState({ success: "Đăng ký thành công! Bạn có thể đăng nhập ngay.", loading: false });
            this.formRef.current?.resetFields();
        } catch (err) {
            const msg = err.response?.status === 400
                ? (err.response.data || "Username đã tồn tại")
                : "Đăng ký thất bại, vui lòng thử lại";
            this.setState({ error: msg, loading: false });
        }
    };

    render() {
        const { error, success, loading } = this.state;

        return (
            <Form ref={this.formRef} onFinish={this.handleSubmit} layout="vertical" autoComplete="off">
                {error && (
                    <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />
                )}
                {success && (
                    <Alert message={success} type="success" showIcon style={{ marginBottom: 16 }} />
                )}

                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[
                        { required: true, message: "Vui lòng nhập username" },
                        { min: 3, message: "Username tối thiểu 3 ký tự" },
                    ]}
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
                    rules={[
                        { required: true, message: "Vui lòng nhập password" },
                        { min: 6, message: "Password tối thiểu 6 ký tự" },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập password"
                        size="large"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Vui lòng xác nhận password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu không khớp"));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập lại password"
                        size="large"
                        autoComplete="new-password"
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
                        Đăng ký
                    </Button>
                </Form.Item>

                <div style={{ textAlign: "center", fontSize: 13 }}>
                    Đã có tài khoản?{" "}
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </Form>
        );
    }
}

export default RegisterForm;
