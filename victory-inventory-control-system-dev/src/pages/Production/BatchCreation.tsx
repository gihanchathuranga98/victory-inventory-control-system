import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, DatePicker, Form, Input, Row, Select, Table} from "antd";
import {BatchService} from "../../services/Batch.service";
import RawMaterialService from "../../services/RawMaterial.service";
import {useContext, useEffect, useState} from "react";
import {AlertContext} from "../../context/AlertContext";

const BatchCreation = () => {

    const batchService = new BatchService();
    const rmService = new RawMaterialService();

    const [rawMaterials, setRawMaterials] = useState<any[]>([])
    const [batchItems, setBatchItems] = useState<{rm_id:string, qty: number}[]>([]);
    const [batchData, setBatchData] = useState<{name: string, start_date: string, end_date: string}>();
    const [batches, setBatches] = useState<any[]>([]);

    const [itemForm] = Form.useForm();
    const [batchForm] = Form.useForm();

    const {error, success} = useContext(AlertContext);


    useEffect(() => {
        rmService.getAllRawMaterials()
            .then(data => {
                setRawMaterials(data);
            })
            .catch(e =>{

            })

        batchService.getAllBatches()
            .then(data => {
                setBatches(data);
            })
            .catch(e => {
                console.log(e);
            })

    }, []);

    useEffect(() => {
        console.log('batchItems', batchItems)
    }, [batchItems]);

    const itemTableColumns = [
        {
            key: '1',
            title: 'Material Code',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rm = rawMaterials.find(item =>{
                    return item.id === value;
                })

                return rm.item_code;
            }
        },
        {
            key: '2',
            title: 'Material Name',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rm = rawMaterials.find(item =>{
                    return item.id === value;
                })

                return rm.name;
            }
        },
        {
            key: '3',
            title: 'Quantity',
            dataIndex: 'qty'
        },
        {
            key: '4',
            title: 'Options',
            dataIndex: 'rm_id',
            render: (value: any) => {
                return (<Button type={'primary'} danger onClick={()=>{
                    setBatchItems(prevState => {
                        return prevState.filter(item => {
                            return item.rm_id !== value;
                        })
                    })
                }}>Remove</Button>)
            }
        },
    ]

    const batchTableColumns = [
        // {
        //     key: 1,
        //     title: 'Batch Code',
        //     dataIndex: ''
        // },
        {
            key: 1,
            title: 'Batch Name',
            dataIndex: 'name'
        },
        {
            key: 2,
            title: 'Start Date',
            dataIndex: 'start_date'
        },
        {
            key: 3,
            title: 'End Date',
            dataIndex: 'end_date'
        },
        {
            key: 4,
            title: 'Is Complete',
            dataIndex: 'is_complete',
            render: (value: boolean) => {
                return value ? 'COMPLETED': 'NOT COMPLETED'
            }
        }
    ]


    const handleItemFinish = (values: any) => {
        console.log('handle item finish === ', values)
        setBatchItems(prevState => {
            return prevState.concat([{rm_id: values.rm_item, qty: values.qty}]);
        })
    }

    const handleBatchFinish = (values: any) => {
        // setBatchData({name: values.name, end_time: values.end_time, start_time: values.start_time});
        batchService.createNewBatch({addBatchDto: {is_complete: false, name: values.name, end_date: new Date(`${values.end_date.year()}-${values.start_date.month() + 1}-${values.start_date.day()}`).toISOString(), start_date: new Date(`${values.start_date.year()}-${values.start_date.month() + 1}-${values.start_date.day()}`).toISOString()}, batchItems: batchItems})
            .then(data => {
                console.log('success')
                success('Success', 'Batch created successfully');
            })
            .catch(e => {
                console.log(e);
                error('Unexpected Error', 'Batch creation failed');
            })
            .finally(()=> {
                batchForm.resetFields();
                itemForm.resetFields();
                setBatchItems([])
                batchService.getAllBatches()
                    .then(data => {
                        setBatches(data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            })
    }

    return (
        <>
            <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Batch Creation', href: '/batch-creation'}]}/>
            <Card title={'Batch Creation'}>
                <Row>
                        <Col span={10}>
                    <div style={{borderRight: 'solid', borderColor: '#E3E1D9', borderWidth: 1, paddingRight: 15, paddingBottom: 40}}>
                            <Row>
                                <Col offset={4} span={16}>
                                    <Form form={batchForm} layout={'vertical'}>
                                        {/*<Form.Item name={'code'} label={'Batch Code'}>*/}
                                        {/*    <Input/>*/}
                                        {/*</Form.Item>*/}
                                        <Form.Item name={'name'} label={'Batch Name'}>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item name={'start_date'} label={'Start Date'}>
                                            <DatePicker style={{width: '100%'}}/>
                                        </Form.Item>
                                        <Form.Item name={'end_date'} label={'End Date'}>
                                            <DatePicker style={{width: '100%'}}/>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            <div style={{borderTop: 'solid', borderColor: '#E3E1D9', borderWidth: 1, paddingTop: 15}}>
                                <Row>
                                    <Col offset={4} span={16}>
                                        <Form layout={'vertical'} form={itemForm} onFinish={handleItemFinish}>
                                            <Form.Item name={'rm_item'} label={'Raw Material'}>
                                                <Select showSearch options={rawMaterials?.map(item => {
                                                    console.log('rmItem', item);
                                                    return {
                                                        label: item.name,
                                                        value: item.id
                                                    }
                                                })}/>
                                            </Form.Item>
                                            <Form.Item name={'qty'} label={'Quantity'}>
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button style={{float: 'right'}} htmlType={'submit'} type={'primary'}>Add</Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                            <Table dataSource={batchItems} columns={itemTableColumns} bordered/>
                            <Form form={batchForm} onFinish={handleBatchFinish}>
                                <Form.Item style={{marginTop: 15}}>
                                    <Button style={{float: "right", marginLeft: 15}} type={'primary'} htmlType={'submit'}>Submit</Button>
                                    <Button style={{float: "right"}}>Clear</Button>
                                </Form.Item>
                            </Form>
                            </div>
                        </Col>
                    <Col span={14}>
                        <Table columns={batchTableColumns} dataSource={batches} style={{marginLeft: 15}} bordered/>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default BatchCreation;