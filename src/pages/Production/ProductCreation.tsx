import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Checkbox, Col, Form, Input, Row, Select, Table} from "antd";
import TextArea from "antd/es/input/TextArea";

const ProductCreation = () => {

    const [productForm] = Form.useForm();

    const productsCostingTableColumns = [
        {
            key: 1,
            title: 'Item Code',
            dataIndex: 'code'
        },
        {
            key: 2,
            title: 'Item Name',
            dataIndex: 'name'
        },
        {
            key: 3,
            title: 'Quantity',
            dataIndex: 'qty'
        },
        {
            key: 4,
            title: 'UOM',
            dataIndex: 'uom'
        },
        {
            key: 5,
            title: 'Options',
            dataIndex: 'id'
        }
    ]

  return(
      <>
        <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Product Creation'}]}/>
          <Card>
              <Row gutter={5}>
                  <Col span={12}>
                      <Card title={'Product Creation'}>
                          <Row>
                              <Col offset={6} span={12}>
                                  <Form form={productForm} layout={'vertical'}>
                                      <Form.Item name={'category'} label={'Category'}>
                                          <Select/>
                                      </Form.Item>
                                      <Form.Item name={'subCategory'} label={'Sub Category'}>
                                          <Select/>
                                      </Form.Item>
                                      <Form.Item label={'Product Code'}>
                                          <Input/>
                                      </Form.Item>
                                      <Form.Item label={'Product Name'}>
                                          <Input/>
                                      </Form.Item>
                                      <Form.Item label={'Description'}>
                                          <TextArea rows={4}/>
                                      </Form.Item>
                                      <Form.Item name={'uom'} label={'Unit of measure'}>
                                          <Select/>
                                      </Form.Item>
                                      <Form.Item>
                                          <Checkbox>Customized Product</Checkbox>
                                      </Form.Item>
                                      <Form.Item name={'Customers'} label={'Select Customers'}>
                                          <Select mode={'multiple'}/>
                                      </Form.Item>
                                  </Form>
                              </Col>
                          </Row>
                      </Card>
                  </Col>
                  <Col span={12}>
                      <Card title={'Product Costing'}>
                          <Row>
                              <Col offset={6} span={12}>
                                  <Form layout={'vertical'}>
                                      <Form.Item label={'Raw Material'}>
                                          <Select/>
                                      </Form.Item>
                                      <Form.Item label={'Unit of measure'}>
                                          <Input disabled={true}/>
                                      </Form.Item>
                                      <Form.Item label={'Quantity'}>
                                          <Input/>
                                      </Form.Item>
                                  </Form>
                              </Col>
                          </Row>
                          <Table columns={productsCostingTableColumns} bordered/>
                      </Card>
                  </Col>
              </Row>
          <div style={{marginTop: 20}}>
              <Button style={{float: "right", marginLeft: 15}} type={'primary'}>Submit</Button>
              <Button style={{float: "right"}}>Clear</Button>
          </div>
          </Card>
      </>
  )
}

export default ProductCreation;
