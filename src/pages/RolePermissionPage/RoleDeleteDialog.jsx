import React, { Component } from "react";
import { Modal, Typography } from "antd";

const { Text } = Typography;

class RoleDeleteDialog extends Component {
    render() {
        const { open, roleName, onConfirm, onCancel } = this.props;

        return (
            <Modal
                title="Xác nhận xoá"
                open={open}
                onOk={onConfirm}
                onCancel={onCancel}
                okText="Xoá"
                cancelText="Huỷ"
                okButtonProps={{ danger: true }}
            >
                <p>
                    Bạn có chắc muốn xoá role <Text strong>{roleName}</Text> không?
                </p>
                <Text type="danger" style={{ fontSize: 13 }}>Hành động này không thể hoàn tác.</Text>
            </Modal>
        );
    }
}

export default RoleDeleteDialog;
