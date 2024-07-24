import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";
import AddNewPrnItem from "../components/modals/AddNewPrnItem";
import {ReactNode, useContext, useEffect, useState} from "react";
import {AlertContext} from "../context/AlertContext";
import RawMaterialService from "../services/RawMaterial.service";
import OutsideUserService from "../services/OutsideUser.service";
import {OutsideUserLevelEnum} from "../enums/OutsideUserLevel.enum";
import SystemUserService from "../services/SystemUser.service";
import {PrnService} from "../services/Prn.service";

const PurchaseRequestNote = () => {

    const {error, success, warning, info} = useContext(AlertContext)

    const [prnForm] = Form.useForm();

    const rawMaterialService = new RawMaterialService();
    const outsideUserService = new OutsideUserService();
    const systemUserService = new SystemUserService();
    const prnService = new PrnService();

    const [addNewItemOpen, setAddNewItemOpen] = useState<boolean>(false);
    const [prnItem, setPrnItem] = useState<any[]>([]);
    const [outsideUsers, setOutsideUsers] = useState<string[]>([]);
    const [systemUsers, setSystemUsers] = useState<string[]>([])
    const [prnId, setPrnId] = useState<number | string>();

    useEffect(() => {
        console.log('PRN Item', prnItem);
    }, [prnItem]);

    const getNextid = () :void => {
        prnService.getNextId()
            .then(data => {
                setPrnId(data);
                prnForm.setFieldValue('prNo', `PRN-${data}`)
            })
            .catch(e =>{

            })
    }

    useEffect(() => {
        outsideUserService.getOutsideUsers(OutsideUserLevelEnum.EMPLOYEE)
            .then(data => {
                setOutsideUsers(data.map((user:any) => `${user?.initials === null ? '' : user?.initials} ${user?.firstname === null ? '' : user?.firstname} ${user?.secondname === null ? '' : user?.secondname}`))
            })
            .catch(e => {
                error('Unexpected Error', 'Fetching users failed');
            })

        getNextid();

        systemUserService.getAllSystemUsers()
            .then(data => {
                setSystemUsers(data);
            })
            .catch(e => {
                error('Unexpected Error', 'Fetching system users failed');
            })
        setSystemUsers(['Jayantha', 'Mayantha', 'Amayantha']);
        // setOutsideUsers(['Gihan', 'Chathuranga', 'Attanayake']);
    }, []);

    const prnColumns = [
        {
            title: 'Item Code',
            dataIndex: 'code',
            key: 'name'
        },
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            width: 300,
            render: (value:string, record:any)=>{
                return (
                    <>
                        <Button onClick={()=>{handleItemRemove(value)}} danger type={'primary'}>Remove</Button>
                    </>
                )
            }
        }
    ]

    const handleItemRemove = (id: string) => {
        setPrnItem(prevState => {
            return prevState.filter(itm => {
                return itm.id !== id
            })
        })
    }

    const itemExists = (id: string): boolean => {
        return prnItem.find(item => {
            return item.id === id;
        })
    }

    const handleAddNewItemSubmit = (values: {item: string, qty: number}) => {

        if(values.qty && values.qty > 0){
            rawMaterialService.getOneRawMaterial(values.item)
                .then(data => {
                    if(!itemExists(data.id)){
                        setPrnItem(prevState => {
                            const crntArray = prevState;
                            return crntArray.concat([{id:data.id, code: data.itemCode, name: data.name, qty: values.qty}])
                        })
                    }else{
                        info('Duplicate Entry', 'The selected item already exists');
                    }
                })
                .catch(e => {

                })
                .finally(()=>{
                    setAddNewItemOpen(false);
                })
        }else{
            warning('Empty Value', 'Please enter the item quantity')
        }

    }

    const handleCreatePrn = () => {
        const {reqBy, remark, priority, authBy, prNo} = prnForm.getFieldsValue();

        console.log('authBy', authBy);

        const items = prnItem.map(item => {
            return {
                rm_id: item.id,
                qty: +item.qty,
                ordered_qty: 0,
                estimated_price_per_unit: 0
            }
        })

        if(priority && prNo){
            if(items.length > 0){
                prnService.createPrn({requested_by: reqBy, approved_by: authBy, priority_id: priority, remark, items, prn_no: prnId})
                    .then(data => {
                        success('Success', 'PRN has created Successfully');
                        prnForm.resetFields();
                        setPrnItem([]);
                        getNextid();
                    })
                    .catch(e => {
                        warning('Unexpected Error Occurred', 'Please try again');
                    })
            }else{
                warning('Empty Field', 'Please fill all of the required fields');
            }
        }else{
            warning('Empty Field', 'Please fill all of the required fields');
        }
    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'Purchase Requisition Note'}]}/>
            <Card title={'Purchase Request Note'}>
                <Row>
                    <Col offset={2} span={6}>
                        <div style={{width: '100%', borderRight: 'solid', paddingRight: 15, borderColor: '#E3E1D9', paddingBottom: 5}}>
                            <Form form={prnForm} layout={'vertical'}>
                                <Form.Item label={'PRN No.'} name={'prNo'}>
                                    <Input disabled={true}/>
                                </Form.Item>
                                <Form.Item label={'Requested By'} name={'reqBy'}>
                                    <Select>
                                        {
                                            outsideUsers.map((user: string) => {
                                                return (
                                                    <Select.Option value={user} key={user}>
                                                        {user}
                                                    </Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label={'Remark'} name={'remark'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label={'Priority'} name={'priority'}>
                                    <Select options={[{label: 'Urgent', value: 1}]} />
                                </Form.Item>
                                <Form.Item label={'Authorized By'} name={'authBy'}>
                                    <Select>
                                        {
                                            systemUsers.map((user: any) => {
                                                return (
                                                    <Select.Option value={user.user_id} key={user.user_id}>
                                                        {`${user.fname} ${user.lname}`}
                                                    </Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col span={14}>
                        <Button onClick={()=>{setAddNewItemOpen(true)}} style={{float: "right", marginBottom: 15}} type={'primary'}>Add Item</Button>
                        <Table dataSource={prnItem} bordered style={{marginLeft: 15}} columns={prnColumns}/>
                    </Col>
                    <div style={{width: '100%', marginTop: 15}}>
                        <Form.Item>
                            <Button onClick={handleCreatePrn} style={{float: 'right', marginLeft: 15}} type={'primary'}>Save PRN</Button>
                            <Button onClick={()=>{
                                prnForm.resetFields();
                                setPrnItem([])
                            }} style={{float: 'right'}}>Clear</Button>
                        </Form.Item>
                    </div>
                </Row>
            </Card>
            <AddNewPrnItem open={addNewItemOpen} onOk={handleAddNewItemSubmit} onCancel={()=>{setAddNewItemOpen(false)}}/>
        </>
    )
}

export default PurchaseRequestNote;