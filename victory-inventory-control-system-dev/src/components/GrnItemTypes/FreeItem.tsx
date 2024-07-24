import {Button, Col, Form, Input, Row, Select} from "antd";

const FreeItem = () => {
  return (
      <>
          <Form layout={'vertical'}>
              <Row gutter={15}>
                  <Col span={12}>
                      <Form.Item label={'Item'}>
                          <Select showSearch/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label={'Received Qty.'}>
                          <Input/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label={'Unit Of Mesure'}>
                          <Input disabled/>
                      </Form.Item>
                  </Col>
                  <Col span={24}>
                      <Button style={{float: "right"}} type={'primary'}>Add Item</Button>
                  </Col>
              </Row>
          </Form>
      </>
  )
}

export  default FreeItem;