import {BaseModalPropsInterface} from "../../models/interfaces/BaseModalProps.interface";
import {Button, Col, Form, Input, Modal, Row, Table} from "antd";
import {useRef, useState} from "react";
import {SupplierInterface} from "../../models/interfaces/Supplier.interface";
import AddNewSupplierContacts from "./AddNewSupplierContacts";
import {ContactsInterface} from "../../models/interfaces/Contacts.interface";

interface AddNewSupplierProps extends BaseModalPropsInterface{
    onOk?: (supplierData: any) => void;
}

enum AddNewSupplierFieldsEnum {
    NAME = 'name',
    MOBILE = 'mobile',
    TELEPHONE = 'tel',
    BR_NO = 'brNo',
    VAT_REG_NO = 'vatRegNo',
    FAX = 'fax',
    ADDRESS = 'address'
}

const AddNewSupplier = ({open, onOk, onCancel}:AddNewSupplierProps) => {

    const [supplierData, setSupplierData] = useState<SupplierInterface | undefined>();
    const [supplierContactModal, setSupplierContactModal] = useState<boolean>(false);

    const contactsRef = useRef<ContactsInterface[]>();
    const [form] =Form.useForm()
    const handleInputChange = (value: string, field: AddNewSupplierFieldsEnum) => {
        setSupplierData((prevState: any) => {
            return {...prevState, [field]: value}
        })
    }

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    }

    const handleOk = ()=> {
        if (onOk) {
            onOk({...supplierData, contacts: contactsRef.current})
        }
    }

    const handleAddContactOk = (contact: ContactsInterface) => {
        contactsRef.current = (contactsRef.current && contactsRef.current?.length > 0) ? contactsRef.current?.concat([contact]) : [contact];
    }

    const contactTableColumns = [
        {
            title: 'Contact Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            render: () =>{
                return (
                    <Button danger type={'primary'}>Remove</Button>
                )
            }
        }
    ]

    return (
        <>
            <Modal title={'Add New Supplier'} onOk={handleOk} open={open} onCancel={onCancel} width={'80%'}>
                <Row gutter={[25,25]}>
                    <Col offset={2} span={6}>
                        <Form form={form} layout={'vertical'}>
                            <Form.Item initialValue={''} label={'Supplier Name'}>
                                <Input name={AddNewSupplierFieldsEnum.NAME} onChange={(event)=>{handleInputChange(event.target.value, AddNewSupplierFieldsEnum.NAME)}}/>
                            </Form.Item>
                            <Form.Item label={'Mobile No.'}>
                                <Input name={AddNewSupplierFieldsEnum.ADDRESS} onChange={(event)=>{handleInputChange(event.target.value, AddNewSupplierFieldsEnum.ADDRESS)}}/>
                            </Form.Item>
                            <Form.Item label={'Fax'}>
                                <Input name={AddNewSupplierFieldsEnum.FAX} onChange={(event)=>{handleInputChange(event.target.value, AddNewSupplierFieldsEnum.FAX)}}/>
                            </Form.Item>
                            <Form.Item label={'Supplier Name'}>
                                <Input name={AddNewSupplierFieldsEnum.TELEPHONE} onChange={(event)=>{handleInputChange(event.target.value, AddNewSupplierFieldsEnum.TELEPHONE)}}/>
                            </Form.Item>
                            <Form.Item label={'Supplier Name'}>
                                <Input name={AddNewSupplierFieldsEnum.BR_NO} onChange={(event)=>{handleInputChange(event.target.value, AddNewSupplierFieldsEnum.BR_NO)}}/>
                            </Form.Item>
                            <Form.Item label={'Supplier Name'}>
                                <Input name={AddNewSupplierFieldsEnum.VAT_REG_NO} onChange={(event)=>{handleInputChange(event.target.value, AddNewSupplierFieldsEnum.VAT_REG_NO)}}/>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={14}>
                        <Button onClick={()=>{setSupplierContactModal(true)}} type={'primary'} style={{float: 'right', marginBottom: 15}}>Add New Contact</Button>
                        <Table scroll={{x: 1000}} columns={contactTableColumns}/>
                    </Col>
                </Row>
            </Modal>
            <AddNewSupplierContacts onOk={handleAddContactOk} onCancel={()=>{setSupplierContactModal(false)}} open={supplierContactModal}/>
        </>
    )
}

export default AddNewSupplier;