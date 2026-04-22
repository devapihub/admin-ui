import React, { Component } from "react";
import axiosClient from "../../api/adminClient.js";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingProfile: true,
            profile: null,
            error: "",
        };
    }

    async componentDidMount() {
        try {
            const res = await axiosClient.get("/user/profile");
            this.setState({
                profile: res.data, // { id, username, roles: [] }
                loadingProfile: false,
            });
        } catch (error) {
            console.error(error);
            this.setState({
                error: "Không lấy được thông tin user",
                loadingProfile: false,
            });
        }
    }

    render() {
        const { loadingProfile, profile, error } = this.state;

        const cardStyle = {
            padding: "24px 28px",
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            maxWidth: 400,
        };

        return (
            <div>
                <h2 style={{ marginTop: 0, marginBottom: 24 }}>Trang chủ</h2>
                <div style={cardStyle}>
                    {loadingProfile && <p>Đang tải thông tin user...</p>}

                    {!loadingProfile && error && <p style={{ color: "red" }}>{error}</p>}

                    {!loadingProfile && profile && (
                        <>
                            <h3 style={{ marginTop: 0 }}>Thông tin tài khoản</h3>
                            <p><strong>Username:</strong> {profile.username}</p>
                            <p><strong>ID:</strong> {profile.id}</p>
                            <p>
                                <strong>Roles:</strong>{" "}
                                {profile.roles && profile.roles.length > 0
                                    ? profile.roles.join(", ")
                                    : "N/A"}
                            </p>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default HomePage;
