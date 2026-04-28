import React, { Component } from "react";
import { Table, Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ALL_PERMISSIONS } from "./mockRoles.js";

const PERM_COLORS = ["blue", "green", "orange", "purple", "red", "cyan", "magenta", "gold"];

const permLabelMap = ALL_PERMISSIONS.reduce((acc, p) => {
    acc[p.key] = p.label;
    return acc;
}, {});

class RoleTable extends Component {
    render() {
        const { roles, onEdit, onDelete } = this.props;

        const columns = [
            {
                title: "STT",
                key: "stt",
                width: 60,
                render: (_, __, index) => index + 1,
            },
            {
                title: "Tên Role",
                dataIndex: "name",
                key: "name",
                render: (name) => <strong>{name}</strong>,
            },
            {
                title: "Mô tả",
                dataIndex: "description",
                key: "description",
            },
            {
                title: "Permissions",
                dataIndex: "permissions",
                key: "permissions",
                render: (permissions) => (
                    <Space size={4} wrap>
                        {permissions.map((pKey, i) => (
                            <Tag key={pKey} color={PERM_COLORS[i % PERM_COLORS.length]}>
                                {permLabelMap[pKey] || pKey}
                            </Tag>
                        ))}
                    </Space>
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
                        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => onDelete(record)}>
                            Xoá
                        </Button>
                    </Space>
                ),
            },
        ];

        return (
            <Table
                columns={columns}
                dataSource={roles}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
                locale={{ emptyText: "Chưa có role nào" }}
            />
        );
    }
}

export default RoleTable;
