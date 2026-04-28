import React, { Component } from "react";
import { Table, Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

class ToolTable extends Component {
    render() {
        const { tools, onEdit, onDelete, onToggleActive } = this.props;

        const columns = [
            {
                title: "STT",
                key: "stt",
                width: 60,
                render: (_, __, index) => index + 1,
            },
            {
                title: "Tên sản phẩm",
                dataIndex: "name",
                key: "name",
                render: (name) => <strong>{name}</strong>,
            },
            {
                title: "Danh mục",
                dataIndex: "category",
                key: "category",
                render: (cat) => <Tag color="geekblue">{cat}</Tag>,
            },
            {
                title: "Giá",
                dataIndex: "price",
                key: "price",
                align: "right",
                render: (price) => <span style={{ color: "#1677ff", fontWeight: 500 }}>{formatPrice(price)}</span>,
            },
            {
                title: "Tồn kho",
                dataIndex: "stock",
                key: "stock",
                align: "right",
                render: (stock) => (
                    <span style={{ fontWeight: 600, color: stock === 0 ? "#ff4d4f" : stock < 10 ? "#fa8c16" : undefined }}>
                        {stock}
                    </span>
                ),
            },
            {
                title: "Trạng thái",
                dataIndex: "active",
                key: "active",
                render: (active) => (
                    <Tag color={active ? "success" : "error"}>
                        {active ? "Đang bán" : "Ngừng bán"}
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
                        <Button
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record)}
                        >
                            Sửa
                        </Button>
                        <Button
                            size="small"
                            icon={record.active ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            onClick={() => onToggleActive(record.id)}
                            style={{ color: record.active ? "#fa8c16" : "#52c41a" }}
                        >
                            {record.active ? "Ẩn" : "Bán"}
                        </Button>
                        <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(record.id)}
                        >
                            Xoá
                        </Button>
                    </Space>
                ),
            },
        ];

        return (
            <Table
                columns={columns}
                dataSource={tools}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
                locale={{ emptyText: "Chưa có sản phẩm nào" }}
            />
        );
    }
}

export default ToolTable;
