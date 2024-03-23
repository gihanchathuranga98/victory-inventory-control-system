import {Col, Form, Input, Row, Select} from "antd";

const FreeItems = () => {
    return (
        <>
            <Form layout={'vertical'}>
                <Row gutter={15}>
                    <Col span={12}>
                        <Form.Item label={'Item Name'}>
                            <Select showSearch/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Return Qty.'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Reason'}>
                            <Select showSearch/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Return By'}>
                            <Select showSearch/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default FreeItems;