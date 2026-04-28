import React, { Component } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const { Content } = Layout;

class DashboardLayout extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = { collapsed: false };
    }

    handleCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    render() {
        const { username, onLogout, children } = this.props;
        const { collapsed } = this.state;
        const { isDark } = this.context;

        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar collapsed={collapsed} onCollapse={this.handleCollapse} />
                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 220,
                        transition: "margin-left 0.2s",
                        background: isDark ? "#12121f" : "#f0f2f5",
                    }}
                >
                    <Topbar
                        username={username}
                        onLogout={onLogout}
                        collapsed={collapsed}
                        onCollapse={this.handleCollapse}
                    />
                    <Content
                        style={{
                            margin: "80px 24px 24px",
                            minHeight: "calc(100vh - 104px)",
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default DashboardLayout;
