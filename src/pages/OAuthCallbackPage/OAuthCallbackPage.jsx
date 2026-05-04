import React, { Component } from "react";
import { Spin, Alert } from "antd";

class OAuthCallbackPage extends Component {
    constructor(props) {
        super(props);
        this.state = { error: "" };
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const error = params.get("error");
        const token = params.get("token");
        const username = params.get("username");

        if (error) {
            this.setState({ error: "Đăng nhập Google thất bại, vui lòng thử lại." });
            return;
        }

        if (token && username) {
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            this.props.onLoginSuccess(username);
            window.location.replace("/");
        } else {
            this.setState({ error: "Không nhận được thông tin đăng nhập từ server." });
        }
    }

    render() {
        const { error } = this.state;

        if (error) {
            return (
                <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Alert
                        message="Đăng nhập thất bại"
                        description={error}
                        type="error"
                        showIcon
                        style={{ maxWidth: 400 }}
                    />
                </div>
            );
        }

        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
                <Spin size="large" />
                <span style={{ color: "#888" }}>Đang xử lý đăng nhập...</span>
            </div>
        );
    }
}

export default OAuthCallbackPage;
