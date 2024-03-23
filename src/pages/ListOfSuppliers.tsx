import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Modal, Input, Radio, Row, Table} from "antd";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {SupplierInterface} from "../models/interfaces/Supplier.interface";
import {ContactsInterface} from "../models/interfaces/Contacts.interface";
import UpdateSupplierModal from "../components/modals/UpdateSupplierModal";
import AddNewSupplier from "../components/modals/AddNewSupplier";


enum ModalNameEnum {
    SupplierUpdate = 'updateSupplier',
    SupplierContactsUpdate = 'supplierContactsUpdate'
}

const ListOfSuppliers = () => {

    const [modelData, setModelData] = useState<{updateSupplier: SupplierInterface | undefined}>({
        updateSupplier: undefined,
    })
    const [modelOpen, setModelOpen] = useState<{updateSupplier: boolean, supplierContactsUpdate: boolean}>({[ModalNameEnum.SupplierUpdate]: false, [ModalNameEnum.SupplierContactsUpdate]: false})

    const [showContacts, setShowContacts] = useState<{isOpen: boolean, contacts: ContactsInterface[] | undefined}>({isOpen: false, contacts: []});
    const [addNewSupplierModal, setAddNewSupplierModal] = useState<boolean>(false)
    const [form] = Form.useForm();

    const auth = useContext(AuthContext);
    useEffect(() => {
        //load suppliers
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [modelData]);

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
                    name: 'Chathuranga Attanayake',
                    address: 'Minuwangoda, Sri Lanka',
                    mobile: '0775179587',
                    email: 'gihanchaturanga98@gmail.com'
                }
            ]
        }
    ]

    const contactsColumns = [
        {
            title: 'Contact Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Mobile No.',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        }
    ]

    const columns = [
        {
            title: 'Supplier ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Supplier Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: ['Gihan'],
            onFilter: () => true
        },
        {
            title: 'Telephone',
            dataIndex: 'tel',
            key: 'tel'
        },
        {
            title: 'Fax',
            dataIndex: 'fax',
            key: 'fax'
        },
        {
            title: 'Contacts',
            dataIndex: 'id',
            key: 'id',
            render: (value: string, record: any) => {
                return (
                    <Button onClick={()=>{
                        setShowContacts({isOpen: true, contacts: record.contacts})
                    }} type={'primary'}>Show Contacts</Button>
                )
            }
        },
        {
            title: 'options',
            dataIndex: 'id',
            key: 'id',
            width: 250,
            render: (value: string, record: SupplierInterface) => {
                return (
                    <Form layout={'inline'}>
                        <Form.Item>
                            <Button value={value} type={'primary'} danger>Remove</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={()=>{
                                form.resetFields();
                                manageModals(ModalNameEnum.SupplierUpdate, true)
                                setModelData({...modelData, updateSupplier: record})
                            }} value={value} type={'primary'} >Update</Button>
                        </Form.Item>
                    </Form>
                )
            }
        }
    ];

    useEffect(() => {
        loadSuppliers()
    }, []);

    const loadSuppliers = () => {
        // load supplier data
    }

    const manageModals = (modalName: ModalNameEnum, status: boolean): void => {
        form.resetFields()
        if(!status){
            setModelData(prevState => {

                switch (modalName){
                    case ModalNameEnum.SupplierUpdate:
                        return {...prevState, [ModalNameEnum.SupplierUpdate]: undefined}

                    default:
                        return {...prevState}
                }

            })
        }

        setModelOpen(prevState => {

            switch (modalName){
                case ModalNameEnum.SupplierUpdate:
                    return {...prevState, updateSupplier: status};

                case ModalNameEnum.SupplierContactsUpdate:
                    return {...prevState, supplierContactsUpdate: status}
            }

        })

    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'List of Suppliers'}]}/>
            <Card title={'List of Suppliers'}>
                <Button onClick={()=>{setAddNewSupplierModal(true)}} type={'primary'} style={{float: "right", marginBottom: 15, marginLeft: 10}}>Add New Supplier</Button>
                <Button style={{float: "right", marginBottom: 15, marginLeft: 10}} type={'primary'}>Print</Button>
                <Button style={{float: "right", marginBottom: 15, marginLeft: 10}} type={'primary'}>Export</Button>
                <Table bordered dataSource={mockSuppliers} columns={columns}/>
            </Card>

            <Modal open={showContacts.isOpen} onCancel={()=>{setShowContacts({isOpen: false, contacts: []})}} width={'800px'} title={'Contacts'}>
                <Table bordered columns={contactsColumns} dataSource={showContacts.contacts}/>
            </Modal>

            <UpdateSupplierModal loadSuppliers={loadSuppliers} open={modelOpen.updateSupplier} onCancel={()=>{manageModals(ModalNameEnum.SupplierUpdate, false)}} data={modelData?.updateSupplier}/>
            <AddNewSupplier onCancel={()=>{setAddNewSupplierModal(false)}} open={addNewSupplierModal}/>
        </>
    )
}

export default ListOfSuppliers;