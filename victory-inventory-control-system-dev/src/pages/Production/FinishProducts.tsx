import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";

const FinishProducts = () => {

    const tableColumns = [
        {
            title: 'Batch No.',
            dataIndex: 'batch',
            key: '1'
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: '2'
        },
        {
            title: 'Finished Qty',
            dataIndex: 'qty',
            key: '3'
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: '4'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: '5'
        }
    ]

    return (
        <>
            <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Finish Products'}]}/>
            <Card title={'Finish Products'}>
                <Row>
                    <Col span={8}>
                        <Row>
                            <Col offset={6} span={12}>
                                <Form layout={'vertical'}>
                                    <Form.Item label={'Transfer Note No.'}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={'Batch No.'} rules={[{required: true}]}>
                                        <Select/>
                                    </Form.Item>
                                    <Form.Item label={'Product Code'}>
                                        <Select/>
                                    </Form.Item>
                                    <Form.Item label={'Finished Qty.'}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType={'submit'} style={{float: "right"}} type={'primary'}>Add Product</Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={14}>
                        <Table bordered columns={tableColumns}/>
                        <Form layout={'vertical'}>
                            <Row gutter={15} style={{marginTop: 25}}>
                                <Col span={8}>
                                    <Form.Item label={'Finished by'}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={'Store'}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div>
                                <Form.Item>
                                    <Button style={{paddingRight: 20, paddingLeft: 20, float: "right"}} htmlType={'submit'} type={'primary'}>Submit</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default FinishProducts;