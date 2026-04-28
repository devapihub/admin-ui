import React, { Component } from "react";
import { Modal, Form, Input, Select, Switch, Button } from "antd";

const ROLES = [
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" },
];

class UserFormModal extends Component {
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
                        username: initialData.username || "",
                        email: initialData.email || "",
                        role: initialData.role || "user",
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
                username: values.username.trim(),
                email: values.email.trim(),
                role: values.role,
                active: values.active !== undefined ? values.active : true,
            });
        });
    };

    render() {
        const { open, mode, onClose } = this.props;
        const isEdit = mode === "edit";

        return (
            <Modal
                title={isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
                open={open}
                onCancel={onClose}
                forceRender
                footer={
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                        <Button onClick={onClose}>Huỷ</Button>
                        <Button type="primary" onClick={this.handleOk}>Lưu</Button>
                    </div>
                }
                width={480}
            >
                <Form
                    ref={this.formRef}
                    layout="vertical"
                    initialValues={{ role: "user", active: true }}
                >
                    <Form.Item
                        name="username"
                        label="Tên đăng nhập"
                        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                    >
                        <Input placeholder="Nhập tên đăng nhập..." />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input type="email" placeholder="Nhập địa chỉ email..." />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                    >
                        <Select options={ROLES} />
                    </Form.Item>

                    <Form.Item name="active" label="Trạng thái" valuePropName="checked">
                        <Switch checkedChildren="Kích hoạt" unCheckedChildren="Khoá" />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default UserFormModal;
