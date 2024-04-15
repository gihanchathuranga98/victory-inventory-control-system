import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, DatePicker, Form, Input, Row, Select, Table} from "antd";

const BatchCreation = () => {

    const [itemForm] = Form.useForm();
    const [batchForm] = Form.useForm();

    const itemTableColumns = [
        {
            key: '1',
            title: 'Material Code',
            dataIndex: ''
        },
        {
            key: '2',
            title: 'Material Name',
            dataIndex: ''
        },
        {
            key: '3',
            title: 'Quantity',
            dataIndex: ''
        },
        {
            key: '4',
            title: 'Options',
            dataIndex: ''
        },
    ]

    const batchTableColumns = [
        {
            key: 1,
            title: 'Batch Code',
            dataIndex: ''
        },
        {
            key: 1,
            title: 'Batch Name',
            dataIndex: ''
        },
        {
            key: 1,
            title: 'Start Date',
            dataIndex: ''
        },
        {
            key: 1,
            title: 'End Date',
            dataIndex: ''
        },
        {
            key: 1,
            title: 'Is Complete',
            dataIndex: ''
        }
    ]


    const handleItemFinish = (values: string[]) => {

    }

    const handleBatchFinish = (values: string[]) => {

    }

    return (
        <>
            <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Batch Creation', href: '/batch-creation'}]}/>
            <Card title={'Batch Creation'}>
                <Row>
                        <Col span={10}>
                    <div style={{borderRight: 'solid', borderColor: '#E3E1D9', borderWidth: 1, paddingRight: 15, paddingBottom: 40}}>
                            <Row>
                                <Col offset={4} span={16}>
                                    <Form form={batchForm} layout={'vertical'}>
                                        <Form.Item name={'code'} label={'Batch Code'}>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item name={'name'} label={'Batch Name'}>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item name={'startDate'} label={'Start Date'}>
                                            <DatePicker style={{width: '100%'}}/>
                                        </Form.Item>
                                        <Form.Item name={'endDate'} label={'End Date'}>
                                            <DatePicker style={{width: '100%'}}/>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            <div style={{borderTop: 'solid', borderColor: '#E3E1D9', borderWidth: 1, paddingTop: 15}}>
                                <Row>
                                    <Col offset={4} span={16}>
                                        <Form layout={'vertical'} form={itemForm} onFinish={handleItemFinish}>
                                            <Form.Item name={'rmItem'} label={'Raw Material'}>
                                                <Select showSearch/>
                                            </Form.Item>
                                            <Form.Item name={'qty'} label={'Quantity'}>
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button style={{float: 'right'}} type={'primary'}>Add</Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                            <Table columns={itemTableColumns} bordered/>
                            <Form form={batchForm} onFinish={handleBatchFinish}>
                                <Form.Item style={{marginTop: 15}}>
                                    <Button style={{float: "right", marginLeft: 15}} type={'primary'} htmlType={'submit'}>Submit</Button>
                                    <Button style={{float: "right"}}>Clear</Button>
                                </Form.Item>
                            </Form>
                            </div>
                        </Col>
                    <Col span={14}>
                        <Table columns={batchTableColumns} style={{marginLeft: 15}} bordered/>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default BatchCreation;