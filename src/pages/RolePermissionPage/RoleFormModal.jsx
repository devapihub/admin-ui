import React, { Component } from "react";
import { Modal, Form, Input, Checkbox, Button, Row, Col } from "antd";
import { ALL_PERMISSIONS } from "./mockRoles.js";

class RoleFormModal extends Component {
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
                        description: initialData.description || "",
                        permissions: initialData.permissions || [],
                    });
                } else {
                    this.formRef.current.resetFields();
                }
            }
        }
    }

    handleSelectAll = () => {
        const current = this.formRef.current.getFieldValue("permissions") || [];
        const allKeys = ALL_PERMISSIONS.map((p) => p.key);
        const next = current.length === allKeys.length ? [] : allKeys;
        this.formRef.current.setFieldsValue({ permissions: next });
    };

    handleOk = () => {
        this.formRef.current.validateFields().then((values) => {
            this.props.onSubmit({
                name: values.name.trim(),
                description: (values.description || "").trim(),
                permissions: values.permissions || [],
            });
        });
    };

    render() {
        const { open, mode, onClose } = this.props;
        const isEdit = mode === "edit";
        const allKeys = ALL_PERMISSIONS.map((p) => p.key);

        const checkboxOptions = ALL_PERMISSIONS.map((p) => ({ label: p.label, value: p.key }));

        return (
            <Modal
                title={isEdit ? "Chỉnh sửa Role" : "Thêm Role mới"}
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
                <Form ref={this.formRef} layout="vertical" initialValues={{ permissions: [] }}>
                    <Form.Item
                        name="name"
                        label="Tên Role"
                        rules={[{ required: true, message: "Vui lòng nhập tên role" }]}
                    >
                        <Input placeholder="VD: Admin, Editor, Viewer..." />
                    </Form.Item>

                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={2} placeholder="Mô tả ngắn về role này..." />
                    </Form.Item>

                    <Form.Item
                        name="permissions"
                        label={
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                <span>Permissions <span style={{ color: "#ff4d4f" }}>*</span></span>
                                <Button size="small" type="link" onClick={this.handleSelectAll} style={{ padding: 0 }}>
                                    Chọn/Bỏ chọn tất cả
                                </Button>
                            </div>
                        }
                        rules={[{ required: true, message: "Vui lòng chọn ít nhất 1 permission", type: "array", min: 1 }]}
                    >
                        <Checkbox.Group style={{ width: "100%" }}>
                            <Row gutter={[8, 8]}>
                                {checkboxOptions.map((opt) => (
                                    <Col span={12} key={opt.value}>
                                        <Checkbox value={opt.value}>{opt.label}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default RoleFormModal;
