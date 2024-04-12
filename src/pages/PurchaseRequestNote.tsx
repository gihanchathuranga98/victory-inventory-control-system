import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";
import AddNewPrnItem from "../components/modals/AddNewPrnItem";
import {useContext, useState} from "react";
import {AlertContext} from "../context/AlertContext";
import rawMaterialService from "../services/RawMaterial.service";
import RawMaterialService from "../services/RawMaterial.service";

const PurchaseRequestNote = () => {

    const {error, success, warning, info} = useContext(AlertContext)

    const [prnForm] = Form.useForm();

    const rawMaterialService = new RawMaterialService();

    const [addNewItemOpen, setAddNewItemOpen] = useState<boolean>(false);
    const [prnItem, setPrnItem] = useState<any[]>([]);

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
        const {reqBy, remark, priority, authBy} = prnForm.getFieldsValue();

        if(reqBy && authBy && priority){
            // TODO: implement after the APIs are deliverd from Victory
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
                                <Form.Item label={'PRN No.'}>
                                    <Input disabled/>
                                </Form.Item>
                                <Form.Item label={'Requested By'} name={'reqBy'}>
                                    <Select options={[]}/>
                                </Form.Item>
                                <Form.Item label={'Remark'}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item label={'Priority'} name={'priority'}>
                                    <Select options={[{label: 'Urgent', value: 'urgent'}]} />
                                </Form.Item>
                                <Form.Item label={'Authorized By'} name={'authBy'}>
                                    <Select options={[]}/>
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