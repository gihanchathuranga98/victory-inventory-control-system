import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";
import {useState} from "react";

const RawMaterialSubCategory = () => {

    const [categories, setCategories] = useState<any[]>([
        {
            id: '1',
            name: 'Wool',
        },
        {
            id: '2',
            name: 'Glue'
        },
        {
            id: '3',
            name: 'Threads'
        }
    ])

    const rmCategoryTable = [
        {
            title: 'Category COde',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'id'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value: string) => {
                return <Button danger type={'primary'}>Remove</Button>
            }
        }
    ]

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Raw Material Sub Categories'}]}/>
            <Card title={'Raw Material Sub Categories'}>
                <Row gutter={15}>
                    <Col offset={2} span={7}>
                        <Form layout={'vertical'}>
                            <Form.Item label={'Category Name'}>
                                <Select showSearch={true}/>
                            </Form.Item>
                            <Form.Item label={'Sub Category Name'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'Sub Category Code'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{float: 'right'}} type={'primary'}>Add Category</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col offset={1} span={12}>
                        <Table bordered dataSource={categories} columns={rmCategoryTable}/>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default RawMaterialSubCategory;