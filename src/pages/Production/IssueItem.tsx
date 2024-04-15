import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";

const IssueItem = () => {

    const issueItemTableColumns =[
        {
            key: 1,
            title: 'Item Code',
            dataIndex: ''
        },
        {
            key: 2,
            title: 'Item Name',
            dataIndex: ''
        },
        {
            key: 3,
            title: 'Quantity',
            dataIndex: ''
        },
        {
            key: 4,
            title: 'Unit',
            dataIndex: ''
        },
        {
            key: 1,
            title: 'Option',
            dataIndex: ''
        },
    ]

  return (
      <>
        <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Issue Items'}]}/>
        <Card title={'Issue Items'}>
          <Row>
            <Col span={12}>
                <Row>
                    <Col offset={6} span={12}>
                        <Form layout={'vertical'}>
                            <Form.Item label={'Issue No.'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'Batch No.'}>
                                <Select/>
                            </Form.Item>
                            <Form.Item label={'Issue Note No.'}>
                                <Input/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
          <Col span={12}>
              <div style={{borderLeft: 'solid', borderColor: '#E3E1D9', borderWidth: 1, paddingLeft: 15, paddingBottom: 20}}>
              <Row>
                  <Col offset={6} span={12}>
                    <Form layout={'vertical'}>
                        <Form.Item label={'Raw Material'}>
                            <Select/>
                        </Form.Item>
                        <Form.Item label={'Available Qty.'}>
                            <Input disabled={true}/>
                        </Form.Item>
                        <Form.Item label={'Unit of measure'}>
                            <Input disabled={true}/>
                        </Form.Item>
                        <Form.Item label={'Issue Qty.'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label={'Issue to'}>
                            <Select/>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{float: 'right'}} type={'primary'}>Add</Button>
                        </Form.Item>
                    </Form>
                  </Col>
              </Row>
              <Row>
                  <Col span={24}>
                      <Table bordered columns={issueItemTableColumns}/>
                  </Col>
              </Row>

              </div>
          </Col>
              <div style={{width: '100%', marginTop: 20}}>
                  <Button style={{float: "right", marginLeft: 15}} type={'primary'}>Submit</Button>
                  <Button style={{float: "right"}}>Clear</Button>
              </div>
          </Row>
        </Card>
      </>
  )
}

export default IssueItem;