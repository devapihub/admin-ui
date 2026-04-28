import React, { Component } from "react";
import { Modal, Typography } from "antd";

const { Text } = Typography;

class ToolDeleteDialog extends Component {
    render() {
        const { open, onConfirm, onCancel } = this.props;

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
                <p>Bạn có chắc muốn xoá sản phẩm này không?</p>
                <Text type="danger" style={{ fontSize: 13 }}>Hành động này không thể hoàn tác.</Text>
            </Modal>
        );
    }
}

export default ToolDeleteDialog;
