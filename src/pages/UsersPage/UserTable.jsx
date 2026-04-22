import React, { Component } from "react";

const ROLE_LABELS = {
    admin: { label: "Admin", bg: "#f0f5ff", color: "#2f54eb", border: "#adc6ff" },
    moderator: { label: "Moderator", bg: "#fff7e6", color: "#fa8c16", border: "#ffd591" },
    user: { label: "User", bg: "#f5f5f5", color: "#595959", border: "#d9d9d9" },
};

class UserTable extends Component {
    render() {
        const { users, onEdit, onDelete, onToggleActive } = this.props;

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

        return (
            <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên đăng nhập</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Vai trò</th>
                            <th style={thStyle}>Trạng thái</th>
                            <th style={thStyle}>Ngày tạo</th>
                            <th style={thStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ ...tdStyle, textAlign: "center", color: "#aaa", padding: 32 }}>
                                    Chưa có người dùng nào
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => {
                                const roleInfo = ROLE_LABELS[user.role] || ROLE_LABELS.user;

                                const roleBadgeStyle = {
                                    display: "inline-block",
                                    padding: "2px 8px",
                                    borderRadius: 4,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    background: roleInfo.bg,
                                    color: roleInfo.color,
                                    border: `1px solid ${roleInfo.border}`,
                                };

                                const statusBadgeStyle = {
                                    display: "inline-block",
                                    padding: "2px 8px",
                                    borderRadius: 4,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    background: user.active ? "#f6ffed" : "#fff2f0",
                                    color: user.active ? "#52c41a" : "#ff4d4f",
                                    border: `1px solid ${user.active ? "#b7eb8f" : "#ffccc7"}`,
                                };

                                const toggleBtn = {
                                    ...btnBase,
                                    background: user.active ? "#fff7e6" : "#f6ffed",
                                    color: user.active ? "#fa8c16" : "#52c41a",
                                };

                                const createdDate = new Date(user.createdAt).toLocaleDateString("vi-VN");

                                return (
                                    <tr key={user.id}>
                                        <td style={{ ...tdStyle, color: "#999", width: 48 }}>{index + 1}</td>
                                        <td style={{ ...tdStyle, fontWeight: 500 }}>{user.username}</td>
                                        <td style={{ ...tdStyle, color: "#555" }}>{user.email}</td>
                                        <td style={tdStyle}>
                                            <span style={roleBadgeStyle}>{roleInfo.label}</span>
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={statusBadgeStyle}>
                                                {user.active ? "Hoạt động" : "Đã khoá"}
                                            </span>
                                        </td>
                                        <td style={{ ...tdStyle, whiteSpace: "nowrap", color: "#888" }}>
                                            {createdDate}
                                        </td>
                                        <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                                            <button style={editBtn} onClick={() => onEdit(user)}>
                                                Sửa
                                            </button>
                                            <button style={toggleBtn} onClick={() => onToggleActive(user.id)}>
                                                {user.active ? "Khoá" : "Mở khoá"}
                                            </button>
                                            <button style={deleteBtn} onClick={() => onDelete(user.id)}>
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

export default UserTable;
