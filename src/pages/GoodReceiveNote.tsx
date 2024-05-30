import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Radio, Row, Select, Table, Tabs, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import PoItem from "../components/GrnItemTypes/PoItem";
import {DiscountTypeEnum} from "../enums/DiscountTypeEnum";
import FreeItem from "../components/GrnItemTypes/FreeItem";
import ServiceItem from "../components/GrnItemTypes/ServiceItem";
import {useContext, useEffect, useState} from "react";
import {PoService} from "../services/Po.service";
import {AlertContext} from "../context/AlertContext";
import './../App.css';
import RawMaterialService from "../services/RawMaterial.service";
import {PrnService} from "../services/Prn.service";
import {v4 as uuid} from "uuid";
import TaxService from "../services/Tax.service";


enum GrnItemTypeEnum {
    PO_ITEM,
    FREE_ITEM,
    SERVICE_ITEM
}

const GoodReceiveNote = () => {

    const [poForm] = Form.useForm();
    const [grnForm] = Form.useForm();

    const poService = new PoService();
    const rmService = new RawMaterialService();
    const prnService = new PrnService();
    const taxService = new TaxService();

    const {Text, Title} = Typography;
    const [tax, setTax] = useState<any[]>([])
    const [po, setPo] = useState<any[]>([]);
    const [grnItems, setGrnItems] = useState<any[]>([])
    const [selectedPoItems, setSelectedPoItems] = useState<any[]>([]);
    const [rawMaterial, setRawMaterial] = useState<any[]>([])
    const [displayValues, setDisplayValues] = useState({
        total: 0,
        discount: 0,
        discountType: 2,
        netTotal: 0
    })

    const {error, info, warning, success} = useContext(AlertContext);

    useEffect(() => {
        poService.getAllPOs()
            .then(data => {
                setPo(data);
            })
            .catch(e => {
                error('Unexpected Error', 'Unable to fetch PO data');
            })

        taxService.getAllTaxTypes()
            .then(data => {
                setTax(data);
            })
            .catch(e => {
                error('Unexpected Error', 'Unable to fetch PO data');
            })
    }, []);

    const poColumns = [
        {
            title: 'Item Code',
            dataIndex: 'itemCode',
            key: 'code'
        },
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'PO Quantity',
            dataIndex: 'poQty',
            key: 'poQty'
        },
        {
            title: 'Received Quantity',
            dataIndex: 'receivedQty',
            key: 'ReceivedQty'
        },
        {
            title: 'Balance Quantity',
            dataIndex: 'balanceQty',
            key: 'balanceQty'
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (value: string) => {
                return (
                    <Button onClick={()=>{handleAddGrnItem(value)}} type={'primary'}>Add Item</Button>
                )
            }
        }
    ]

    const handleGrnItemRemove = (uid: string) => {
        setGrnItems(prevState => {
            return prevState.filter(grn => {
                return uid !== grn.uid;
            })
        })
    }

    const handleAddGrnItem = (poId: string) => {

        const selectedPoItem: any = selectedPoItems.find((poItem: any) => {
            console.log('handleAddGrnItem => ', poId, '===', poItem.id);
            return poId === poItem.id;
        })

        setGrnItems(prevState => {
            return prevState.concat([
                {
                    item_code: selectedPoItem.rm_details.itemCode,
                    item_name: selectedPoItem.rm_details.name,
                    po_qty: selectedPoItem.qty,
                    received_qty: (+selectedPoItem.qty - +selectedPoItem.rm_details.reOrderQty),
                    item_type: GrnItemTypeEnum.PO_ITEM,
                    // pr_no: '',
                    uid: uuid(),
                    prn_id: selectedPoItem.prn_item_id
                }
            ])
        })
    }

    const tabItems = [
        {
            key: '1',
            label: 'PO Items',
            children: <PoItem/>,
        },
        {
            key: '2',
            label: 'Free Items',
            children: <FreeItem/>,
        },
        {
            key: '3',
            label: 'Service Items',
            children: <ServiceItem/>,
        }
    ]

    const grnColumns = [
        {
            key: '1',
            title: 'Item Code',
            dataIndex: 'item_code'
        },
        {
            key: '2',
            title: 'Item Name',
            dataIndex: 'item_name'
        },
        {
            key: '3',
            title: 'Received Qty.',
            dataIndex: 'received_qty',
            render: (value: string, record: any)=>{
                return (
                    <Input value={value} onChange={(e)=>{handleGrnQtyChange(e.target.value, record.uid)}} style={{width: '100%'}}/>
                )
            }
        },
        {
            key: 4,
            title: 'Item Type',
            dataIndex: 'item_type',
            render: (value: GrnItemTypeEnum, record: any)=>{
                return (
                    <Select onChange={(e)=>{handleGrnItemTypeChange(e, record.uid)}} disabled={value === GrnItemTypeEnum.PO_ITEM} value={value} style={{width: 150}}>
                        <Select.Option value={GrnItemTypeEnum.FREE_ITEM}>Free Item</Select.Option>
                        <Select.Option value={GrnItemTypeEnum.SERVICE_ITEM}>Service Item</Select.Option>
                        { value === GrnItemTypeEnum.PO_ITEM ? <Select.Option value={GrnItemTypeEnum.PO_ITEM}>PO Item</Select.Option> : null}
                    </Select>
                )
            }
        },
        {
            key: '5',
            title: 'PR No.',
            dataIndex: 'pr_no'
        },
        {
            title: 'Unit Price',
            dataIndex: 'price',
            key: 'price',
            width: '200px',
            render: (value: string, record: any) => {
                return (
                    <Input value={value} onChange={(e)=>{handleUnitPriceChange(e.target.value, record.uid)}} style={{width: '100px'}}/>
                )
            }
        },
        {
            key: '6',
            title: 'Action',
            dataIndex: 'uid',
            render: (value: string, record: any) =>{
                return (
                    <Button danger type={'primary'} onClick={()=>{handleGrnItemRemove(value)}}>Remove</Button>
                )
            }
        }
    ]

    const handleUnitPriceChange = (value: string, uid: string) => {
      setGrnItems(prevState => {
          return prevState.map(grnItem => {
              return uid === grnItem.uid ? {...grnItem, price: value} : {...grnItem}
          })
      })
    }

    const handleGrnItemTypeChange = (e:GrnItemTypeEnum, uid: string) =>{
        console.log('handleGrnItemTypeChange  === ',e)
        setGrnItems((prevState: any[]) => {
            return prevState.map(grnItem => {
                return uid === grnItem.uid ? {...grnItem, item_type: e} : {...grnItem}
            })
        })
    }

    const handleGrnQtyChange =(value: string, uid: string) => {
        setGrnItems((prevState: any[]) => {
            return prevState.map(grnItem => {
                return grnItem.uid === uid ? {...grnItem, received_qty: value} : {...grnItem}
            })
        })
    }

    const handlePoSelect = async () => {
        const {poId} = poForm.getFieldsValue();
        const selectedPo: any = po.find((item: any) => {
            return poId === item.id;
        })
        poForm.setFieldValue('supplier', selectedPo.supplier.name);
        const selectedPoItemDetails = new Promise(async (resolve, reject) => {
            await selectedPo.po_item.map(async (item: any) => {
                const rmItem = await rmService.getOneRawMaterial(item.rm_id);
                console.log('rmItem', rmItem);
                if(rmItem){
                    resolve({...item, rm_details: rmItem});
                }else{
                    reject(rmItem);
                }
            })
        })
        console.log('selectePoItemDetaild', selectedPoItemDetails)

        Promise.all([selectedPoItemDetails])
            .then((data: any[]) => {
                console.log(data)
                setSelectedPoItems(data);
            })
            .catch(e => {

            })

    }

    useEffect(() => {
        rmService.getAllRawMaterials()
            .then(data => {
                setRawMaterial(data);
            })
            .catch(e=>{})
    }, []);

    const handleExternalGrnItemAdd = () =>{
        const {rm, qty} = grnForm.getFieldsValue();
        if(+qty > 0) {
            const rmDetails = rawMaterial.find(rmItem => rm === rmItem.id);
            setGrnItems(prevState => {
                return prevState.concat([
                    {
                        item_code: rmDetails.item_code,
                        item_name: rmDetails.name,
                        po_qty: 'N/A',
                        received_qty: qty,
                        item_type: GrnItemTypeEnum.FREE_ITEM,
                        // pr_no: '',
                        uid: uuid(),
                        prn_id: 'N/A'
                    }
                ])
            })
        }
    }

    //calculating the total values
    useEffect(() => {
        const {discount, discountType2} = poForm.getFieldsValue();
        const prices = grnItems.map(item => {
            return {price: item.price, uid: item.uid, qty: item.received_qty};
        })
        let total: number;
        if(prices.length > 0){
            total = prices.map(item => (item.price * item.qty)).reduce((total, curr) => (+curr + +total));
            poForm.setFieldValue('total', total)
        }

        setDisplayValues(prevState => {
            return {...prevState, total: total}
        })

    }, [grnItems]);

    useEffect(() => {
        console.log('display values', displayValues)
    }, [displayValues]);

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Good Receive Note'}]}/>
            <Card title={'Good Receive Note'}>
                <div style={{borderBottom: 'solid', borderColor: '#E3E1D9', borderWidth: 1, marginBottom: 25}}>
                    <Form>
                        <Form.Item style={{width: 300}} label={'GRN Id'}>
                            <Input disabled/>
                        </Form.Item>
                    </Form>
                </div>
                <Row gutter={15}>
                    <Col span={12}>
                        <div style={{borderRight: 'solid', borderWidth: 1, borderColor: '#E3E1D9', width: '100%', paddingRight: 15, marginRight: 15, paddingBottom: 30}}>
                            <Form form={poForm} layout={'vertical'}>
                                <Row gutter={15}>
                                    <Col span={12}>
                                        <Form.Item name={'poId'} label={'PO Id'}>
                                            <Select showSearch onSelect={handlePoSelect} options={po.map((item: any) => {
                                                return {
                                                    value: item.id,
                                                    label: item.po_no
                                                }
                                            })}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={'supplier'} label={'Supplier Name'}>
                                            <Input disabled/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Table columns={poColumns} dataSource={selectedPoItems.map((item: any) =>{
                                return {
                                    itemCode: item.rm_details.itemCode,
                                    name: item.rm_details.name,
                                    poQty: item.qty,
                                    receivedQty: item.rm_details.reOrderQty,
                                    balanceQty: (+item.qty - +item.rm_details.reOrderQty),
                                    prNo: item.prn_item_id,
                                    id: item.id
                                }
                            })} bordered/>
                            <Form layout={'vertical'}>
                                <Row gutter={15} style={{marginTop: 20}}>
                                    <Col span={12}>
                                        <Form.Item label={'Comment'}>
                                            <TextArea rows={4}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Supplier Invoice No.'}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Title level={5}>Previous GRNs for this PO</Title>
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
                        {/*<Tabs type={'card'} defaultActiveKey={'1'} items={tabItems}/>*/}
                        <Form form={grnForm} layout={'vertical'}>
                            <Row gutter={15} style={{marginTop: 20}}>
                                <Col span={12}>
                                    <Form.Item name={'rm'} label={'Raw material'}>
                                        <Select options={rawMaterial.map(item => {
                                            return {
                                                value: item.id,
                                                label: `${item.item_code} - ${item.name}`
                                            }
                                        })}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={'qty'} label={'Qty.'}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div style={{width: '100%', marginBottom: '15px'}}>
                                <Button onClick={handleExternalGrnItemAdd} style={{float: "right", marginBottom: 15}} type={'primary'}>Add Item</Button>
                                {/*<Button style={{float: "right", marginRight: 10}}>Clear</Button>*/}
                            </div>
                        </Form>
                        <Table scroll={{x: 500}} dataSource={grnItems} columns={grnColumns} style={{marginTop: 30}} bordered/>
                        <Form form={poForm} layout={'vertical'}>
                            <Row style={{marginTop: 20}} gutter={15}>
                                <Col offset={12} span={12}>
                                    <Form.Item name={'total'} label={'Total'}>
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Text style={{marginBottom: 10, marginRight: 10}}>Discount Type :</Text><br/>
                                    <Radio.Group name={'discountType2'} defaultValue={2}>
                                        <Radio value={1}>Percentage</Radio>
                                        <Radio value={2}>Amount</Radio>
                                    </Radio.Group>
                                </Col>
                                <Col  span={12}>
                                    <Form.Item name={'discount'} label={'Discount'}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col offset={12} span={12}>
                                    <Form.Item label={'Tax'}>
                                        <Select options={tax.map(taxItem => ({value: taxItem.id, label: taxItem.name}))} mode={'multiple'} allowClear/>
                                    </Form.Item>
                                </Col>
                                <Col offset={12} span={12}>
                                    <Form.Item label={'Net Total'}>
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <div style={{width: '100%'}}>
                    <Button style={{float: "right"}} type={'primary'}>Create GRN</Button>
                    <Button style={{float: "right", marginRight: 10}}>Clear</Button>
                </div>
            </Card>
        </>
    )
}

export  default GoodReceiveNote;