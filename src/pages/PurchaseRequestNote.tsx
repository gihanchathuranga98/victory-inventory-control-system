import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";
import AddNewPrnItem from "../components/modals/AddNewPrnItem";
import {useState} from "react";

const PurchaseRequestNote = () => {
    const [addNewItemOpen, setAddNewItemOpen] = useState(false);

    const prnColumns = [
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id'
        }
    ]

    const handleAddNewItemSubmit = (data: any) => {

    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'Purchase Requisition Note'}]}/>
            <Card title={'Purchase Request Note'}>
                <Row>
                    <Col offset={2} span={6}>
                        <div style={{width: '100%', borderRight: 'solid', paddingRight: 15, borderColor: '#E3E1D9', paddingBottom: 5}}>
                            <Form layout={'vertical'}>
                                <Form.Item label={'PRN No.'}>
                                    <Input disabled/>
                                </Form.Item>
                                <Form.Item label={'Requested By'}>
                                    <Select options={[{label: 'Gihan', value: 'gihan'}]}/>
                                </Form.Item>
                                <Form.Item label={'Remark'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label={'Priority'}>
                                    <Select options={[{label: 'Urgent', value: 'urgent'}]} />
                                </Form.Item>
                                <Form.Item label={'Authorized By'}>
                                    <Select options={[{label: 'Chathuranga', value: 'chathu'}]}/>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col span={14}>
                        <Button onClick={()=>{setAddNewItemOpen(true)}} style={{float: "right", marginBottom: 15}} type={'primary'}>Add Item</Button>
                        <Table bordered style={{marginLeft: 15}} columns={prnColumns}/>
                    </Col>
                    <div style={{width: '100%', marginTop: 15}}>
                        <Form.Item>
                            <Button style={{float: 'right', marginLeft: 15}} type={'primary'}>Save PRN</Button>
                            <Button style={{float: 'right'}}>Clear</Button>
                        </Form.Item>
                    </div>
                </Row>
            </Card>
            <AddNewPrnItem open={addNewItemOpen} onOk={handleAddNewItemSubmit} onCancel={()=>{setAddNewItemOpen(false)}}/>
        </>
    )
}

export default PurchaseRequestNote;