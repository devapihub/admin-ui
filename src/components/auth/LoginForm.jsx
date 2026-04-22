import React, { Component } from "react";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            showPassword: false,
            error: "",
            loading: false,
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, error: "" });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        if (!username || !password) {
            this.setState({ error: "Vui lòng nhập đầy đủ username và password" });
            return;
        }

        this.setState({ loading: true, error: "" });

        // Simulate a brief loading delay for UX
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
        const { username, password, showPassword, error, loading } = this.state;

        const fieldStyle = { marginBottom: 20 };

        const labelStyle = {
            display: "block",
            marginBottom: 6,
            fontSize: 13,
            fontWeight: 500,
            color: "#555",
        };

        const inputWrapperStyle = { position: "relative" };

        const inputStyle = {
            width: "100%",
            padding: "11px 14px",
            borderRadius: 6,
            border: "1.5px solid #e0e0e0",
            fontSize: 14,
            boxSizing: "border-box",
            outline: "none",
            transition: "border-color 0.2s",
            color: "#333",
            background: "#fafafa",
        };

        const inputFocusStyle = {
            ...inputStyle,
            borderColor: "#4f8ef7",
            background: "#fff",
        };

        const toggleBtnStyle = {
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#aaa",
            fontSize: 13,
            padding: 0,
        };

        const errorStyle = {
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#fff2f0",
            border: "1px solid #ffccc7",
            borderRadius: 6,
            padding: "10px 14px",
            marginBottom: 18,
            color: "#ff4d4f",
            fontSize: 13,
        };

        const submitBtnStyle = {
            width: "100%",
            padding: "12px",
            borderRadius: 6,
            border: "none",
            background: loading ? "#a0c4ff" : "linear-gradient(135deg, #4f8ef7, #1677ff)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: 0.5,
            transition: "opacity 0.2s",
        };

        return (
            <form onSubmit={this.handleSubmit} autoComplete="off">
                {error && (
                    <div style={errorStyle}>
                        <span>⚠</span>
                        <span>{error}</span>
                    </div>
                )}

                <div style={fieldStyle}>
                    <label style={labelStyle}>Tên đăng nhập</label>
                    <input
                        style={username ? inputFocusStyle : inputStyle}
                        type="text"
                        name="username"
                        placeholder="Nhập username"
                        value={username}
                        onChange={this.handleChange}
                        autoComplete="username"
                    />
                </div>

                <div style={fieldStyle}>
                    <label style={labelStyle}>Mật khẩu</label>
                    <div style={inputWrapperStyle}>
                        <input
                            style={password ? { ...inputFocusStyle, paddingRight: 44 } : { ...inputStyle, paddingRight: 44 }}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Nhập password"
                            value={password}
                            onChange={this.handleChange}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            style={toggleBtnStyle}
                            onClick={() => this.setState({ showPassword: !showPassword })}
                            tabIndex={-1}
                        >
                            {showPassword ? "Ẩn" : "Hiện"}
                        </button>
                    </div>
                </div>

                <button type="submit" style={submitBtnStyle} disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
            </form>
        );
    }
}

export default LoginForm;
