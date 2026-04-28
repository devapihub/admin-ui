import React, { Component } from "react";
import { Modal, Form, Input, InputNumber, Select, Switch, Row, Col, Button } from "antd";
import { CATEGORIES } from "../../data/mockTools.js";

class ToolFormModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.open && this.props.open) {
            const { initialData } = this.props;
            if (this.formRef.current) {
                if (initialData) {
                    this.formRef.current.setFieldsValue({
                        name: initialData.name || "",
                        category: initialData.category || CATEGORIES[0],
                        price: initialData.price !== undefined ? initialData.price : "",
                        stock: initialData.stock !== undefined ? initialData.stock : "",
                        description: initialData.description || "",
                        active: initialData.active !== undefined ? initialData.active : true,
                    });
                } else {
                    this.formRef.current.resetFields();
                }
            }
        }
    }

    handleOk = () => {
        this.formRef.current.validateFields().then((values) => {
            this.props.onSubmit({
                name: values.name.trim(),
                category: values.category,
                price: Number(values.price),
                stock: Number(values.stock),
                description: values.description || "",
                active: values.active !== undefined ? values.active : true,
            });
        });
    };

    render() {
        const { open, mode, onClose } = this.props;
        const isEdit = mode === "edit";

        return (
            <Modal
                title={isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                open={open}
                onCancel={onClose}
                forceRender
                footer={
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        <Button onClick={onClose}>Huỷ</Button>
                        <Button type="primary" onClick={this.handleOk}>Lưu</Button>
                    </div>
                }
                width={560}
            >
                <Form
                    ref={this.formRef}
                    layout="vertical"
                    initialValues={{ category: CATEGORIES[0], active: true }}
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                    >
                        <Input placeholder="Nhập tên sản phẩm..." />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                    >
                        <Select>
                            {CATEGORIES.map((c) => (
                                <Select.Option key={c} value={c}>{c}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá (đ)"
                                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                            >
                                <InputNumber
                                    min={0}
                                    style={{ width: "100%" }}
                                    placeholder="VD: 199000"
                                    formatter={(v) => v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
                                    parser={(v) => v.replace(/,/g, "")}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="stock"
                                label="Tồn kho"
                                rules={[{ required: true, message: "Vui lòng nhập tồn kho" }]}
                            >
                                <InputNumber min={0} style={{ width: "100%" }} placeholder="VD: 100" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={3} placeholder="Mô tả ngắn về sản phẩm..." />
                    </Form.Item>

                    <Form.Item name="active" label="Trạng thái" valuePropName="checked">
                        <Switch checkedChildren="Đang bán" unCheckedChildren="Ngừng bán" />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default ToolFormModal;
