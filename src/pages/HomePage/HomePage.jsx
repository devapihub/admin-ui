import React, { Component } from "react";
import { Card, Typography, Spin, Alert, Descriptions, Tag, Row, Col, Statistic } from "antd";
import { UserOutlined, SafetyOutlined, ApiOutlined } from "@ant-design/icons";
import axiosClient from "../../api/adminClient.js";

const { Title } = Typography;

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { loadingProfile: true, profile: null, error: "" };
    }

    async componentDidMount() {
        try {
            const res = await axiosClient.get("/user/profile");
            this.setState({ profile: res.data, loadingProfile: false });
        } catch {
            this.setState({ error: "Không lấy được thông tin user", loadingProfile: false });
        }
    }

    render() {
        const { loadingProfile, profile, error } = this.state;

        return (
            <div>
                <Title level={4} style={{ marginBottom: 24 }}>Trang chủ</Title>

                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={8}>
                        <Card>
                            <Statistic title="Người dùng" value={6} prefix={<UserOutlined />} valueStyle={{ color: "#1677ff" }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card>
                            <Statistic title="Sản phẩm" value={4} prefix={<ApiOutlined />} valueStyle={{ color: "#52c41a" }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card>
                            <Statistic title="Phân quyền" value={3} prefix={<SafetyOutlined />} valueStyle={{ color: "#fa8c16" }} />
                        </Card>
                    </Col>
                </Row>

                <Card title="Thông tin tài khoản" style={{ maxWidth: 500 }}>
                    {loadingProfile && (
                        <div style={{ textAlign: "center", padding: 24 }}>
                            <Spin tip="Đang tải..." />
                        </div>
                    )}

                    {!loadingProfile && error && (
                        <Alert message={error} type="error" showIcon />
                    )}

                    {!loadingProfile && profile && (
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Username">
                                <strong>{profile.username}</strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="ID">{profile.id}</Descriptions.Item>
                            <Descriptions.Item label="Roles">
                                {profile.roles && profile.roles.length > 0
                                    ? profile.roles.map((r) => <Tag key={r} color="blue">{r}</Tag>)
                                    : <Tag>N/A</Tag>}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                </Card>
            </div>
        );
    }
}

export default HomePage;
