import React, { Component } from "react";
import { CATEGORIES } from "../../data/mockTools.js";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const EMPTY_FORM = {
    name: "",
    category: CATEGORIES[0],
    price: "",
    stock: "",
    description: "",
    active: true,
};

class ToolFormModal extends Component {
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
                    category: initialData.category || CATEGORIES[0],
                    price: initialData.price !== undefined ? String(initialData.price) : "",
                    stock: initialData.stock !== undefined ? String(initialData.stock) : "",
                    description: initialData.description || "",
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
        const { name, category, price, stock, description, active } = this.state;
        const errors = {};

        if (!name.trim()) errors.name = "Vui lòng nhập tên sản phẩm";
        if (!price || isNaN(Number(price)) || Number(price) < 0) errors.price = "Giá không hợp lệ";
        if (!stock || isNaN(Number(stock)) || Number(stock) < 0) errors.stock = "Tồn kho không hợp lệ";

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        this.props.onSubmit({ name: name.trim(), category, price: Number(price), stock: Number(stock), description, active });
    };

    render() {
        const { open, mode, onClose } = this.props;
        const { name, category, price, stock, description, active, errors } = this.state;
        const { theme } = this.context;

        if (!open) return null;

        const isEdit = mode === "edit";

        const cardStyle = {
            background: theme.dropdown.bg,
            borderRadius: 8,
            padding: "28px 32px",
            minWidth: 480,
            maxWidth: 580,
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
            background: theme.toggleIcon === "🌙" ? "rgba(255,255,255,0.06)" : "#fff",
            color: theme.dropdown.text,
        };

        const cancelBtnStyle = {
            padding: "8px 20px", borderRadius: 4,
            border: `1px solid ${theme.dropdown.border}`,
            background: "transparent",
            color: theme.dropdown.text,
            cursor: "pointer", fontSize: 14,
        };

        return (
            <div
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={onClose}
            >
                <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
                    <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 16, color: theme.dropdown.text }}>
                        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                    </h3>

                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Tên sản phẩm <span style={{ color: "#ff4d4f" }}>*</span></label>
                        <input
                            style={{ ...inputStyle, borderColor: errors.name ? "#ff4d4f" : theme.dropdown.border }}
                            value={name}
                            onChange={(e) => this.handleChange("name", e.target.value)}
                            placeholder="Nhập tên sản phẩm..."
                        />
                        {errors.name && <div style={{ color: "#ff4d4f", fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Danh mục <span style={{ color: "#ff4d4f" }}>*</span></label>
                        <select style={inputStyle} value={category} onChange={(e) => this.handleChange("category", e.target.value)}>
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Giá (đ) <span style={{ color: "#ff4d4f" }}>*</span></label>
                            <input
                                style={{ ...inputStyle, borderColor: errors.price ? "#ff4d4f" : theme.dropdown.border }}
                                type="number" min="0" value={price}
                                onChange={(e) => this.handleChange("price", e.target.value)}
                                placeholder="VD: 199000"
                            />
                            {errors.price && <div style={{ color: "#ff4d4f", fontSize: 12, marginTop: 4 }}>{errors.price}</div>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Tồn kho <span style={{ color: "#ff4d4f" }}>*</span></label>
                            <input
                                style={{ ...inputStyle, borderColor: errors.stock ? "#ff4d4f" : theme.dropdown.border }}
                                type="number" min="0" value={stock}
                                onChange={(e) => this.handleChange("stock", e.target.value)}
                                placeholder="VD: 100"
                            />
                            {errors.stock && <div style={{ color: "#ff4d4f", fontSize: 12, marginTop: 4 }}>{errors.stock}</div>}
                        </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Mô tả</label>
                        <textarea
                            style={{ ...inputStyle, resize: "vertical" }}
                            rows={3} value={description}
                            onChange={(e) => this.handleChange("description", e.target.value)}
                            placeholder="Mô tả ngắn về sản phẩm..."
                        />
                    </div>

                    <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                            type="checkbox" id="product-active" checked={active}
                            onChange={(e) => this.handleChange("active", e.target.checked)}
                            style={{ width: 16, height: 16, cursor: "pointer" }}
                        />
                        <label htmlFor="product-active" style={{ ...labelStyle, margin: 0, cursor: "pointer" }}>Đang bán</label>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${theme.dropdown.border}` }}>
                        <button style={cancelBtnStyle} onClick={onClose}>Huỷ</button>
                        <button style={{ padding: "8px 20px", borderRadius: 4, border: "none", background: "#1677ff", color: "#fff", cursor: "pointer", fontSize: 14 }} onClick={this.handleSubmit}>Lưu</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolFormModal;
