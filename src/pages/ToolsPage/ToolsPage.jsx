import React, { Component } from "react";
import { MOCK_TOOLS } from "../../data/mockTools.js";
import ToolTable from "./ToolTable.jsx";
import ToolFormModal from "./ToolFormModal.jsx";
import ToolDeleteDialog from "./ToolDeleteDialog.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";

class ToolsPage extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            tools: [],
            loading: false,
            modalOpen: false,
            modalMode: "create",
            editingTool: null,
            deleteDialogOpen: false,
            deletingToolId: null,
            error: "",
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
        const updated = tools.filter((t) => t.id !== deletingToolId);
        this.setState({ tools: updated, deleteDialogOpen: false, deletingToolId: null });
    };

    handleDeleteCancel = () => {
        this.setState({ deleteDialogOpen: false, deletingToolId: null });
    };

    handleToggleActive = (id) => {
        const { tools } = this.state;
        const updated = tools.map((t) => t.id === id ? { ...t, active: !t.active } : t);
        this.setState({ tools: updated });
    };

    render() {
        const { tools, modalOpen, modalMode, editingTool, deleteDialogOpen } = this.state;
        const { theme } = this.context;

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ margin: 0, color: theme.main.text }}>Quản lý Sản phẩm</h2>
                    <button
                        style={{ padding: "8px 18px", borderRadius: 4, border: "none", background: "#1677ff", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 500 }}
                        onClick={this.handleCreate}
                    >
                        + Thêm sản phẩm
                    </button>
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
