import React, { Component } from "react";
import { Typography, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MOCK_TOOLS } from "../../data/mockTools.js";
import ToolTable from "./ToolTable.jsx";
import ToolFormModal from "./ToolFormModal.jsx";
import ToolDeleteDialog from "./ToolDeleteDialog.jsx";

const { Title } = Typography;

class ToolsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: [],
            modalOpen: false,
            modalMode: "create",
            editingTool: null,
            deleteDialogOpen: false,
            deletingToolId: null,
        };
    }

    componentDidMount() {
        this.setState({ tools: [...MOCK_TOOLS] });
    }

    handleCreate = () => {
        this.setState({ modalOpen: true, modalMode: "create", editingTool: null });
    };

    handleEdit = (tool) => {
        this.setState({ modalOpen: true, modalMode: "edit", editingTool: tool });
    };

    handleModalClose = () => {
        this.setState({ modalOpen: false, editingTool: null });
    };

    handleFormSubmit = (formData) => {
        const { modalMode, editingTool, tools } = this.state;
        if (modalMode === "create") {
            const newTool = { ...formData, id: Date.now(), createdAt: new Date().toISOString() };
            this.setState({ tools: [...tools, newTool], modalOpen: false });
        } else {
            const updated = tools.map((t) => t.id === editingTool.id ? { ...t, ...formData } : t);
            this.setState({ tools: updated, modalOpen: false, editingTool: null });
        }
    };

    handleDeleteRequest = (id) => {
        this.setState({ deleteDialogOpen: true, deletingToolId: id });
    };

    handleDeleteConfirm = () => {
        const { tools, deletingToolId } = this.state;
        this.setState({ tools: tools.filter((t) => t.id !== deletingToolId), deleteDialogOpen: false, deletingToolId: null });
    };

    handleDeleteCancel = () => {
        this.setState({ deleteDialogOpen: false, deletingToolId: null });
    };

    handleToggleActive = (id) => {
        const updated = this.state.tools.map((t) => t.id === id ? { ...t, active: !t.active } : t);
        this.setState({ tools: updated });
    };

    render() {
        const { tools, modalOpen, modalMode, editingTool, deleteDialogOpen } = this.state;

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <Title level={4} style={{ margin: 0 }}>Quản lý Sản phẩm</Title>
                    <Button type="primary" icon={<PlusOutlined />} onClick={this.handleCreate}>
                        Thêm sản phẩm
                    </Button>
                </div>

                <ToolTable
                    tools={tools}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDeleteRequest}
                    onToggleActive={this.handleToggleActive}
                />

                <ToolFormModal
                    open={modalOpen}
                    mode={modalMode}
                    initialData={editingTool}
                    onSubmit={this.handleFormSubmit}
                    onClose={this.handleModalClose}
                />

                <ToolDeleteDialog
                    open={deleteDialogOpen}
                    onConfirm={this.handleDeleteConfirm}
                    onCancel={this.handleDeleteCancel}
                />
            </div>
        );
    }
}

export default ToolsPage;
