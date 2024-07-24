import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import GrnItem from "../components/SrnItemTypes/GrnItem";
import FreeItems from "../components/SrnItemTypes/FreeItems";
import GrnService from "../services/Grn.service";
import {useContext, useEffect, useState} from "react";
import RawMaterialService from "../services/RawMaterial.service";
import OutsideUserService from "../services/OutsideUser.service";
import {OutsideUserLevelEnum} from "../enums/OutsideUserLevel.enum";
import {SrnService} from "../services/Srn.service";
import {AlertContext} from "../context/AlertContext";

enum GrnItemTypeEnum {
    PO_ITEM,
    FREE_ITEM,
    SERVICE_ITEM
}
const SupplierReturnNote = () => {

    const [grns, setGrns] = useState<any[]>([])
    const [grnData, setGrnData] = useState<any>();
    const [srnItems, setSrnItems] = useState<any[]>([])
    const [srnForm] = Form.useForm();

    const {Title} = Typography;

    const {error, success} = useContext(AlertContext);

    const grnService = new GrnService();
    const rmService = new RawMaterialService();
    const outsideUserService = new OutsideUserService();
    const srnService = new SrnService();

    const [outSideUsers, setOutSideUsers] = useState<any[]>()

    useEffect(() => {
        grnService.getAllGrns()
            .then(data => {
                console.log('GRN -- ALL --- ', data)
                setGrns(data);
            })
            .catch(e => {

            })

        outsideUserService.getOutsideUsers(OutsideUserLevelEnum.EMPLOYEE)
            .then(data => {
                setOutSideUsers(data);
            })
            .catch(e => {})
    }, []);

    useEffect(() => {
        console.log('SRN Items', srnItems)
    }, [srnItems]);

    const [rawMaterials, setRawMaterials] = useState([])

    useEffect(() => {
        rmService.getRawMaterials(grnData?.grn_item?.map((item: any) => item.rm_id))
            .then(data => {
                setRawMaterials(data);
            })
            .catch(e => {

            })
    }, [grnData]);

    const handleAddReturnItem = (itemId: any) => {
        console.log('grnData.items', grnData)
        setSrnItems((prevState:any[]) => {
            const grnItem = grnData?.grn_item?.find((item: any) => {
                return item.id === itemId;
            })
            const pState = prevState;
            return prevState.concat([grnItem]);
        })
    }

    const grnItemTableColumns = [
        {
            title: 'Item Code',
            key: '1',
            dataIndex: 'rm_id',
            render: (value: any) => {
                const rmObj:any = rawMaterials.find((rm: any) => {
                    return rm.id === value;
                })

                return rmObj?.item_code;
            }
        },
        {
            title: 'Item Name',
            key: '2',
            dataIndex: 'rm_id',
            render: (value: any) => {
                const rmObj:any = rawMaterials.find((rm: any) => {
                    return rm.id === value;
                })

                return rmObj?.name;
            }
        },
        {
            title: 'PO Qty',
            key: '3',
            dataIndex: 'qty'
        },
        {
            title: 'Item Type',
            key: '4',
            dataIndex: 'recieved_type',
            render: (value: number) => {
                return value === 0 ? 'SERVICE ITEM' : value === 1 ? 'FREE ITEM' : 'PO ITEM';
            }
        },
        {
            title: 'Options',
            key: '5',
            dataIndex: 'id',
            render: (value:any, record:any) => {
                console.log('value ---> ', record)
                return <Button onClick={()=>{
                    handleAddReturnItem(value)
                }} type={'primary'}>Add</Button>
            }
        }
    ]

    const tabItem = [
        {
            label: 'GRN Item',
            key: 'grnItem',
            children: <GrnItem/>
        },
        {
            label: 'Free Item',
            key: 'freeItem',
            children: <FreeItems/>
        },
        {
            label: 'Service Item',
            key: 'serviceItem',
            children: 'free item'
        }
    ]

    const handleGRNChange = async (grnId: any) => {
        const grnData = await grnService.getGrnBuId(grnId)
        setGrnData(grnData);
    }

    const srnItemColumns = [
        {
            key: '1',
            title: 'Item Code',
            dataIndex: 'rm_id',
            render: (value: any) => {
                const rmObj:any = rawMaterials.find((rm: any) => {
                    return rm.id === value;
                })

                return rmObj?.item_code;
            }
        },
        {
            key: '2',
            title: 'Item Name',
            dataIndex: 'rm_id',
            render: (value: any) => {
                const rmObj:any = rawMaterials.find((rm: any) => {
                    return rm.id === value;
                })

                return rmObj?.name;
            }
        },
        {
            key: '3',
            title: 'Received Qty.',
            dataIndex: 'qty',
        },
        {
            key: '6',
            title: 'Returning Qty',
            dataIndex: 'returnQty',
            render: (value: string, record: any)=>{
                console.log('record', record)
                return (
                    <Input onChange={(e)=>{handleInputChange(record.id, e.target.value, 'RTN_QTY')}} value={value} style={{width: '100%'}}/>
                )
            }
        },
        {
            key: '7',
            title: 'Reason',
            dataIndex: 'reason',
            width: '100',
            render: (value: string, record: any)=>{
                return (
                    <Select onChange={(e)=>{handleReasonChange(e, record.id)}} style={{width: '150px'}}>
                        <Select.Option value={'Manufacture Defect'}>Manufacture Defect</Select.Option>
                    </Select>
                )
            }
        },
        {
            key: 4,
            title: 'Item Type',
            dataIndex: 'recieved_type',
            render: (value: GrnItemTypeEnum, record: any)=>{
                return (
                    <Select disabled={true} value={value} style={{width: 150}}>
                        <Select.Option value={"1"}>Free Item</Select.Option>
                        <Select.Option value={"2"}>Service Item</Select.Option>
                        <Select.Option value={"0"}>PO Item</Select.Option>
                    </Select>
                )
            }
        },
        {
            title: 'Unit Price',
            dataIndex: 'price_per_unit',
            key: 'price',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (value: string, record: any) => {
                return <Input onChange={(e)=>{handleInputChange(record.id, e.target.value, 'DISCOUNT')}} style={{width: '150'}}/>
            }
        },
        {
            title: 'Taxes (Amount)',
            dataIndex: 'Taxes',
            key: 'taxes',
            render: (value: string, record: any) => {
                return <Input onChange={(e)=>{handleInputChange(record.id, e.target.value, 'TAX')}} style={{width: '150'}}/>
            }
        },
        {
            title: 'Return By',
            dataIndex: 'returnBy',
            render: (value:string, record:any) => {
                return <Select onSelect={(e)=>{handleRequestByChange(e, record.id)}} options={outSideUsers?.map(user => {
                    return {label: user.name, value: user.name}
                })} style={{minWidth: '200px'}}/>
            }
        },
        {
            key: '6',
            title: 'Action',
            dataIndex: 'id',
            render: (value: string, record: any) =>{
                return (
                    <Button danger onClick={()=>{handleRemoveItem(value)}} type={'primary'} >Remove</Button>
                )
            }
        }
    ]

    const handleRemoveItem = (id: string) => {
        setSrnItems(prevState => {
            return prevState.filter(item => item.id !== id);
        })
    }

    const handleRequestByChange = (name: string, id: string) => {
        setSrnItems(prevState => {
            return prevState.map(item => {
                if(item.id === id){
                    return {...item, requestedBy: name}
                }
            })
        })
    }

    const handleInputChange = (id: string, value: any, type: string) => {
        console.log('handleInputChange', id, value, type)
        setSrnItems((prevState: any[]): any[] => {

            const newVal =  prevState.map(item => {
                if(item.id === id) {
                    console.log('in item.id')
                        switch (type) {
                            case 'TAX':
                                return {...item, tax: value}

                            case 'DISCOUNT':
                                return {...item, discount: value}

                            case 'RTN_QTY':
                                console.log('came to return qty')
                                return {...item, returnQty: value}

                            default:
                                console.log('came to default')
                                return {...item}
                        }
                }
            })

            console.log('newVal', newVal)

            return newVal
        })

    }

    const handleReasonChange = (reason: any, id: string) => {
        console.log('reason', reason)
        srnItems.forEach(item => {
            if(item.id === id){
                item.reason = reason;
            }
        })
    }

    const handleSrnSubmit = () => {

        const {srn_no, grn_id, comment} = srnForm.getFieldsValue();

        const payload = {
            srn_no: srn_no,
            grn_id: grn_id,
            comment: comment,
            items: srnItems.map(item => {
                return {
                    rm_id: item.rm_id,
                    qty: item.returnQty,
                    reason: item.reason,
                    returned_by: item.requestedBy,
                    discount: item.discount
                }
            })
        }

        srnService.createNewSrn(payload)
            .then(data => {
                success('Success', 'SRN has been created.')
                srnForm.resetFields();
                setSrnItems([]);
            })
            .catch(e =>{
                error('Unexpected Error', 'Please Retry')
            })
    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Supplier Return Note'}]}/>
            <Card title={'Supplier Return Note'}>
                <div style={{borderBottom: 'solid', borderWidth: 1, borderColor: '#E3E1D9'}}>
                    <Form form={srnForm}>
                        <Form.Item name={'srn_no'} style={{width: 400}} label={'SRN Code'}>
                            <Input/>
                        </Form.Item>
                    </Form>
                </div>
                    <Row gutter={15} style={{marginTop: 25}}>
                        <Col span={12}>
                        <div style={{borderRight: 'solid', borderWidth: 1, borderColor: '#E3E1D9', width: '100%', paddingRight: 15, marginRight: 15, paddingBottom: 30}}>
                            <Row>
                                <Col span={12}>
                                    <Form form={srnForm} layout={'vertical'}>
                                        <Form.Item name={'grn_id'} label={'GRN Id'}>
                                            <Select showSearch onChange={handleGRNChange} options={grns.map(grn => {
                                                return {
                                                    value: grn.id,
                                                    label: grn.grn_no
                                                }
                                            })}/>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            <Table dataSource={grnData?.grn_item?.map((item: any) => {
                                return {
                                    rm_id: item.rm_id,
                                    qty: item.qty,
                                    recieved_type: item.recieved_type,
                                    id:item.id
                                }
                            })} columns={grnItemTableColumns} bordered/>
                            <Form form={srnForm} layout={'vertical'}>
                                <Row gutter={15} style={{marginTop: 20}}>
                                    <Col span={12}>
                                        <Form.Item name={'comment'} label={'Comment'}>
                                            <TextArea rows={4}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={'supInvNo'} label={'Supplier Inv No.'}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            {/*<Title level={5}>Previous GRNs for this PO</Title>*/}
                            <Row gutter={15}>
                                {/*<Col span={8}>*/}
                                {/*    <Card style={{textAlign: "center", backgroundColor: '#E3E1D9', padding: -20}}>*/}
                                {/*        <Title level={5} style={{margin: 0}}>PO-42309482</Title>*/}
                                {/*    </Card>*/}
                                {/*</Col>*/}
                                {/*<Col span={8}>*/}
                                {/*    <Card style={{textAlign: "center", backgroundColor: '#E3E1D9', padding: -20}}>*/}
                                {/*        <Title level={5} style={{margin: 0}}>PO-42309482</Title>*/}
                                {/*    </Card>*/}
                                {/*</Col>*/}
                                {/*<Col span={8}>*/}
                                {/*    <Card style={{textAlign: "center", backgroundColor: '#E3E1D9', padding: -20}}>*/}
                                {/*        <Title level={5} style={{margin: 0}}>PO-42309482</Title>*/}
                                {/*    </Card>*/}
                                {/*</Col>*/}
                            </Row>
                        </div>
                        </Col>
                        <Col span={12}>
                            <Table columns={srnItemColumns} dataSource={srnItems} scroll={{x: 500}}  style={{marginTop: 30}} bordered/>
                        </Col>
                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Item>
                                <Button onClick={handleSrnSubmit} style={{float: 'right', marginLeft: 15}} type={'primary'}>Save SRN</Button>
                            </Form.Item>
                        </div>
                    </Row>
            </Card>
        </>
    )
}

export default SupplierReturnNote;