import React, { Component } from "react";
import { MOCK_ROLES } from "./mockRoles.js";
import RoleTable from "./RoleTable.jsx";
import RoleFormModal from "./RoleFormModal.jsx";
import RoleDeleteDialog from "./RoleDeleteDialog.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";

class RolePermissionPage extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            modalOpen: false,
            modalMode: "create",
            editingRole: null,
            deleteDialogOpen: false,
            deletingRole: null,
        };
    }

    componentDidMount() {
        this.setState({ roles: [...MOCK_ROLES] });
    }

    handleCreate = () => {
        this.setState({ modalOpen: true, modalMode: "create", editingRole: null });
    };

    handleEdit = (role) => {
        this.setState({ modalOpen: true, modalMode: "edit", editingRole: role });
    };

    handleModalClose = () => {
        this.setState({ modalOpen: false, editingRole: null });
    };

    handleFormSubmit = (formData) => {
        const { modalMode, editingRole, roles } = this.state;
        if (modalMode === "create") {
            const newRole = { ...formData, id: Date.now(), createdAt: new Date().toISOString() };
            this.setState({ roles: [...roles, newRole], modalOpen: false });
        } else {
            const updated = roles.map((r) => r.id === editingRole.id ? { ...r, ...formData } : r);
            this.setState({ roles: updated, modalOpen: false, editingRole: null });
        }
    };

    handleDeleteRequest = (role) => {
        this.setState({ deleteDialogOpen: true, deletingRole: role });
    };

    handleDeleteConfirm = () => {
        const { roles, deletingRole } = this.state;
        this.setState({
            roles: roles.filter((r) => r.id !== deletingRole.id),
            deleteDialogOpen: false,
            deletingRole: null,
        });
    };

    handleDeleteCancel = () => {
        this.setState({ deleteDialogOpen: false, deletingRole: null });
    };

    render() {
        const { roles, modalOpen, modalMode, editingRole, deleteDialogOpen, deletingRole } = this.state;
        const { theme } = this.context;

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ margin: 0, color: theme.main.text }}>Phân quyền</h2>
                    <button
                        style={{ padding: "8px 18px", borderRadius: 4, border: "none", background: "#1677ff", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 500 }}
                        onClick={this.handleCreate}
                    >
                        + Thêm Role
                    </button>
                </div>

                <RoleTable
                    roles={roles}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDeleteRequest}
                />

                <RoleFormModal
                    open={modalOpen}
                    mode={modalMode}
                    initialData={editingRole}
                    onSubmit={this.handleFormSubmit}
                    onClose={this.handleModalClose}
                />

                <RoleDeleteDialog
                    open={deleteDialogOpen}
                    roleName={deletingRole ? deletingRole.name : ""}
                    onConfirm={this.handleDeleteConfirm}
                    onCancel={this.handleDeleteCancel}
                />
            </div>
        );
    }
}

export default RolePermissionPage;
