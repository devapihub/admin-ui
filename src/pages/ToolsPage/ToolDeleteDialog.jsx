import React, { Component } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

class ToolDeleteDialog extends Component {
    static contextType = ThemeContext;

    render() {
        const { open, onConfirm, onCancel } = this.props;
        const { theme } = this.context;

        if (!open) return null;

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
                onClick={onCancel}
            >
                <div
                    style={{ background: theme.dropdown.bg, borderRadius: 8, padding: "28px 32px", width: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: `1px solid ${theme.dropdown.border}` }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 style={{ marginTop: 0, fontSize: 16, color: theme.dropdown.text }}>Xác nhận xoá</h3>
                    <p style={{ color: theme.dropdown.textSub, fontSize: 14, lineHeight: 1.6 }}>
                        Bạn có chắc muốn xoá sản phẩm này không?
                        <br />
                        <span style={{ color: "#ff4d4f", fontSize: 13 }}>Hành động này không thể hoàn tác.</span>
                    </p>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
                        <button style={cancelBtnStyle} onClick={onCancel}>Huỷ</button>
                        <button style={{ padding: "8px 20px", borderRadius: 4, border: "none", background: "#ff4d4f", color: "#fff", cursor: "pointer", fontSize: 14 }} onClick={onConfirm}>Xoá</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolDeleteDialog;
