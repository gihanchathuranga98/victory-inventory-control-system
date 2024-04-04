import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Modal, Radio, Row, Table} from "antd";
import {useContext, useEffect, useState} from "react";
import {SupplierInterface} from "../models/interfaces/Supplier.interface";
import SupplierService from "../services/SupplierService";
import {AlertContext} from "../context/AlertContext";
import {ContactsInterface} from "../models/interfaces/Contacts.interface";

const SupplierRegistration = () => {

    const supplierService = new SupplierService();
    const {success, error} = useContext(AlertContext)

    useEffect(() => {
        // supplierService.getNewSupplierId()
        //     .then(data => {
        //
        //     })
        //     .catch(err => {
        //         error('Fetching Id Failed','Unexpected error occurred, Please check your connection')
        //     })
    }, []);

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
    const [contacts, setContacts] = useState<ContactsInterface[]>([]);

    const [regForm] = Form.useForm();
    const [contactForm] = Form.useForm();

    useEffect(() => {
        // get current suppliers
        regForm.setFieldValue('supplier_id', '478192472192')
    }, []);

    const columns = [
        {
            title: 'Contact Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Telephone',
            dataIndex: 'tel',
            key: 'tel'
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
        },
        {
            title: 'Options',
            dataIndex: 'mobile',
            key: 'options',
            render: (value: string) => {
                return (
                    <>
                        <Button onClick={()=>{handleContactRemove(value)}} type={'primary'} danger>Remove</Button>
                    </>
                )
            }
        }
    ]

    const handleContactRemove = (mobile: string) => {
        setContacts(prevState => {
            return prevState.filter(contact => {
                return contact.mobile !== mobile
            })
        })
    }


    const handleContactFormSubmit = () => {
        const contact = contactForm.getFieldsValue();
        setContacts(prevState => {
            return prevState.concat([contact]);
        })
        contactForm.resetFields();
        setIsModalOpen(false);
    }

    const handleRegFormSubmit = async (event:any) => {
        try {
            console.log('event', event)
            const payload: SupplierInterface = {
                name: event.supplier_name,
                address: event.address,
                tel: event.telephone,
                fax: event.fax,
                brNo: event.br_number,
                vatRegNo: event.vat_registration,
                contacts: contacts
            }

            console.log('Supplier', payload)

            supplierService.createNewSupplier(payload)
                .then(data => {
                    success('Registration Success','Supplier Registered Successfully')
                    setContacts([]);
                })
                .catch(e => {
                    error('Registration Failed', 'Unexpected error occurred, please try again')
                })
        }catch (e) {
            console.log('error in handleRegFormSubmit', e)
            error('Registration Failed', 'Something went wrong, Please try again');
        }finally {
            regForm.resetFields();
        }
    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'Supplier Registration'}]}/>
            <Card size={'default'} title={'Supplier Registration'}>
                <Row gutter={[30,0]}>
                    <Col offset={2} span={6}>
                        <Form form={regForm} layout={'vertical'} onFinish={handleRegFormSubmit}>
                            <Form.Item label={'Supplier Name'} name={'supplier_name'} rules={[{required: true}]}>
                                <Input name={'Supplier Name'}/>
                            </Form.Item>
                            <Form.Item rules={[{required: true}]} label={'Address'} name={'address'}>
                                <Input name={'Address'}/>
                            </Form.Item>
                            <Form.Item rules={[{required: false}]} label={'Telephone'} name={'telephone'}>
                                <Input name={'Telephone'}/>
                            </Form.Item>
                            <Form.Item rules={[{required: false}]} label={'Fax'} name={'fax'}>
                                <Input name={'Fax'}/>
                            </Form.Item>
                            <Form.Item rules={[{required: false}]} label={'BR No.'} name={'br_number'}>
                                <Input name={'BR No.'}/>
                            </Form.Item>
                            <Form.Item rules={[{required: false}]} label={'VAT Registration'} name={'vat_registration'}>
                                <Input name={'VAT Registration'}/>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType={'submit'} style={{marginLeft: 10, float: "right"}} type={'primary'}>Save</Button>
                                <Button style={{float: "right"}}>Clear</Button>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col style={{borderLeft: "solid", border: 1, borderWidth: '1px'}} span={14}>
                        <Button onClick={()=>{setIsModalOpen(true)}} style={{float: 'right', marginBottom: 15}} type={'primary'}>Add Contact</Button>
                        <Table bordered dataSource={contacts} columns={columns}/>
                    </Col>
                </Row>
            </Card>
            <Modal onCancel={()=>{setIsModalOpen(false)}} title={'Create Contact'} onOk={handleContactFormSubmit} open={isModalOpen}>
                <Form form={contactForm} layout={'vertical'} style={{padding: 10}}>
                    <Form.Item label={'Contact Name'} name={'name'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Mobile'} name={'mobile'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Email'} name={'email'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Telephone'} name={'tel'}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default SupplierRegistration;