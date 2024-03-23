import {Avatar, Button, Dropdown, Layout, Menu, MenuProps} from "antd";
import React from "react";
import {AppstoreOutlined} from "@ant-design/icons";

const Nav = ({children}:any) => {

    const {Sider, Header, Content, Footer} = Layout;

    const navitems = [
        {
            key: 'dashboard',
            icon: <AppstoreOutlined />,
            label: `Dashboard`,
        },
        {
            key: 'inventory',
            icon: <AppstoreOutlined />,
            label: `Inventory`,
            children: [
                {
                    key: '1',
                    icon: <AppstoreOutlined />,
                    label: 'Supplier',
                },
                {
                    key: '2',
                    icon: <AppstoreOutlined />,
                    label: 'Raw Materials',
                },
                {
                    key: '3',
                    icon: <AppstoreOutlined />,
                    label: 'PRN',
                },
                {
                    key: '4',
                    icon: <AppstoreOutlined />,
                    label: 'PO',
                },
                {
                    key: '5',
                    icon: <AppstoreOutlined />,
                    label: 'GRN',
                },
                {
                    key: '6',
                    icon: <AppstoreOutlined />,
                    label: 'SRN',
                },
            ]
        }
    ]

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div>
                    Logout
                </div>
            ),
        }
    ]

    const handleNavClick = (event:any) => {
        console.log('Event', event)
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
            >
                <div style={{height: 70}}/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={navitems}  onClick={handleNavClick}/>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: "white", boxShadow: '2px', height: 50 }}>
                    <Dropdown menu={{items}}>
                        <Avatar style={{float: 'right', marginRight: 15, marginTop: 5, backgroundColor: '#124076'}} size={36}>GC</Avatar>
                    </Dropdown>
                </Header>
                <Content style={{ margin: '5px 5px 0' }}>
                    <div
                        style={{
                            padding: 0,
                            minHeight: 360
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Victory ICS ©2024 | Victory Information
                </Footer>
            </Layout>
        </Layout>
    )
}

export default Nav;