import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Table} from "antd";
import {useContext, useEffect, useState} from "react";
import RawMaterialService from "../services/RawMaterial.service";
import {AlertContext} from "../context/AlertContext";
import {v4 as uuid} from "uuid";
const RawMaterialCategories = () => {

    const rawMaterialService = new RawMaterialService();

    const {error, success, info, warning} = useContext(AlertContext);

    const [form] = Form.useForm();

    const [categories, setCategories] = useState<any[]>([]);

    const rmCategoryTable = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value: string) => {
                return <Button onClick={()=>{handleCategoryRemove(value)}} danger type={'primary'}>Remove</Button>
            }
        }
    ]

    useEffect(() => {
        loadRMCategories();
    }, []);

    const handleCategoryRemove = (id: string) => {
        rawMaterialService.removeRMCategory(id)
            .then(e => {
                loadRMCategories();
            })
            .catch(e => {
                error('Unexpected Error', 'RM Category removal failed')
            })
    }

    const loadRMCategories = () => {
        rawMaterialService.getAllRMCategories()
            .then(data => {
                setCategories(data);
            })
            .catch(err => {
                error('Unexpected Error', 'Unable to fetch RM categories');
            })
    }

    const handleFinish = ({name, code}: {name: string, code: string}) => {
        // setCategories((prevState: any[]) => {
        //     return prevState.concat([{name, id: uuid()}]);
        // })
        rawMaterialService.addNewRMCategory(name, code)
            .then(data => {
                success('Request Success', 'New RM category has been added')
                loadRMCategories();
            })
            .catch(e =>{
                error('Request Failed', 'New RM category creation failed')
            })
        form.resetFields();
    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'Raw Material Categories'}]}/>
            <Card title={'Raw Material Categories'}>
                <Row gutter={15}>
                    <Col offset={2} span={7}>
                        <Form form={form} layout={'vertical'} onFinish={handleFinish}>
                            <Form.Item label={'Category Name'} name={'name'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType={'submit'} style={{float: 'right'}} type={'primary'}>Add Category</Button>
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

export default RawMaterialCategories;