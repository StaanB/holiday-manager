import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import "./index.css";
import AllRequisitions from "./components/AllRequisitions";
import CreateRequisition from "./components/CreateRequisition";
import ExportFiles from "./components/ExportFiles";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  // Page resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Full layout
    <Layout className="content-app-div">
      <Sider
        className="custom-sider"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={180}
      >
        <div className="demo-logo-vertical" />
        {/* Menu rendering pages */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          onClick={(e) => handleMenuClick(e.key.toString())}
          items={[
            {
              key: "1",
              icon: <UnorderedListOutlined />,
              label: "All Requests",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Create Request",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Export Request",
            },
          ]}
        />
      </Sider>
      <Layout className="custom-background">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {selectedKey === "1" && <h2>Holiday manager</h2>}
          {selectedKey === "2" && <h2>Create your request</h2>}
          {selectedKey === "3" && <h2>Print/Export requests</h2>}
          <div></div>
        </Header>
        <Content
          className="content-app-div"
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedKey === "1" && <AllRequisitions />}
          {selectedKey === "2" && <CreateRequisition />}
          {selectedKey === "3" && <ExportFiles />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
