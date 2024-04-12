import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Radio, Row, Select, Table, Tabs, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import PoItem from "../components/GrnItemTypes/PoItem";
import {DiscountTypeEnum} from "../enums/DiscountTypeEnum";
import FreeItem from "../components/GrnItemTypes/FreeItem";
import ServiceItem from "../components/GrnItemTypes/ServiceItem";
import {useState} from "react";

const GoodReceiveNote = () => {

    const {Text, Title} = Typography;
    const [po, setPo] = useState([]);

    const poColumns = [
        {
            title: 'Item Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'PO Quantity',
            dataIndex: 'poQty',
            key: 'poQty'
        },
        {
            title: 'Received Quantity',
            dataIndex: 'ReceivedQty',
            key: 'ReceivedQty'
        },
        {
            title: 'Balance Quantity',
            dataIndex: 'balanceQty',
            key: 'balanceQty'
        },
        {
            title: 'PR No.',
            dataIndex: 'PrNo',
            key: 'PrNo'
        }
    ]

    const tabItems = [
        {
            key: '1',
            label: 'PO Items',
            children: <PoItem/>,
        },
        {
            key: '2',
            label: 'Free Items',
            children: <FreeItem/>,
        },
        {
            key: '3',
            label: 'Service Items',
            children: <ServiceItem/>,
        }
    ]

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Good Receive Note'}]}/>
            <Card title={'Good Receive Note'}>
                <div style={{borderBottom: 'solid', borderColor: '#E3E1D9', borderWidth: 1, marginBottom: 25}}>
                    <Form>
                        <Form.Item style={{width: 300}} label={'GRN Id'}>
                            <Input disabled/>
                        </Form.Item>
                    </Form>
                </div>
                <Row gutter={15}>
                    <Col span={12}>
                        <div style={{borderRight: 'solid', borderWidth: 1, borderColor: '#E3E1D9', width: '100%', paddingRight: 15, marginRight: 15, paddingBottom: 30}}>
                            <Form layout={'vertical'}>
                                <Row gutter={15}>
                                    <Col span={12}>
                                        <Form.Item label={'PO Id'}>
                                            <Select showSearch/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Supplier Name'}>
                                            <Input disabled/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Table columns={poColumns} bordered/>
                            <Form layout={'vertical'}>
                                <Row gutter={15} style={{marginTop: 20}}>
                                    <Col span={12}>
                                        <Form.Item label={'Comment'}>
                                            <TextArea rows={4}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Comment'}>
                                            <TextArea rows={4}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Title level={5}>Previous GRNs for this PO</Title>
                            <Row gutter={15}>
                                <Col span={8}>
                                    <Card style={{textAlign: "center", backgroundColor: '#E3E1D9', padding: -20}}>
                                        <Title level={5} style={{margin: 0}}>PO-42309482</Title>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card style={{textAlign: "center", backgroundColor: '#E3E1D9', padding: -20}}>
                                        <Title level={5} style={{margin: 0}}>PO-42309482</Title>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card style={{textAlign: "center", backgroundColor: '#E3E1D9', padding: -20}}>
                                        <Title level={5} style={{margin: 0}}>PO-42309482</Title>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={12}>
                        <Tabs type={'card'} defaultActiveKey={'1'} items={tabItems}/>
                        <Table style={{marginTop: 30}} bordered/>
                        <Form layout={'vertical'}>
                            <Row style={{marginTop: 20}} gutter={15}>
                                <Col offset={12} span={12}>
                                    <Form.Item label={'Total'}>
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Text style={{marginBottom: 10, marginRight: 10}}>Discount Type :</Text><br/>
                                    <Radio.Group>
                                        <Radio value={DiscountTypeEnum.PERCENTAGE}>Percentage</Radio>
                                        <Radio value={DiscountTypeEnum.VALUE}>Amount</Radio>
                                    </Radio.Group>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={'Tax'}>
                                        <Select mode={'multiple'} allowClear/>
                                    </Form.Item>
                                </Col>
                                <Col offset={12} span={12}>
                                    <Form.Item label={'Net Total'}>
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <div style={{width: '100%'}}>
                    <Button style={{float: "right"}} type={'primary'}>Create GRN</Button>
                    <Button style={{float: "right", marginRight: 10}}>Clear</Button>
                </div>
            </Card>
        </>
    )
}

export  default GoodReceiveNote;