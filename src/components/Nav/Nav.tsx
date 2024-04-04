import {Avatar, Button, Dropdown, Layout, Menu, MenuProps} from "antd";
import React from "react";
import {AppstoreOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Nav = ({children}:any) => {

    const {Sider, Header, Content, Footer} = Layout;
    const navigate = useNavigate();

    const navitems = [
        {
            key: '1',
            icon: <AppstoreOutlined />,
            label: `Dashboard`,
        },
        {
            key: 'inventory',
            icon: <AppstoreOutlined />,
            label: `Inventory`,
            children: [
                {
                    key: '2',
                    icon: <AppstoreOutlined />,
                    label: 'Create Supplier',
                },
                {
                    key: '8',
                    icon: <AppstoreOutlined/>,
                    label: 'Suppliers'
                },
                {
                    key: '3',
                    icon: <AppstoreOutlined />,
                    label: 'Raw Materials',
                },
                {
                    key: '4',
                    icon: <AppstoreOutlined />,
                    label: 'PRN',
                },
                {
                    key: '5',
                    icon: <AppstoreOutlined />,
                    label: 'PO',
                },
                {
                    key: '6',
                    icon: <AppstoreOutlined />,
                    label: 'GRN',
                },
                {
                    key: '7',
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
        switch (+event.key) {
            case 1:
                navigate('/');
                break;

            case 2:
                navigate('/supplier-registration');
                break;

            case 3:
                navigate('/raw-materials')
                break;

            case 4:
                navigate('/prn');
                break;

            case 5:
                navigate('/po');
                break;

            case 6:
                navigate('/grn');
                break;

            case 7:
                navigate('/srn');
                break;

            case 8:
                navigate('/list-of-suppliers')
                break;
        }

    }

    const getInitials = () => {
        const fName = JSON.parse(JSON.stringify(localStorage.getItem('fName')));
        const lName = JSON.parse(JSON.stringify(localStorage.getItem('lName')));

        if(fName && lName)
            return `${fName.split("")[0]}${lName.split("")[0]}`.toUpperCase();

        return 'U';
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
            >
                <div style={{height: 70}}/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={navitems}  onClick={handleNavClick}/>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: "white", boxShadow: '2px', height: 50 }}>
                    <Dropdown menu={{items}}>
                        <Avatar style={{float: 'right', marginRight: 15, marginTop: 5, backgroundColor: '#124076'}} size={36}>{getInitials()}</Avatar>
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