import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Modal, Radio, Row, Table} from "antd";
import Input from "../components/Input/Input";
import {useEffect, useState} from "react";
import {SupplierInterface} from "../models/interfaces/Supplier.interface";

const SupplierRegistration = () => {

    const mockSuppliers: SupplierInterface[] = [
        {
            id: '23132-432sdf-3324fgd-342dfg-32fsd',
            name: 'Gihan Chathuranga',
            address: 'Gampaha, Sri Lanka',
            tel: '0775179587',
            fax: '0112297845',
            brNo: 'l324j2',
            vatRegNo: 'RG4324',
            contacts: [
                {
                    id: '21312-23feww-342vd-fe322-se232',
                    name: 'Gihan Chathuranga',
                    address: 'Minuwangoda, Sri Lanka',
                    mobile: '0775179587',
                    email: 'gihanchaturanga98@gmail.com'
                }
            ]
        },
        {
            id: '23132-342dfg-32fsd-432sdf-3324fgd',
            name: 'Attanayake',
            address: 'Mirigama, Sri Lanka',
            tel: '0775174323',
            fax: '0112297845',
            brNo: 'l324gs',
            vatRegNo: 'RG4352',
            contacts: [
                {
                    id: '21312-23feww-342vd-fe322-s1222',
                    name: 'Gihan Chathuranga',
                    address: 'Minuwangoda, Sri Lanka',
                    mobile: '0775179587',
                    email: 'gihanchaturanga98@gmail.com'
                },
                {
                    id: '21312-23feww-342vd-fe432-se232',
                    name: 'Gihan Chathuranga',
                    address: 'Minuwangoda, Sri Lanka',
                    mobile: '0775179587',
                    email: 'gihanchaturanga98@gmail.com'
                }
            ]
        }
    ]


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [suppliers, setSuppliers] = useState<SupplierInterface[]>([])
    const [newSupplier, setNewSupplier] = useState<SupplierInterface>()

    useEffect(() => {
        // get current suppliers
    }, []);

    const columns = [
        {
            title: 'Contact Name',
            dataIndex: 'contact_name',
            key: 'contact_name'
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone'
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }
    ]

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'Supplier Registration'}]}/>
            <Card size={'default'} title={'Supplier Registration'}>
                <Row gutter={[30,0]}>
                    <Col offset={2} span={6}>
                        <Form layout={'vertical'}>
                            <Input name={'supplier_id'} disabled={true} label={'Supplier ID'}/>
                            <Input name={'supplier_name'} label={'Supplier Name'} rules={[{required: true}]}/>
                            <Input name={'address'} label={'Address'}/>
                            <Input name={'telephone'} label={'Telephone'}/>
                            <Input name={'fax'} label={'Fax'}/>
                            <Input name={'br_number'} label={'BR Number'}/>
                            <Input name={'vat_registration'} label={'VAT Registration'}/>
                            <Form.Item>
                                <Button style={{marginLeft: 10, float: "right"}} type={'primary'}>Save</Button>
                                <Button style={{float: "right"}}>Clear</Button>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col style={{borderLeft: "solid", border: 1, borderWidth: '1px'}} span={14}>
                        <Button onClick={()=>{setIsModalOpen(true)}} style={{float: 'right', marginBottom: 15}} type={'primary'}>Add Contact</Button>
                        <Table bordered columns={columns}/>
                    </Col>
                </Row>
            </Card>
            <Modal onCancel={()=>{setIsModalOpen(false)}} title={'Create Contact'} open={isModalOpen}>
                <Form layout={'vertical'} style={{padding: 10}}>
                    <Input name={'contact_name'} label={'Contact Name'}/>
                    <Input name={'telephone'} label={'Telephone'}/>
                    <Input name={'mobile'} label={'Mobile'}/>
                    <Input name={'email'} label={'Email'}/>
                    <Form.Item label={'Status'}>
                        <Radio.Group optionType={'button'} buttonStyle={'solid'} value={true} options={[{label: 'Active', value: true}, {label: 'Inactive', value: false}]}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default SupplierRegistration;