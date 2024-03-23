import {Button, Col, Form, Input, Modal, Row, Table} from "antd";
import {SupplierInterface} from "../../models/interfaces/Supplier.interface";
import AddNewSupplierContacts from "./AddNewSupplierContacts";
import {useEffect, useState} from "react";
import {ContactsInterface} from "../../models/interfaces/Contacts.interface";
import UpdateSupplierContacts from "./UpdateSupplierContacts";
import updateSupplierContacts from "./UpdateSupplierContacts";

interface UpdateSupplierModalProps {
    open: boolean;
    onCancel: ()=>void;
    data?: SupplierInterface | undefined;
    onSave?: ()=>{};
    loadSuppliers?: any;
}

enum UpdateSupplierFieldsEnum {
    NAME = 'name',
    ADDRESS = 'address',
    MOBILE = 'mobile',
    BR_NO = 'brNo',
    VAT_REG_NO = 'vatRegNo',
    TELEPHONE = 'tel',
    FAX = 'fax'
}

const UpdateSupplierModal = ({open=false, data, onCancel, onSave, loadSuppliers}:UpdateSupplierModalProps) => {

    const [supplier, setSupplier] = useState<any>();
    const [supplierContactsModal, setSupplierContactsModal] = useState<{isOpen: boolean, data: ContactsInterface[] | undefined}>({isOpen: false, data: []})
    const [updateSupplierContactModal, setUpdateSupplierContactModal] = useState<{isOpen: boolean, data: ContactsInterface | undefined}>({isOpen: false, data: undefined});
    let [form] = Form.useForm();

    const columns: any[] = [
        {
            fixed: 'left',
            title: 'Contact Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Telephone',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },{
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
                            <Button value={value} type={'primary'} danger>Remove</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={(event)=>{
                                handleUpdateSupplierContact(record)
                            }} value={value} type={'primary'} >Update</Button>
                        </Form.Item>
                    </Form>
                )
            }
        }
    ]

    useEffect(() => {
        setSupplier(data);
    }, [data]);

    useEffect(() => {
        setSupplierContactsModal(prevState => ({...prevState, data: data?.contacts}))
    }, []);

    const handleUpdateSupplierContact = (contact: ContactsInterface) => {
        setUpdateSupplierContactModal(prevState => ({...prevState, isOpen: true, data: contact}))
    }

    const addNewContact = async (newSupplierContact: ContactsInterface) => {
        //save the contact to the database
        loadSuppliers();
    }

    const updateContact = async (contact: ContactsInterface) => {
        //update the contact to the database
        loadSuppliers();
    }


    const handleInputChange = (value: string, field: string) => {
        setSupplier((prevState:any) => {
            return {...prevState, [field]: value}
        })
    }

    return (
        <>
            <Modal okText={'Save'} width={'80%'} title={'Update Supplier'} open={open} onCancel={onCancel}>
                <Row gutter={[30,0]}>
                    <Col offset={2} span={6}>
                        <Form layout={'vertical'}>
                            <Form.Item  label={'Supplier Id'}>
                                <Input name={'id'} value={supplier?.id} disabled={true}/>
                            </Form.Item>
                            <Form.Item  label={'Supplier Name'}>
                                <Input name={'name'} value={supplier?.name} onChange={(event)=>{handleInputChange(event.target.value, UpdateSupplierFieldsEnum.NAME)}}/>
                            </Form.Item>
                            <Form.Item  label={'Address'}>
                                <Input name={'address'} defaultValue={supplier?.address} value={supplier?.address} onChange={(event)=>{handleInputChange(event.target.value, UpdateSupplierFieldsEnum.ADDRESS)}}/>
                            </Form.Item>
                            <Form.Item  label={'Fax No.'}>
                                <Input name={'fax'} defaultValue={supplier?.fax} value={supplier?.fax} onChange={(event)=>{handleInputChange(event.target.value, UpdateSupplierFieldsEnum.FAX)}}/>
                            </Form.Item>
                            <Form.Item  label={'Telephone No.'}>
                                <Input name={'tel'} defaultValue={supplier?.tel} value={supplier?.tel} onChange={(event)=>{handleInputChange(event.target.value, UpdateSupplierFieldsEnum.TELEPHONE)}}/>
                            </Form.Item>
                            <Form.Item  label={'BR No.'}>
                                <Input name={'brNo'} defaultValue={supplier?.brNo} value={supplier?.brNo} onChange={(event)=>{handleInputChange(event.target.value, UpdateSupplierFieldsEnum.BR_NO)}}/>
                            </Form.Item>
                            <Form.Item  label={'VAT Reg. No.'}>
                                <Input name={'vatRegNo'} defaultValue={supplier?.vatRegNo} value={supplier?.vatRegNo} onChange={(event)=>{handleInputChange(event.target.value, UpdateSupplierFieldsEnum.VAT_REG_NO)}}/>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col style={{borderLeft: "solid", border: 1, borderWidth: '1px'}} span={14}>
                        <Button onClick={()=>{setSupplierContactsModal({isOpen: true, data: undefined})}}  style={{float: 'right', marginBottom: 15}} type={'primary'}>Add Contact</Button>
                        <Table scroll={{x: 1500}} bordered dataSource={data?.contacts} columns={columns}/>
                    </Col>
                </Row>
            </Modal>
            <AddNewSupplierContacts onOk={(newSupplierContact: ContactsInterface): void => {addNewContact(newSupplierContact)}} onCancel={()=>{setSupplierContactsModal({isOpen: false, data: undefined})}} open={supplierContactsModal.isOpen}/>
            <UpdateSupplierContacts onOk={(updatedContact: ContactsInterface)=>{updateContact(updatedContact)}} data={updateSupplierContactModal.data} onCancel={()=>{setUpdateSupplierContactModal({isOpen: false, data: undefined})}} open={updateSupplierContactModal.isOpen}/>
        </>
    )
}

export default UpdateSupplierModal;