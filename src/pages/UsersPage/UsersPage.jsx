import React, { Component } from "react";
import { Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserTable from "./UserTable.jsx";
import UserFormModal from "./UserFormModal.jsx";
import UserDeleteDialog from "./UserDeleteDialog.jsx";

const { Title } = Typography;

const MOCK_USERS = [
    { id: 1, username: "admin", email: "admin@devapihub.com", role: "admin", active: true, createdAt: "2024-01-10T08:00:00.000Z" },
    { id: 2, username: "moderator01", email: "mod01@devapihub.com", role: "moderator", active: true, createdAt: "2024-02-15T09:30:00.000Z" },
    { id: 3, username: "john_doe", email: "john@example.com", role: "user", active: true, createdAt: "2024-03-20T14:00:00.000Z" },
    { id: 4, username: "jane_smith", email: "jane@example.com", role: "user", active: false, createdAt: "2024-04-05T11:00:00.000Z" },
    { id: 5, username: "peter_dev", email: "peter@example.com", role: "user", active: true, createdAt: "2024-05-01T16:45:00.000Z" },
    { id: 6, username: "mod_anna", email: "anna@devapihub.com", role: "moderator", active: false, createdAt: "2024-06-12T10:15:00.000Z" },
];

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalOpen: false,
            modalMode: "create",
            editingUser: null,
            deleteDialogOpen: false,
            deletingUserId: null,
        };
    }

    componentDidMount() {
        this.setState({ users: [...MOCK_USERS] });
    }

    handleCreate = () => {
        this.setState({ modalOpen: true, modalMode: "create", editingUser: null });
    };

    handleEdit = (user) => {
        this.setState({ modalOpen: true, modalMode: "edit", editingUser: user });
    };

    handleModalClose = () => {
        this.setState({ modalOpen: false, editingUser: null });
    };

    handleFormSubmit = (formData) => {
        const { modalMode, editingUser, users } = this.state;
        if (modalMode === "create") {
            const newUser = { ...formData, id: Date.now(), createdAt: new Date().toISOString() };
            this.setState({ users: [...users, newUser], modalOpen: false });
        } else {
            const updated = users.map((u) => u.id === editingUser.id ? { ...u, ...formData } : u);
            this.setState({ users: updated, modalOpen: false, editingUser: null });
        }
    };

    handleDeleteRequest = (id) => {
        this.setState({ deleteDialogOpen: true, deletingUserId: id });
    };

    handleDeleteConfirm = () => {
        const { users, deletingUserId } = this.state;
        this.setState({ users: users.filter((u) => u.id !== deletingUserId), deleteDialogOpen: false, deletingUserId: null });
    };

    handleDeleteCancel = () => {
        this.setState({ deleteDialogOpen: false, deletingUserId: null });
    };

    handleToggleActive = (id) => {
        const updated = this.state.users.map((u) => u.id === id ? { ...u, active: !u.active } : u);
        this.setState({ users: updated });
    };

    render() {
        const { users, modalOpen, modalMode, editingUser, deleteDialogOpen } = this.state;

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <Title level={4} style={{ margin: 0 }}>Quản lý Người dùng</Title>
                    <Button type="primary" icon={<PlusOutlined />} onClick={this.handleCreate}>
                        Thêm người dùng
                    </Button>
                </div>

                <UserTable
                    users={users}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDeleteRequest}
                    onToggleActive={this.handleToggleActive}
                />

                <UserFormModal
                    open={modalOpen}
                    mode={modalMode}
                    initialData={editingUser}
                    onSubmit={this.handleFormSubmit}
                    onClose={this.handleModalClose}
                />

                <UserDeleteDialog
                    open={deleteDialogOpen}
                    onConfirm={this.handleDeleteConfirm}
                    onCancel={this.handleDeleteCancel}
                />
            </div>
        );
    }
}

export default UsersPage;
