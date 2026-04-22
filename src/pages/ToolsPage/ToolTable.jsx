import React, { Component } from "react";

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

class ToolTable extends Component {
    render() {
        const { tools, onEdit, onDelete, onToggleActive } = this.props;

        const tableStyle = {
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            fontSize: 14,
        };

        const thStyle = {
            padding: "12px 16px",
            textAlign: "left",
            fontWeight: 600,
            fontSize: 13,
            color: "#555",
            background: "#fafafa",
            borderBottom: "1px solid #f0f0f0",
            whiteSpace: "nowrap",
        };

        const tdStyle = {
            padding: "12px 16px",
            borderBottom: "1px solid #f5f5f5",
            color: "#333",
            verticalAlign: "middle",
        };

        const btnBase = {
            padding: "5px 10px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            marginRight: 6,
        };

        const editBtn = { ...btnBase, background: "#e6f4ff", color: "#1677ff" };
        const deleteBtn = { ...btnBase, background: "#fff1f0", color: "#ff4d4f" };

        const categoryBadgeStyle = {
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 12,
            background: "#f0f5ff",
            color: "#2f54eb",
            border: "1px solid #adc6ff",
        };

        return (
            <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên sản phẩm</th>
                            <th style={thStyle}>Danh mục</th>
                            <th style={{ ...thStyle, textAlign: "right" }}>Giá</th>
                            <th style={{ ...thStyle, textAlign: "right" }}>Tồn kho</th>
                            <th style={thStyle}>Trạng thái</th>
                            <th style={thStyle}>Ngày tạo</th>
                            <th style={thStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ ...tdStyle, textAlign: "center", color: "#aaa", padding: 32 }}>
                                    Chưa có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            tools.map((product, index) => {
                                const toggleBtn = {
                                    ...btnBase,
                                    background: product.active ? "#fff7e6" : "#f6ffed",
                                    color: product.active ? "#fa8c16" : "#52c41a",
                                };

                                const badgeStyle = {
                                    display: "inline-block",
                                    padding: "2px 8px",
                                    borderRadius: 4,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    background: product.active ? "#f6ffed" : "#fff2f0",
                                    color: product.active ? "#52c41a" : "#ff4d4f",
                                    border: `1px solid ${product.active ? "#b7eb8f" : "#ffccc7"}`,
                                };

                                const stockStyle = {
                                    fontWeight: 600,
                                    color: product.stock === 0 ? "#ff4d4f" : product.stock < 10 ? "#fa8c16" : "#333",
                                };

                                const createdDate = new Date(product.createdAt).toLocaleDateString("vi-VN");

                                return (
                                    <tr key={product.id}>
                                        <td style={{ ...tdStyle, color: "#999", width: 48 }}>{index + 1}</td>
                                        <td style={{ ...tdStyle, fontWeight: 500, maxWidth: 220 }}>{product.name}</td>
                                        <td style={tdStyle}>
                                            <span style={categoryBadgeStyle}>{product.category}</span>
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: "right", fontWeight: 500, color: "#1677ff", whiteSpace: "nowrap" }}>
                                            {formatPrice(product.price)}
                                        </td>
                                        <td style={{ ...tdStyle, textAlign: "right" }}>
                                            <span style={stockStyle}>{product.stock}</span>
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={badgeStyle}>
                                                {product.active ? "Đang bán" : "Ngừng bán"}
                                            </span>
                                        </td>
                                        <td style={{ ...tdStyle, whiteSpace: "nowrap", color: "#888" }}>
                                            {createdDate}
                                        </td>
                                        <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                                            <button style={editBtn} onClick={() => onEdit(product)}>
                                                Sửa
                                            </button>
                                            <button style={toggleBtn} onClick={() => onToggleActive(product.id)}>
                                                {product.active ? "Ẩn" : "Bán"}
                                            </button>
                                            <button style={deleteBtn} onClick={() => onDelete(product.id)}>
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ToolTable;
