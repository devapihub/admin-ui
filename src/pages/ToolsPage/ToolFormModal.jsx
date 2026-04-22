import React, { Component } from "react";
import { CATEGORIES } from "../../data/mockTools.js";

const EMPTY_FORM = {
    name: "",
    category: CATEGORIES[0],
    price: "",
    stock: "",
    description: "",
    active: true,
};

class ToolFormModal extends Component {
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
        if (!price || isNaN(Number(price)) || Number(price) < 0)
            errors.price = "Giá không hợp lệ";
        if (!stock || isNaN(Number(stock)) || Number(stock) < 0)
            errors.stock = "Tồn kho không hợp lệ";

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        this.props.onSubmit({
            name: name.trim(),
            category,
            price: Number(price),
            stock: Number(stock),
            description,
            active,
        });
    };

    render() {
        const { open, mode, onClose } = this.props;
        const { name, category, price, stock, description, active, errors } = this.state;

        if (!open) return null;

        const isEdit = mode === "edit";
        const title = isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới";

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
            minWidth: 480,
            maxWidth: 580,
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

        const rowStyle = { display: "flex", gap: 16 };
        const halfStyle = { flex: 1 };

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

                    {/* Tên sản phẩm */}
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Tên sản phẩm {req}</label>
                        <input
                            style={{ ...inputStyle, borderColor: errors.name ? "#ff4d4f" : "#d9d9d9" }}
                            value={name}
                            onChange={(e) => this.handleChange("name", e.target.value)}
                            placeholder="Nhập tên sản phẩm..."
                        />
                        {errors.name && <div style={errorStyle}>{errors.name}</div>}
                    </div>

                    {/* Danh mục */}
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Danh mục {req}</label>
                        <select
                            style={{ ...inputStyle }}
                            value={category}
                            onChange={(e) => this.handleChange("category", e.target.value)}
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Giá + Tồn kho hàng ngang */}
                    <div style={{ ...rowStyle, marginBottom: 16 }}>
                        <div style={halfStyle}>
                            <label style={labelStyle}>Giá (đ) {req}</label>
                            <input
                                style={{ ...inputStyle, borderColor: errors.price ? "#ff4d4f" : "#d9d9d9" }}
                                type="number"
                                min="0"
                                value={price}
                                onChange={(e) => this.handleChange("price", e.target.value)}
                                placeholder="VD: 199000"
                            />
                            {errors.price && <div style={errorStyle}>{errors.price}</div>}
                        </div>
                        <div style={halfStyle}>
                            <label style={labelStyle}>Tồn kho {req}</label>
                            <input
                                style={{ ...inputStyle, borderColor: errors.stock ? "#ff4d4f" : "#d9d9d9" }}
                                type="number"
                                min="0"
                                value={stock}
                                onChange={(e) => this.handleChange("stock", e.target.value)}
                                placeholder="VD: 100"
                            />
                            {errors.stock && <div style={errorStyle}>{errors.stock}</div>}
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Mô tả</label>
                        <textarea
                            style={{ ...inputStyle, resize: "vertical" }}
                            rows={3}
                            value={description}
                            onChange={(e) => this.handleChange("description", e.target.value)}
                            placeholder="Mô tả ngắn về sản phẩm..."
                        />
                    </div>

                    {/* Trạng thái */}
                    <div style={{ ...fieldStyle, display: "flex", alignItems: "center", gap: 10 }}>
                        <input
                            type="checkbox"
                            id="product-active"
                            checked={active}
                            onChange={(e) => this.handleChange("active", e.target.checked)}
                            style={{ width: 16, height: 16, cursor: "pointer" }}
                        />
                        <label htmlFor="product-active" style={{ ...labelStyle, margin: 0, cursor: "pointer" }}>
                            Đang bán
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

export default ToolFormModal;
