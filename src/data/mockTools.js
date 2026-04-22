// Mock data — shape mirrors expected API response from GET /api/admin/products
export const MOCK_TOOLS = [
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        category: "Điện tử",
        price: 35990000,
        stock: 50,
        description: "Smartphone Apple chip A17 Pro, camera 48MP, màn hình 6.7 inch Super Retina XDR",
        active: true,
        createdAt: "2025-01-10T08:00:00Z",
    },
    {
        id: 2,
        name: "Áo thun nam basic cotton",
        category: "Thời trang",
        price: 199000,
        stock: 320,
        description: "Chất liệu 100% cotton cao cấp, nhiều màu sắc, form regular fit",
        active: true,
        createdAt: "2025-02-05T10:00:00Z",
    },
    {
        id: 3,
        name: "Cà phê Arabica rang xay",
        category: "Thực phẩm",
        price: 85000,
        stock: 0,
        description: "Cà phê Arabica Đà Lạt rang xay nguyên chất, gói 250g",
        active: false,
        createdAt: "2025-02-20T14:30:00Z",
    },
    {
        id: 4,
        name: "Nồi cơm điện Sunhouse 1.8L",
        category: "Đồ gia dụng",
        price: 890000,
        stock: 75,
        description: "Nồi cơm điện tử lòng nồi chống dính, bảo hành 12 tháng",
        active: true,
        createdAt: "2025-03-01T09:00:00Z",
    },
];

export const CATEGORIES = ["Điện tử", "Thời trang", "Thực phẩm", "Đồ gia dụng", "Sách", "Khác"];
