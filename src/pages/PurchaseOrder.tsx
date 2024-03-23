import {Button, Card, Col, Form, Input, Radio, Row, Select, Space, Table} from "antd";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import TextArea from "antd/es/input/TextArea";
import {Typography} from "antd";
import {DiscountTypeEnum} from "../enums/DiscountTypeEnum";


const PurchaseOrder =  () => {

    const {Text} = Typography

    const poColumns = [
        {
            title: 'Material Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Material Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id'
        }
    ]

    const prnColumns: any = [
        {
            title: 'Material Code',
            dataIndex: 'materialCode',
            key: 'materialCode'
        },
        {
            title: 'Material Name',
            dataIndex: 'materialName',
            key: 'materialName'
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Last Price',
            dataIndex: 'lastPrice',
            key: 'lastPrice'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            fixed: 'right',
            render: (value: any) => {
                return <Button value={value} type={'primary'}>Add</Button>
            }
        }
    ]


    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select defaultValue={'Liter'} options={[{label: 'Liter', value: 'Liter'}]} disabled={true} style={{ width: 120 }}>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Purchase Order'}]}/>
            <Card title={'Purchase Order'}>
                <Row>
                    <Col span={6}>
                        <Form layout={'vertical'}>
                            <Form.Item label={'PO Id'}>
                                <Input disabled/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <hr style={{backgroundColor: '#fff', height: '1px'}}/>
                <Row gutter={15}>
                    <Col span={12}>
                        <div style={{width: '100%', borderRight: 'solid', paddingRight: 15, borderColor: '#E3E1D9', paddingBottom: 35}}>
                            <Form layout={'vertical'}>
                                <Row gutter={15} style={{marginTop: 20, marginBottom: 20}}>
                                    <Col span={12}>
                                            <Form.Item label={'PR Id'}>
                                                <Select showSearch={true}/>
                                            </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                            <Form.Item label={'Supplier'}>
                                                <Select showSearch={true}/>
                                            </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Table bordered scroll={{x: 1000}} columns={prnColumns}/>
                            <Form layout={'vertical'}>
                                <Row gutter={15} style={{marginTop: 20, marginBottom: 20}}>
                                    <Col span={12}>
                                        <Form.Item label={'Special Comment'}>
                                            <TextArea rows={4}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Supplier'}>
                                            <TextArea rows={4}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Delivery Location'}>
                                            <Select showSearch={true}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Contact Person'}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col span={12} >
                        <Form layout={'vertical'}>
                            <Row gutter={15} style={{marginTop: 20, marginBottom: 20}}>
                                <Col span={12}>
                                    <Form.Item label={'Item Name'}>
                                        <Select showSearch={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={'Quantity'}>
                                        <Input addonAfter={suffixSelector}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type={'primary'} style={{float: 'right', marginBottom: 15, marginTop: -15}}>Add Item</Button>
                        </Form>
                        <Table style={{marginTop: 15}} bordered columns={poColumns}/>
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
                    <div style={{width: '100%'}}>
                        <Button style={{float: "right"}} type={'primary'}>Create PO</Button>
                        <Button style={{float: "right", marginRight: 10}}>Clear</Button>
                    </div>
                </Row>
            </Card>
        </>
    )
}

export default PurchaseOrder;