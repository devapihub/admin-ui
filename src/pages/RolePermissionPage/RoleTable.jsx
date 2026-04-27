import React, { Component } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { ALL_PERMISSIONS } from "./mockRoles.js";

class RoleTable extends Component {
    static contextType = ThemeContext;

    render() {
        const { roles, onEdit, onDelete } = this.props;
        const { theme } = this.context;

        const isDark = theme.toggleIcon === "🌙";

        const tableStyle = {
            width: "100%",
            borderCollapse: "collapse",
            background: theme.dropdown.bg,
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
            color: theme.dropdown.textSub,
            background: isDark ? "rgba(255,255,255,0.04)" : "#fafafa",
            borderBottom: `1px solid ${theme.dropdown.border}`,
            whiteSpace: "nowrap",
        };

        const tdStyle = {
            padding: "12px 16px",
            borderBottom: `1px solid ${theme.dropdown.border}`,
            color: theme.dropdown.text,
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

        const permLabelMap = ALL_PERMISSIONS.reduce((acc, p) => {
            acc[p.key] = p.label;
            return acc;
        }, {});

        const permColors = [
            { bg: isDark ? "rgba(22,119,255,0.15)" : "#e6f4ff", color: "#1677ff", border: "#91caff" },
            { bg: isDark ? "rgba(82,196,26,0.15)" : "#f6ffed", color: "#52c41a", border: "#b7eb8f" },
            { bg: isDark ? "rgba(250,140,22,0.15)" : "#fff7e6", color: "#fa8c16", border: "#ffd591" },
            { bg: isDark ? "rgba(114,46,209,0.15)" : "#f9f0ff", color: "#722ed1", border: "#d3adf7" },
            { bg: isDark ? "rgba(255,77,79,0.15)" : "#fff1f0", color: "#ff4d4f", border: "#ffccc7" },
        ];

        return (
            <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên Role</th>
                            <th style={thStyle}>Mô tả</th>
                            <th style={thStyle}>Permissions</th>
                            <th style={thStyle}>Ngày tạo</th>
                            <th style={thStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ ...tdStyle, textAlign: "center", color: theme.dropdown.textSub, padding: 32 }}>
                                    Chưa có role nào
                                </td>
                            </tr>
                        ) : (
                            roles.map((role, index) => (
                                <tr key={role.id}>
                                    <td style={{ ...tdStyle, color: theme.dropdown.textSub, width: 48 }}>{index + 1}</td>
                                    <td style={{ ...tdStyle, fontWeight: 600, whiteSpace: "nowrap" }}>{role.name}</td>
                                    <td style={{ ...tdStyle, color: theme.dropdown.textSub, maxWidth: 200 }}>{role.description}</td>
                                    <td style={{ ...tdStyle, maxWidth: 400 }}>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                            {role.permissions.map((pKey, i) => {
                                                const c = permColors[i % permColors.length];
                                                return (
                                                    <span
                                                        key={pKey}
                                                        style={{
                                                            display: "inline-block",
                                                            padding: "2px 8px",
                                                            borderRadius: 4,
                                                            fontSize: 11,
                                                            fontWeight: 500,
                                                            background: c.bg,
                                                            color: c.color,
                                                            border: `1px solid ${c.border}`,
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {permLabelMap[pKey] || pKey}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </td>
                                    <td style={{ ...tdStyle, whiteSpace: "nowrap", color: theme.dropdown.textSub }}>
                                        {new Date(role.createdAt).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                                        <button style={editBtn} onClick={() => onEdit(role)}>Sửa</button>
                                        <button style={deleteBtn} onClick={() => onDelete(role)}>Xoá</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RoleTable;
