import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {ProductService} from "../../services/Product.service";

const ProductCategory = () => {

    const [productCategories, setProductCategories] = useState<any[]>([])
    const [productSubCategories, setProductSubCategories] = useState<any[]>()

    const [prodCatForm] = Form.useForm();
    const [prodSubCatForm] = Form.useForm();

    const productService = new ProductService();

    function handleCategorySubmit(values:any) {
        const {name, code} = values;
        productService.createNewCategory({name, code, is_active: true})
            .then(data => {
                getCategories()
                prodCatForm.resetFields();
            })
            .catch(e => {})
    }

    useEffect(() => {
        getCategories();
        getSubCategories()
    }, []);

    const getCategories = () =>{
        productService.getAllProductCategories()
            .then(data => {
                setProductCategories(data);
            })
            .catch(e =>{})
    }

    function handleCatRemvoe(id:any) {
        productService.removeCategory(id)
            .then(data => {
                getCategories()
            })
            .catch(e => {})
    }

    const prodCatColumns = [
        {
            title: 'Category Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            render: (val:any) => {
                return <Button onClick={()=>{handleCatRemvoe(val)}} type={'primary'} danger>Remove</Button>
            }
        }
    ]

    function handleSubCatRemvoe(val: any) {
        productService.removeSubCategory(val)
            .then(data => {
                getSubCategories();
            })
            .catch(e =>{})
    }

    const prodSubCatColumns = [
        {
            title: 'Sub Category Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Sub Category Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'cat'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            render: (val:any) => {
                return <Button onClick={()=>{handleSubCatRemvoe(val)}} type={'primary'} danger>Remove</Button>
            }
        }
    ]

    const getSubCategories = () => {
        productService.getAllProductSubCategories()
            .then(data => {
                setProductSubCategories(data);
                prodSubCatForm.resetFields();
            })
            .catch(e =>{})
    }

    const handleSubCategorySubmit = (values:any) => {
        const {name, code, category} = values;
        const payload = {
            name,
            code,
            category_id: Number(category),
            uom_id: 1,
            is_active: true
        }

        productService.createNewSubCategory(payload)
            .then(data => {
                getSubCategories();
            })
            .catch(e => {})

    }

    return (
        <>
            <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Product Category'}]}/>
            <Card title={'Product Category'}>
                <Row gutter={5}>
                    <Col offset={3} span={6}>
                        <Form layout={'vertical'} form={prodCatForm} onFinish={handleCategorySubmit}>
                            <Form.Item label={'Category Name'} name={'name'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'Category Code'} name={'code'}>
                                <Input/>
                            </Form.Item>
                            <div>
                                <Form.Item>
                                    <Button htmlType={'submit'} type={'primary'}>Submit</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Col>
                    <Col offset={3} span={12}>
                        <Table bordered dataSource={productCategories} columns={prodCatColumns}/>
                    </Col>
                </Row>
            </Card>
            <br/>
            <Card title={'Product Sub Category'}>
                <Row gutter={5}>
                    <Col offset={3} span={6}>
                        <Form layout={'vertical'} form={prodSubCatForm} onFinish={handleSubCategorySubmit}>
                            <Form.Item name={'category'} label={'Select Product Category'}>
                                <Select options={productCategories.map(cat => ({label: cat.name, value: cat.id}))}/>
                            </Form.Item>
                            <Form.Item label={'Sub Category Name'} name={'name'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={'Sub Category Code'} name={'code'}>
                                <Input/>
                            </Form.Item>
                            <div>
                                <Form.Item>
                                    <Button htmlType={'submit'} type={'primary'}>Submit</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Col>
                    <Col offset={3} span={12}>
                        <Table columns={prodSubCatColumns} dataSource={productSubCategories}/>
                    </Col>
                </Row>
            </Card>
        </>
    )
}
export default ProductCategory;