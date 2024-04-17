import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Card, Col, Form, Input, Row, Select} from "antd";

const FinishProducts = () => {

    return (
        <>
            <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Finish Products'}]}/>
            <Card title={'Finish Products'}>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <Form>
                                    <Form.Item label={'Some Label'}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={'Batch No.'}>
                                        <Select/>
                                    </Form.Item>
                                    <Form.Item label={'Product Code'}>
                                        <Select/>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}></Col>
                </Row>
            </Card>
        </>
    )
}

export default FinishProducts;