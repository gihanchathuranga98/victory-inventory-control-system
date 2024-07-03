import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table, Tabs, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import GrnItem from "../components/SrnItemTypes/GrnItem";
import FreeItems from "../components/SrnItemTypes/FreeItems";
import GrnService from "../services/Grn.service";
import {useEffect, useState} from "react";
import RawMaterialService from "../services/RawMaterial.service";

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

    const grnService = new GrnService();
    const rmService = new RawMaterialService();

    useEffect(() => {
        grnService.getAllGrns()
            .then(data => {
                console.log('GRN -- ALL --- ', data)
                setGrns(data);
            })
            .catch(e => {

            })
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

                return rmObj?.item_name;
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
                return (
                    <Input value={value} style={{width: '100%'}}/>
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
            key: '6',
            title: 'Action',
            dataIndex: 'uid',
            render: (value: string, record: any) =>{
                return (
                    <Button danger type={'primary'} >Remove</Button>
                )
            }
        }
    ]

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Supplier Return Note'}]}/>
            <Card title={'Supplier Return Note'}>
                <div style={{borderBottom: 'solid', borderWidth: 1, borderColor: '#E3E1D9'}}>
                    <Form form={srnForm}>
                        <Form.Item name={'srnCode'} style={{width: 400}} label={'SRN Code'}>
                            <Input/>
                        </Form.Item>
                    </Form>
                </div>
                    <Row gutter={15} style={{marginTop: 25}}>
                        <Col span={12}>
                        <div style={{borderRight: 'solid', borderWidth: 1, borderColor: '#E3E1D9', width: '100%', paddingRight: 15, marginRight: 15, paddingBottom: 30}}>
                            <Row>
                                <Col span={12}>
                                    <Form layout={'vertical'}>
                                        <Form.Item name={'grnId'} label={'GRN Id'}>
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
                            <Form layout={'vertical'}>
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
                            <Table columns={srnItemColumns} dataSource={srnItems} scroll={{x: 500}}  style={{marginTop: 30}} bordered/>
                        </Col>
                    </Row>
            </Card>
        </>
    )
}

export default SupplierReturnNote;