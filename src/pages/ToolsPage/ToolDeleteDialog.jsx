import React, { Component } from "react";

class ToolDeleteDialog extends Component {
    render() {
        const { open, onConfirm, onCancel } = this.props;

        if (!open) return null;

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
            width: 400,
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        };

        const footerStyle = {
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 24,
        };

        const cancelBtnStyle = {
            padding: "8px 20px",
            borderRadius: 4,
            border: "1px solid #d9d9d9",
            background: "#fff",
            cursor: "pointer",
            fontSize: 14,
        };

        const deleteBtnStyle = {
            padding: "8px 20px",
            borderRadius: 4,
            border: "none",
            background: "#ff4d4f",
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
        };

        return (
            <div style={backdropStyle} onClick={onCancel}>
                <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
                    <h3 style={{ marginTop: 0, fontSize: 16, color: "#333" }}>Xác nhận xoá</h3>
                    <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6 }}>
                        Bạn có chắc muốn xoá sản phẩm này không?
                        <br />
                        <span style={{ color: "#ff4d4f", fontSize: 13 }}>
                            Hành động này không thể hoàn tác.
                        </span>
                    </p>
                    <div style={footerStyle}>
                        <button style={cancelBtnStyle} onClick={onCancel}>Huỷ</button>
                        <button style={deleteBtnStyle} onClick={onConfirm}>Xoá</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolDeleteDialog;
