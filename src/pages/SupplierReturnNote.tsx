import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Card, Col, Form, Input, Row, Select, Table, Tabs, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import GrnItem from "../components/SrnItemTypes/GrnItem";
import FreeItems from "../components/SrnItemTypes/FreeItems";

const SupplierReturnNote = () => {

    const {Title} = Typography;

    const tabItem = [
        {
            label: 'GRN Item',
            key: 'grnItem',
            children: <GrnItem/>
        },
        {
            label: 'Free Item',
            key: 'freeItem',
            children: <FreeItems/>
        },
        {
            label: 'Service Item',
            key: 'serviceItem',
            children: 'free item'
        }
    ]

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Supplier Return Note'}]}/>
            <Card title={'Supplier Return Note'}>
                <div style={{borderBottom: 'solid', borderWidth: 1, borderColor: '#E3E1D9'}}>
                    <Form>
                        <Form.Item style={{width: 400}} label={'SRN Id'}>
                            <Input disabled/>
                        </Form.Item>
                    </Form>
                </div>
                    <Row gutter={15} style={{marginTop: 25}}>
                        <Col span={12}>
                        <div style={{borderRight: 'solid', borderWidth: 1, borderColor: '#E3E1D9', width: '100%', paddingRight: 15, marginRight: 15, paddingBottom: 30}}>
                            <Row>
                                <Col span={12}>
                                    <Form layout={'vertical'}>
                                        <Form.Item label={'GRN Id'}>
                                            <Select showSearch/>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            <Table bordered/>
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
                            <Tabs type={'card'} items={tabItem}/>
                        </Col>
                    </Row>
            </Card>
        </>
    )
}

export default SupplierReturnNote;