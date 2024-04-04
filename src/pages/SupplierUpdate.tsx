import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Modal, Row, Table} from "antd";
import {useContext, useEffect, useState} from "react";
import {ContactsInterface} from "../models/interfaces/Contacts.interface";
import {SupplierInterface} from "../models/interfaces/Supplier.interface";
import {Link, useNavigate, useParams} from "react-router-dom";
import SupplierService from "../services/SupplierService";
import {AlertContext} from "../context/AlertContext";
import {ContactResponseDto, SupplierResponseDto} from "../models/dto/SupplierResponse.dto";

const SupplierUpdate = () => {

    const [updateForm] = Form.useForm();
    const [contactForm] = Form.useForm();
    const navigate = useNavigate();

    const supplierService = new SupplierService();

    const {error, success} = useContext(AlertContext)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [supplier, setSupplier] = useState<SupplierInterface>();
    const [contacts, setContacts] = useState<ContactsInterface[]>([]);

    const {id}:any= useParams();

    useEffect(() => {
        supplierService.getSupplier(id)
            .then((data:SupplierResponseDto)  => {

                const supplier:SupplierInterface = {
                    id: data.id,
                    name: data.name,
                    address: data.address,
                    tel: data.telephone,
                    fax: data.fax,
                    brNo: data.br_number,
                    vatRegNo: data.vat_reg_no
                }

                let contacts: ContactsInterface[] = []

                if(data.contact && data.contact.length > 0){
                    contacts = data.contact.map(cntct => {
                        return {
                            id: cntct.id,
                            name: cntct.name,
                            email: cntct?.email,
                            mobile: cntct?.mobile,
                            tel: cntct?.telephone
                        }
                    })
                }

                setContacts(contacts);
                setSupplier(supplier);

                updateForm.setFields([
                    {name: 'name', value: data.name},
                    {name: 'address', value: data.address},
                    {name: 'tel', value: data.telephone},
                    {name: 'fax', value: data.fax},
                    {name: 'brNo', value: data.br_number},
                    {name: 'vatRegNo', value: data.vat_reg_no}
                ])

            })
            .catch(e => {
                error('Data Retrival Failed', 'Unable to fetch supplier data, please try again');
            })
    }, []);

    const handleUpdate = (values: any) => {

        const payload: SupplierInterface = {
            name: values.name,
            address: values.address,
            tel: values.tel,
            fax: values.fax,
            brNo: values.brNo,
            vatRegNo: values.vatRegNo,
            contacts: contacts
        }

        if(supplier?.id){
            supplierService.updateSupplier(supplier?.id, payload)
                .then(data => {
                    success('Update Success', 'Supplier updated successfully');
                    navigate('/list-of-suppliers');
                })
                .catch(e => {
                    error('Update Failed', 'update failed unexpectedly, please try again');
                })
        }
    }

    const handleContactFormSubmit = () => {
        const {name, email, mobile, tel} = contactForm.getFieldsValue();
        setContacts((prevState: ContactsInterface[]) => {
            let currentArray = prevState;
            return currentArray.concat([{name, email, mobile, tel}]);
        })
        contactForm.resetFields();
        setIsModalOpen(false);
    }

    const handleUpdateSupplierContact = (id: string, record: SupplierInterface) => {
        supplierService.updateSupplier(id, record)
            .then(data => {
                success('Update Success', 'Supplier updated successfully');
                navigate('/list-of-suppliers');
            })
            .catch(e => {
                error('Update Failed', 'update failed unexpectedly, please try again');
        })
    }

    const handleContactRemove = (id: string) => {
        setContacts(prevState => {
            return prevState.filter(cntct => {
                return cntct.id !== id;
            })
        })
    }

    const columns:any[] = [
        {
            fixed: 'left',
            title: 'Contact Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: 'Telephone',
            dataIndex: 'tel',
            key: 'tel'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'options',
            dataIndex: 'id',
            key: 'id',
            width: '250px',
            render: (value: string, record: SupplierInterface) => {
                return (
                    <Form    layout={'inline'}>
                        <Form.Item>
                            <Button onClick={()=>{handleContactRemove(value)}} value={value} type={'primary'} danger>Remove</Button>
                        </Form.Item>
                        {/*<Form.Item>*/}
                        {/*    <Button onClick={(event)=>{*/}
                        {/*        handleUpdateSupplierContact(value, record)*/}
                        {/*    }} value={value} type={'primary'} >Update</Button>*/}
                        {/*</Form.Item>*/}
                    </Form>
                )
            }
        }
    ]

  return (
      <>
          <Breadcrumb items={[{title: <Link to={'/'}>Home</Link>}, {title: <Link to={'/list-of-suppliers'}>List of Suppliers</Link>}, {title: 'Update Supplier'}]}/>
          <Card size={'default'} title={'Supplier Registration'}>
              <Row gutter={[30,0]}>
                  <Col offset={2} span={6}>
                      <Form form={updateForm} layout={'vertical'} onFinish={handleUpdate}>
                          <Form.Item label={'Supplier Name'} initialValue={supplier?.name} name={'name'} rules={[{required: true}]}>
                              <Input name={'Supplier Name'}/>
                          </Form.Item>
                          <Form.Item rules={[{required: true}]} initialValue={supplier?.address} label={'Address'} name={'address'}>
                              <Input name={'Address'}/>
                          </Form.Item>
                          <Form.Item rules={[{required: false}]} initialValue={supplier?.tel} label={'Telephone'} name={'tel'}>
                              <Input name={'Telephone'}/>
                          </Form.Item>
                          <Form.Item rules={[{required: false}]} label={'Fax'} name={'fax'}>
                              <Input name={'Fax'}/>
                          </Form.Item>
                          <Form.Item rules={[{required: false}]} label={'BR No.'} name={'brNo'}>
                              <Input name={'BR No.'}/>
                          </Form.Item>
                          <Form.Item rules={[{required: false}]} label={'VAT Registration'} name={'vatRegNo'}>
                              <Input name={'VAT Registration'}/>
                          </Form.Item>
                          <Form.Item>
                              <Button htmlType={'submit'} style={{marginLeft: 10, float: "right"}} type={'primary'}>Update</Button>
                              <Button style={{float: "right"}}>Clear</Button>
                          </Form.Item>
                      </Form>
                  </Col>

                  <Col style={{borderLeft: "solid", border: 1, borderWidth: '1px'}} span={14}>
                      <Button onClick={()=>{setIsModalOpen(true)}} style={{float: 'right', marginBottom: 15}} type={'primary'}>Add Contact</Button>
                      <Table scroll={{x: 1000}} bordered dataSource={contacts} columns={columns}/>
                  </Col>
              </Row>
          </Card>
          <Modal onCancel={()=>{setIsModalOpen(false)}} title={'Create Contact'} onOk={handleContactFormSubmit} open={isModalOpen}>
              <Form form={contactForm} layout={'vertical'} style={{padding: 10}}>
                  <Form.Item label={'Contact Name'} name={'name'} rules={[{required: true}]}>
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

export default SupplierUpdate;