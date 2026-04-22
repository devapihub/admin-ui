import React, { Component } from "react";

const ROLES = ["admin", "moderator", "user"];

const EMPTY_FORM = {
    username: "",
    email: "",
    role: "user",
    active: true,
};

class UserFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = { ...EMPTY_FORM, errors: {} };
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.open && this.props.open) {
            const { initialData } = this.props;
            if (initialData) {
                this.setState({
                    username: initialData.username || "",
                    email: initialData.email || "",
                    role: initialData.role || "user",
                    active: initialData.active !== undefined ? initialData.active : true,
                    errors: {},
                });
            } else {
                this.setState({ ...EMPTY_FORM, errors: {} });
            }
        }
    }

    handleChange = (field, value) => {
        this.setState((prev) => ({
            [field]: value,
            errors: { ...prev.errors, [field]: "" },
        }));
    };

    handleSubmit = () => {
        const { username, email, role, active } = this.state;
        const errors = {};

        if (!username.trim()) errors.username = "Vui lòng nhập tên đăng nhập";
        if (!email.trim()) {
            errors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.email = "Email không hợp lệ";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        this.props.onSubmit({ username: username.trim(), email: email.trim(), role, active });
    };

    render() {
        const { open, mode, onClose } = this.props;
        const { username, email, role, active, errors } = this.state;

        if (!open) return null;

        const isEdit = mode === "edit";
        const title = isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới";

        const backdropStyle = {
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };

        const cardStyle = {
            background: "#fff",
            borderRadius: 8,
            padding: "28px 32px",
            minWidth: 440,
            maxWidth: 520,
            width: "100%",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            maxHeight: "90vh",
            overflowY: "auto",
        };

        const labelStyle = {
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
            fontSize: 13,
            color: "#333",
        };

        const inputStyle = {
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #d9d9d9",
            borderRadius: 4,
            fontSize: 14,
            boxSizing: "border-box",
            outline: "none",
            background: "#fff",
        };

        const errorStyle = { color: "#ff4d4f", fontSize: 12, marginTop: 4 };
        const fieldStyle = { marginBottom: 16 };

        const footerStyle = {
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid #f0f0f0",
        };

        const cancelBtnStyle = {
            padding: "8px 20px", borderRadius: 4,
            border: "1px solid #d9d9d9", background: "#fff",
            cursor: "pointer", fontSize: 14,
        };

        const submitBtnStyle = {
            padding: "8px 20px", borderRadius: 4,
            border: "none", background: "#1677ff",
            color: "#fff", cursor: "pointer", fontSize: 14,
        };

        const req = <span style={{ color: "#ff4d4f" }}>*</span>;

        return (
            <div style={backdropStyle} onClick={onClose}>
                <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
                    <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 16 }}>{title}</h3>

                    {/* Tên đăng nhập */}
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Tên đăng nhập {req}</label>
                        <input
                            style={{ ...inputStyle, borderColor: errors.username ? "#ff4d4f" : "#d9d9d9" }}
                            value={username}
                            onChange={(e) => this.handleChange("username", e.target.value)}
                            placeholder="Nhập tên đăng nhập..."
                        />
                        {errors.username && <div style={errorStyle}>{errors.username}</div>}
                    </div>

                    {/* Email */}
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Email {req}</label>
                        <input
                            style={{ ...inputStyle, borderColor: errors.email ? "#ff4d4f" : "#d9d9d9" }}
                            type="email"
                            value={email}
                            onChange={(e) => this.handleChange("email", e.target.value)}
                            placeholder="Nhập địa chỉ email..."
                        />
                        {errors.email && <div style={errorStyle}>{errors.email}</div>}
                    </div>

                    {/* Vai trò */}
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Vai trò {req}</label>
                        <select
                            style={inputStyle}
                            value={role}
                            onChange={(e) => this.handleChange("role", e.target.value)}
                        >
                            {ROLES.map((r) => (
                                <option key={r} value={r}>
                                    {r === "admin" ? "Admin" : r === "moderator" ? "Moderator" : "User"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Trạng thái */}
                    <div style={{ ...fieldStyle, display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                            type="checkbox"
                            id="user-active"
                            checked={active}
                            onChange={(e) => this.handleChange("active", e.target.checked)}
                            style={{ width: 16, height: 16, cursor: "pointer" }}
                        />
                        <label htmlFor="user-active" style={{ ...labelStyle, margin: 0, cursor: "pointer" }}>
                            Kích hoạt tài khoản
                        </label>
                    </div>

                    <div style={footerStyle}>
                        <button style={cancelBtnStyle} onClick={onClose}>Huỷ</button>
                        <button style={submitBtnStyle} onClick={this.handleSubmit}>Lưu</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserFormModal;
