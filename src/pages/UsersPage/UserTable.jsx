import React, { Component } from "react";
import { Table, Tag, Button, Space, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons";

const ROLE_COLOR = {
    admin: "blue",
    moderator: "orange",
    user: "default",
};

const ROLE_LABEL = {
    admin: "Admin",
    moderator: "Moderator",
    user: "User",
};

class UserTable extends Component {
    render() {
        const { users, onEdit, onDelete, onToggleActive } = this.props;

        const columns = [
            {
                title: "STT",
                key: "stt",
                width: 60,
                render: (_, __, index) => index + 1,
            },
            {
                title: "Tên đăng nhập",
                dataIndex: "username",
                key: "username",
                render: (username) => (
                    <Space>
                        <Avatar size="small" icon={<UserOutlined />} style={{ background: "#1677ff" }} />
                        <strong>{username}</strong>
                    </Space>
                ),
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Vai trò",
                dataIndex: "role",
                key: "role",
                render: (role) => (
                    <Tag color={ROLE_COLOR[role] || "default"}>
                        {ROLE_LABEL[role] || role}
                    </Tag>
                ),
            },
            {
                title: "Trạng thái",
                dataIndex: "active",
                key: "active",
                render: (active) => (
                    <Tag color={active ? "success" : "error"}>
                        {active ? "Hoạt động" : "Đã khoá"}
                    </Tag>
                ),
            },
            {
                title: "Ngày tạo",
                dataIndex: "createdAt",
                key: "createdAt",
                render: (date) => new Date(date).toLocaleDateString("vi-VN"),
            },
            {
                title: "Thao tác",
                key: "actions",
                render: (_, record) => (
                    <Space size="small">
                        <Button size="small" icon={<EditOutlined />} onClick={() => onEdit(record)}>
                            Sửa
                        </Button>
                        <Button
                            size="small"
                            icon={record.active ? <LockOutlined /> : <UnlockOutlined />}
                            onClick={() => onToggleActive(record.id)}
                            style={{ color: record.active ? "#fa8c16" : "#52c41a" }}
                        >
                            {record.active ? "Khoá" : "Mở khoá"}
                        </Button>
                        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => onDelete(record.id)}>
                            Xoá
                        </Button>
                    </Space>
                ),
            },
        ];

        return (
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
                locale={{ emptyText: "Chưa có người dùng nào" }}
            />
        );
    }
}

export default UserTable;
