import React, { Component } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { ALL_PERMISSIONS } from "./mockRoles.js";

const EMPTY_FORM = { name: "", description: "", permissions: [] };

class RoleFormModal extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = { ...EMPTY_FORM, errors: {} };
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.open && this.props.open) {
            const { initialData } = this.props;
            if (initialData) {
                this.setState({
                    name: initialData.name || "",
                    description: initialData.description || "",
                    permissions: [...(initialData.permissions || [])],
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

    handlePermissionToggle = (key) => {
        this.setState((prev) => {
            const has = prev.permissions.includes(key);
            return {
                permissions: has ? prev.permissions.filter((p) => p !== key) : [...prev.permissions, key],
                errors: { ...prev.errors, permissions: "" },
            };
        });
    };

    handleSelectAll = () => {
        const allKeys = ALL_PERMISSIONS.map((p) => p.key);
        this.setState((prev) => ({
            permissions: prev.permissions.length === allKeys.length ? [] : allKeys,
        }));
    };

    handleSubmit = () => {
        const { name, description, permissions } = this.state;
        const errors = {};
        if (!name.trim()) errors.name = "Vui lòng nhập tên role";
        if (permissions.length === 0) errors.permissions = "Vui lòng chọn ít nhất 1 permission";
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }
        this.props.onSubmit({ name: name.trim(), description: description.trim(), permissions });
    };

    render() {
        const { open, mode, onClose } = this.props;
        const { name, description, permissions, errors } = this.state;
        const { theme } = this.context;

        if (!open) return null;

        const isDark = theme.toggleIcon === "🌙";
        const isEdit = mode === "edit";
        const allKeys = ALL_PERMISSIONS.map((p) => p.key);
        const isAllSelected = permissions.length === allKeys.length;

        const cardStyle = {
            background: theme.dropdown.bg,
            borderRadius: 8,
            padding: "28px 32px",
            minWidth: 520,
            maxWidth: 620,
            width: "100%",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            maxHeight: "90vh",
            overflowY: "auto",
        };

        const labelStyle = {
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
            fontSize: 13,
            color: theme.dropdown.text,
        };

        const inputStyle = {
            width: "100%",
            padding: "8px 12px",
            border: `1px solid ${theme.dropdown.border}`,
            borderRadius: 4,
            fontSize: 14,
            boxSizing: "border-box",
            outline: "none",
            background: isDark ? "rgba(255,255,255,0.06)" : "#fff",
            color: theme.dropdown.text,
        };

        const cancelBtnStyle = {
            padding: "8px 20px",
            borderRadius: 4,
            border: `1px solid ${theme.dropdown.border}`,
            background: "transparent",
            color: theme.dropdown.text,
            cursor: "pointer",
            fontSize: 14,
        };

        return (
            <div
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={onClose}
            >
                <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
                    <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 16, color: theme.dropdown.text }}>
                        {isEdit ? "Chỉnh sửa Role" : "Thêm Role mới"}
                    </h3>

                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Tên Role <span style={{ color: "#ff4d4f" }}>*</span></label>
                        <input
                            style={{ ...inputStyle, borderColor: errors.name ? "#ff4d4f" : theme.dropdown.border }}
                            value={name}
                            onChange={(e) => this.handleChange("name", e.target.value)}
                            placeholder="VD: Admin, Editor, Viewer..."
                        />
                        {errors.name && <div style={{ color: "#ff4d4f", fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Mô tả</label>
                        <textarea
                            style={{ ...inputStyle, resize: "vertical" }}
                            rows={2}
                            value={description}
                            onChange={(e) => this.handleChange("description", e.target.value)}
                            placeholder="Mô tả ngắn về role này..."
                        />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <label style={{ ...labelStyle, margin: 0 }}>
                                Permissions <span style={{ color: "#ff4d4f" }}>*</span>
                            </label>
                            <button
                                style={{ fontSize: 12, padding: "3px 10px", borderRadius: 4, border: `1px solid ${theme.dropdown.border}`, background: "transparent", color: theme.dropdown.textSub, cursor: "pointer" }}
                                onClick={this.handleSelectAll}
                            >
                                {isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                            </button>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 8,
                            padding: 12,
                            border: `1px solid ${errors.permissions ? "#ff4d4f" : theme.dropdown.border}`,
                            borderRadius: 6,
                            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
                        }}>
                            {ALL_PERMISSIONS.map((perm) => {
                                const checked = permissions.includes(perm.key);
                                return (
                                    <label
                                        key={perm.key}
                                        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: theme.dropdown.text, userSelect: "none" }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => this.handlePermissionToggle(perm.key)}
                                            style={{ width: 14, height: 14, cursor: "pointer", accentColor: "#1677ff" }}
                                        />
                                        {perm.label}
                                    </label>
                                );
                            })}
                        </div>
                        {errors.permissions && <div style={{ color: "#ff4d4f", fontSize: 12, marginTop: 4 }}>{errors.permissions}</div>}
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${theme.dropdown.border}` }}>
                        <button style={cancelBtnStyle} onClick={onClose}>Huỷ</button>
                        <button
                            style={{ padding: "8px 20px", borderRadius: 4, border: "none", background: "#1677ff", color: "#fff", cursor: "pointer", fontSize: 14 }}
                            onClick={this.handleSubmit}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoleFormModal;
