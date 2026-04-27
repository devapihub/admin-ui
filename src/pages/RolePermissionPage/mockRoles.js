export const ALL_PERMISSIONS = [
    { key: "VIEW_USERS", label: "Xem người dùng" },
    { key: "EDIT_USERS", label: "Sửa người dùng" },
    { key: "DELETE_USERS", label: "Xoá người dùng" },
    { key: "VIEW_TOOLS", label: "Xem sản phẩm" },
    { key: "EDIT_TOOLS", label: "Sửa sản phẩm" },
    { key: "DELETE_TOOLS", label: "Xoá sản phẩm" },
    { key: "VIEW_ROLES", label: "Xem phân quyền" },
    { key: "EDIT_ROLES", label: "Sửa phân quyền" },
    { key: "DELETE_ROLES", label: "Xoá phân quyền" },
    { key: "MANAGE_SETTINGS", label: "Quản lý cài đặt" },
];

export const MOCK_ROLES = [
    {
        id: 1,
        name: "Admin",
        description: "Toàn quyền quản trị hệ thống",
        permissions: ALL_PERMISSIONS.map((p) => p.key),
        createdAt: "2024-01-01T00:00:00.000Z",
    },
    {
        id: 2,
        name: "Editor",
        description: "Có thể xem và chỉnh sửa nội dung",
        permissions: ["VIEW_USERS", "VIEW_TOOLS", "EDIT_TOOLS"],
        createdAt: "2024-03-15T00:00:00.000Z",
    },
    {
        id: 3,
        name: "Viewer",
        description: "Chỉ xem, không chỉnh sửa",
        permissions: ["VIEW_USERS", "VIEW_TOOLS", "VIEW_ROLES"],
        createdAt: "2024-06-20T00:00:00.000Z",
    },
];
