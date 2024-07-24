import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Checkbox, Col, Form, Input, Row, Select, Table} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ProductService} from "../../services/Product.service";
import {useContext, useEffect, useState} from "react";
import {UomService} from "../../services/Uom.service";
import {CustomerService} from "../../services/Customer.service";
import RawMaterialService from "../../services/RawMaterial.service";
import {useForm} from "antd/es/form/Form";
import {AlertContext} from "../../context/AlertContext";

const ProductCreation = () => {

    const {error} = useContext(AlertContext);

    const [productForm] = Form.useForm();

    const productService = new ProductService();
    const uomService = new UomService();
    const customerService = new CustomerService();
    const rmService = new RawMaterialService();

    const [productsCategories, setProductsCategories] = useState<any[]>([]);
    const [productSubCategories, setProductSubCategories] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([])
    const [uoms, setUoms] = useState<any[]>([])
    const [rawMaterials, setRawMaterials] = useState<any[]>([]);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState<any[]>([])

    const [costingForm] = Form.useForm();

    const productsCostingTableColumns = [
        {
            key: 1,
            title: 'Item Code',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rmObj = rawMaterials.find(rm => rm.id === value);
                return rmObj.item_code;
            }
        },
        {
            key: 2,
            title: 'Item Name',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rmObj = rawMaterials.find(rm => rm.id === value);
                return rmObj.name;
            }
        },
        {
            key: 3,
            title: 'Quantity',
            dataIndex: 'qty'
        },
        {
            key: 4,
            title: 'UOM',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rmObj = rawMaterials.find(rm => rm.id === value);
                return rmObj.uom.name;
            }
        },
        {
            key: 5,
            title: 'Options',
            dataIndex: 'rm_id',
            render: (value: any) => {
                return <Button type={'primary'} danger>Remove</Button>
            }
        }
    ]

    const handleCategorySelect = (id:any) => {
        productService.getAllProductSubCategories(id)
            .then(data => {
                setProductSubCategories(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        productService.getAllProductCategories()
            .then(data => {
                setProductsCategories(data);
            })
            .catch(e => {
                console.log(e);
            })

        uomService.getAllUoms()
            .then(data => {
                setUoms(data);
            })
            .catch(e => {
                console.log(e)
            })

        rmService.getAllRawMaterials()
            .then(data => {
                setRawMaterials(data);
            })
            .catch(e => {
                console.log(e);
            })

        customerService.getAllCustomers()
            .then(data => {
                setCustomers(data);
            })
            .catch(e => {
                console.log(e)
            })
    }, []);

    const handleRmSelect = (rmId: string) => {
        const rmObj = rawMaterials.find(rm => rmId === rm.id);
        costingForm.setFieldValue('uom', rmObj.uom.name);
    }

    const handleItemAdding = (values:any) => {
        const {rm_id, qty} = values;
        setSelectedRawMaterials(prevState => {
            return prevState.concat([{rm_id, qty}]);
        })
    }

    const handleSubmit = () => {
        const {subCategory, prodCode, prodName, description, uom, customers, is_customized} = productForm.getFieldsValue();

        const payload = {
            product: {
                product_sub_category_id: subCategory,
                name: prodName,
                code: prodCode,
                description: description,
                uom_id: uom,
                is_customized: is_customized,
            },
            productItems: selectedRawMaterials
        }

        // productService.createNewProduct(payload)
        //     .then(data => {
        //
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })

        error('Empty Field', 'Please select the Customer');

    }

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
                                          <Select onChange={handleCategorySelect} options={productsCategories.map(item => {
                                              return {
                                                  label: item.name,
                                                  value: item.id
                                              }
                                          })}/>
                                      </Form.Item>
                                      <Form.Item name={'subCategory'} label={'Sub Category'}>
                                          <Select options={productSubCategories?.map(item => {
                                              return {
                                                  label: item.name,
                                                  value: item.id
                                              }
                                          })}/>
                                      </Form.Item>
                                      <Form.Item name={'prodCode'} label={'Product Code'}>
                                          <Input/>
                                      </Form.Item>
                                      <Form.Item name={'prodName'} label={'Product Name'}>
                                          <Input/>
                                      </Form.Item>
                                      <Form.Item name={'description'} label={'Description'}>
                                          <TextArea rows={4}/>
                                      </Form.Item>
                                      <Form.Item name={'uom'} label={'Unit of measure'}>
                                          <Select options={uoms.map(item => ({label: item.name, value: item.id}))}/>
                                      </Form.Item>
                                      <Form.Item name={'is_customized'}>
                                          <Checkbox>Customized Product</Checkbox>
                                      </Form.Item>
                                      <Form.Item name={'customers'} label={'Select Customers'}>
                                          <Select mode={'multiple'} options={customers.map((c:any) => ({value: c.id, label: c.name}))}/>
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
                                  <Form form={costingForm} layout={'vertical'} onFinish={handleItemAdding}>
                                      <Form.Item name={'rm_id'} label={'Raw Material'}>
                                          <Select onChange={handleRmSelect} options={rawMaterials.map(rm => ({value: rm.id, label: rm.name}))}/>
                                      </Form.Item>
                                      <Form.Item name={'uom'} label={'Unit of measure'}>
                                          <Input disabled={true}/>
                                      </Form.Item>
                                      <Form.Item name={'qty'} label={'Quantity'}>
                                          <Input/>
                                      </Form.Item>
                                      <Form.Item>
                                          <Button type={'primary'} htmlType={'submit'}>Add</Button>
                                      </Form.Item>
                                  </Form>
                              </Col>
                          </Row>
                          <Table columns={productsCostingTableColumns} dataSource={selectedRawMaterials} bordered/>
                      </Card>
                  </Col>
              </Row>
          <div style={{marginTop: 20}}>
              <Button style={{float: "right", marginLeft: 15}} type={'primary'} onClick={handleSubmit}>Submit</Button>
              <Button style={{float: "right"}}>Clear</Button>
          </div>
          </Card>
      </>
  )
}

export default ProductCreation;
