import {Form, Input, Modal} from "antd";
import {BaseModalPropsInterface} from "../../models/interfaces/BaseModalProps.interface";
import {ContactsInterface} from "../../models/interfaces/Contacts.interface";
import {useEffect, useState} from "react";

interface UpdateSupplierContactsPorps extends BaseModalPropsInterface {
    data?: ContactsInterface | null;
    onOk: any;
}

enum UpdateSupplierContactsFieldsEnum {
    NAME = 'name',
    MOBILE = 'mobile',
    EMAIL = 'email',
    ADDRESS = 'address'
}

const AddNewSupplierContacts = ({open=false, onCancel, onOk, data}: UpdateSupplierContactsPorps) => {

    const [supplierContacts, setSupplierContacts] = useState<ContactsInterface | null>()

    const [form] = Form.useForm();

    useEffect(() => {
        setSupplierContacts(data)
    }, [data]);

    const handleOk = (e:any) => {
        console.log('handleOk in AddNewSupplierContacts', supplierContacts)
        onOk(supplierContacts)
    }

    const handleCancel = () => {
        form.resetFields([['name']]);
        // onCancel();
    }

    const handleChange = (value: string | number, field: UpdateSupplierContactsFieldsEnum) => {

        switch (field){
            case UpdateSupplierContactsFieldsEnum.NAME:
                setSupplierContacts(prevState => {
                    return {...prevState, name: value}
                })
                break;

            case UpdateSupplierContactsFieldsEnum.MOBILE:
                setSupplierContacts(prevState => {
                    return {...prevState, mobile: value}
                })
                break;

            case UpdateSupplierContactsFieldsEnum.EMAIL:
                setSupplierContacts(prevState => {
                    return {...prevState, email: value}
                })
                break;

            case UpdateSupplierContactsFieldsEnum.ADDRESS:
                setSupplierContacts(prevState => {
                    return {...prevState, address: value}
                })
                break;
        }
    }

    return (
        <>
            <Modal title={'Update Contacts'} width={'20%'} open={open} onCancel={handleCancel} onOk={handleOk} okText={'Add'}>
                <Form form={form} layout={'vertical'}>
                    <Form.Item initialValue={''} label={'Contact Name'}>
                        <Input onChange={(e)=>{handleChange(e.target.value, UpdateSupplierContactsFieldsEnum.NAME)}} name={'name'} id={'name'}/>
                    </Form.Item>
                    <Form.Item label={'Mobile No.'}>
                        <Input onChange={(e)=>{handleChange(e.target.value, UpdateSupplierContactsFieldsEnum.MOBILE)}} name={'mobile'} id={'mobile'}/>
                    </Form.Item>
                    <Form.Item  label={'Address.'}>
                        <Input onChange={(e)=>{handleChange(e.target.value, UpdateSupplierContactsFieldsEnum.ADDRESS)}} name={'address'} id={'address'}/>
                    </Form.Item>
                    <Form.Item label={'Email'}>
                        <Input onChange={(e)=>{handleChange(e.target.value, UpdateSupplierContactsFieldsEnum.EMAIL)}} name={'email'} id={'email'}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddNewSupplierContacts;