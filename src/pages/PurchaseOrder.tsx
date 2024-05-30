import {Button, Card, Col, Form, Input, Radio, Row, Select, Space, Table} from "antd";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import TextArea from "antd/es/input/TextArea";
import {Typography} from "antd";
import {DiscountTypeEnum} from "../enums/DiscountTypeEnum";
import {useContext, useEffect, useState} from "react";
import {PrnDto, PrnItemDto} from "../models/dto/Prn.dto";
import {AlertContext} from "../context/AlertContext";
import {PrnService} from "../services/Prn.service";
import RawMaterialService from "../services/RawMaterial.service";
import {v4 as uuid} from "uuid";
import SupplierService from "../services/Supplier.service";
import {PoService} from "../services/Po.service";
import {PoDto} from "../models/dto/Po.dto";
import TaxService from "../services/Tax.service";


const PurchaseOrder =  () => {

    const prnService = new PrnService();
    const rmService = new RawMaterialService();
    const supplierService = new SupplierService();
    const poService = new PoService();
    const taxService = new TaxService();
    const {error, success, info, warning} = useContext(AlertContext);

    const [prnForm] = Form.useForm();
    const [poItemForm] = Form.useForm();

    const [prn, setPrn] = useState<PrnDto[]>([]);
    const [prnItems, setPrnItems] = useState<any[]>([]);
    const [pendingPoItem, setPendingPoItem] = useState<any>();
    const [poItems, setPoItems] = useState<any[]>([]);
    const [isPrnTableLoading, setIsPrnTableLoading] = useState<boolean>(false);
    const [suppliers, setSuppliers] = useState([]);
    const [rawMaterials, setRawMaterials] = useState<any[]>([])
    const [taxTypes, setTaxTypes] = useState<any[]>([]);
    const [grossTotal, setGrossTotal] = useState<number>(0.00);

    useEffect(() => {
        prnService.getAllPRNs()
            .then(data => {
                console.log('prn - from db', data)
                setPrn(data);
            })
            .catch(e => {
                error('Unexpected Error', 'Unable to retrieve PRN data');
            })

        rmService.getAllRawMaterials()
            .then(data => {
                setRawMaterials(data);
            })
            .catch(err => {
                error('Unexpected Error', 'Unable to fetch raw materials')
            })

        taxService.getAllTaxTypes()
            .then(data => {
                console.log('Tax Types ==> ', data);
                setTaxTypes(data);
            })
            .catch(e => {
                error('Unexpected Error', 'Unable to fetch tax types')
            })
    }, []);

    useEffect(() => {
        if(poItems.length > 0){
            const total = poItems.map((po) => {
                return +((prnItems.find(prn => prn.prnItmId === po.prnItemId)).estimatedPricePerUnit) * +po.orderQty
            })
            setGrossTotal(total.reduce((total, currentValue)=>{
                return +currentValue + +total;
            }))
            prnForm.setFieldValue('grossTotal', total.reduce((total, currentValue)=>{
                return +currentValue + +total;
            }))
        }
    }, [poItems]);

    const handleNetTotal = () => {
        const {grossTotal, discountType, discount, tax} = prnForm.getFieldsValue();
        let totalPrice = +grossTotal;

        if(discountType === DiscountTypeEnum.VALUE){
            totalPrice = +totalPrice - +discount;
        }else if(discountType === DiscountTypeEnum.PERCENTAGE){
            totalPrice = totalPrice - (totalPrice * +discount / 100)
        }

        if(tax?.length > 0){
            const taxObjs = tax.map((taxid: number) => {
                return (taxTypes.find(type => type.id === taxid)).value
            })

            const taxValues = taxObjs.map((val: number) => {
                return (val / 100 * totalPrice);
            })

            totalPrice = totalPrice + taxValues.reduce((total: number, currentValue: number)=>{
                return total + +currentValue;
            })
        }
        prnForm.setFieldValue('netTotal', totalPrice.toFixed(2));
    }

    const {Text} = Typography

    const poColumns = [
        {
            title: 'Material Code',
            dataIndex: 'rmCode',
            key: 'code'
        },
        {
            title: 'Material Name',
            dataIndex: 'rmName',
            key: 'name'
        },
        {
            title: 'Quantity',
            dataIndex: 'orderQty',
            key: 'qty'
        },
        {
            title: 'Options',
            dataIndex: 'uid',
            key: 'id',
            render: (value:any, record: any) => {
                return (<Button onClick={()=>{handlePoItemRemove(value, record)}} danger type={'primary'}>Remove</Button>)
            }
        }
    ]

    const handlePoItemRemove = (uid: string, record: any) => {
        setPoItems(prevState => {
            return prevState.filter(po => po.uid !== uid)
        })
        setPrnItems((prevState: any[]) => {
            let currentArray = prevState;
            let arr = currentArray.map(prn => {
                console.log('[prn.prnItmId]', prn.prnItmId, '[record]', record)
                if (prn.prnItmId === record.prnItmId){
                    prn.orderedQty = prn.orderedQty - record.qty;
                    console.log('[prn.orderQty]', prn.orderedQty, '[record.qty]', record.qty)
                }
                return prn;
            })
            console.log('[arr]', arr)
            return arr;
        })
    }

    const prnColumns: any = [
        {
            title: 'Material Code',
            dataIndex: 'item_code',
            key: 'materialCode'
        },
        {
            title: 'Material Name',
            dataIndex: 'name',
            key: 'materialName'
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Ordered Qty',
            dataIndex: 'orderedQty',
            key: 'orderedQty'
        },
        {
            title: 'Last Price',
            dataIndex: 'estimatedPricePerUnit',
            key: 'lastPrice'
        },
        {
            title: 'Options',
            dataIndex: 'prnItmId',
            key: 'prnItmId',
            fixed: 'right',
            render: (value: any, record: any) => {
                console.log('[prnItemId in options]', record);
                return <Button disabled={!((+record.qty > +record.orderedQty))} onClick={()=>{handleAddPo(value)}} value={value} type={'primary'}>Add</Button>
            }
        }
    ]

    useEffect(() => {
        supplierService.getAllSuppliers()
            .then(data => {
                const suppliers = data.map((sup: any) => {
                    return {id: sup.id, name: sup.name}
                })
                setSuppliers(prevState => {
                    return suppliers.map((sup:any) => {
                        return {label: sup.name, value: sup.id}
                    })
                })
            })
            .catch(err => {
                error('Unexpected Error', 'Unable to retrieve suppliers');
            })
    }, []);

    const handleAddPo = (prnItemId: string) => {
        setPendingPoItem((prev:any) => {
            console.log('[prnItemId]', prnItemId, '[prnItems in handleAddPo]', prnItems);
            const itm = prnItems.find(pi => pi.prnItmId === prnItemId);
            poItemForm.setFieldValue('poItem', itm?.name);
            poItemForm.setFieldValue('qty', itm?.qty - itm?.orderedQty);
            poItemForm.setFieldValue('suffix', itm?.uom?.name);
            console.log('[setPendingPoItem]', itm);
            return itm;
        })
    }

    const handlePrnSelect = () => {
        const {prnId} = prnForm.getFieldsValue();
        const prnItems= (prn.find(p => p.id === prnId))?.prnItem;
        setIsPrnTableLoading(true);
        if(prnItems && prnItems.length > 0){

            const itms = prnItems.map(item => {
                return {rmId: item.rmId, qty: item.qty, orderedQty: item.orderedQty, estimatedPricePerUnit: item.estimatedPricePerUnit, prnItmId: item.prnItemId};
            })

            rmService.getRawMaterials(itms.map(i => i.rmId))
                .then(data => {
                    setPrnItems((prevState:any[]) => {
                        return itms.map(i => {
                            return {...i, ...data.find((d:any) => d.id === i.rmId)};
                        })
                    })
                })
                .catch(e =>{
                    setIsPrnTableLoading(false);
                })
                .finally(()=>{
                    setIsPrnTableLoading(false);
                })
        }

    }

    const checkDuplicates = (prnItmId: string, rmId: string): boolean => {
        console.log('[came to check duplicates]', prnItmId, rmId)
        let duplicates = false
        console.log('poItems ---> ', poItems)
        poItems.forEach(po => {
            console.log(`[${po.prnItemId} === ${prnItmId} && ${po.rmId} === ${rmId}]`)
            if((po.prnItemId === prnItmId) && (po.rmId === rmId)){
                duplicates = true;
            }
        })
        return !duplicates;
    }

    const handleAddPoItem = () => {
        const uid = uuid();
        const {qty, poItem} = poItemForm.getFieldsValue();

        console.log('pending-po-item', pendingPoItem)

        if(qty > 0 && pendingPoItem?.prnItmId){
            if(pendingPoItem.prnItmId){
                if((pendingPoItem.qty - pendingPoItem.orderedQty) >= qty){
                    if(checkDuplicates(pendingPoItem.prnItmId, pendingPoItem.rmId)){
                        setPoItems(prevState => {
                            let currentArray = prevState;
                            return currentArray.concat([{prnItemId: pendingPoItem.prnItmId, rmId: pendingPoItem.rmId, orderQty: qty, rmCode: pendingPoItem.item_code, rmName: pendingPoItem.name, uid}])
                        })
                    }else{
                        warning('Duplicate Item', 'The item already exists in the PO');
                    }
                    poItemForm.resetFields();
                    setPendingPoItem(undefined);
                }else{
                    warning('Invalid Quantity', 'Item quantity exceeds the limit')
                }
            }else{
                //item is not available
            }
        }else{
            if(poItem && +qty > 0){

                const rm = rawMaterials?.find(rm => {
                    return rm.id === poItem;
                })
                setPoItems(prevState => {
                    let currentArray = prevState;
                    return currentArray.concat([{rmId: rm.id, orderQty: qty, rmCode: rm.item_code, rmName: rm.name, uid}])
                })
                poItemForm.resetFields();
                setPendingPoItem(undefined);
            }else{
                warning('Empty Field', 'Please fill all of the required fields');
            }
        }

    }

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select disabled={true} style={{ width: 120 }}>
            </Select>
        </Form.Item>
    );

    const handleRmSelect = () => {
        const {poItem} = poItemForm.getFieldsValue();
        const rm = rawMaterials?.find(rm => {
            return rm.id === poItem;
        })
        poItemForm.setFieldValue('suffix', rm?.uom?.name);
    }

    const handlePoSubmit = () => {
        console.log('[poItems]', poItems)
        const {supplier, poNo, specialComment, supplierComment, location, contactPerson, grossTotal, netTotal, discountType, discount, tax} = prnForm.getFieldsValue();
        console.log('Discount Type', discountType)
        const requestPayload: PoDto = {
            po_no: poNo,
            supplier_id: supplier,
            special_note: specialComment,
            delivery_location: location,
            contact_person: contactPerson,
            discount_type: discountType || "1",
            currency: 'LKR',
            discount: discount,
            tax_type: tax,
            items: poItems.map(item => {
                return {
                    rm_id: String(item.rmId),
                    qty: Number(item.orderQty),
                    price_per_unit: Number(item.pricePerUnit) || 0,
                    prn_item_id: String(item?.prnItemId)
                }
            })
        }


        poService.createNewPO(requestPayload)
            .then(data => {
                success('PO Saved', 'PO has been saved successfully');
                poItemForm.resetFields();
                prnForm.resetFields();
            })
            .catch(e => {
                error('Unexpected Error', 'Unable to save the PO');
            })
        // prnForm.resetFields();
        // poItemForm.resetFields();
        // setPrnItems([]);
        // setPoItems([]);
    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '/'}, {title: 'Purchase Order'}]}/>
            <Card title={'Purchase Order'}>
                <Row>
                    <Col span={6}>
                        <Form layout={'vertical'}>
                            <Form.Item label={'PO Id'}>
                                <Input disabled/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <hr style={{backgroundColor: '#fff', height: '1px'}}/>
                <Row gutter={15}>
                    <Col span={12}>
                        <div style={{width: '100%', borderRight: 'solid', paddingRight: 15, borderColor: '#E3E1D9', paddingBottom: 35}}>
                            <Form form={prnForm} layout={'vertical'}>
                                <Row gutter={15} style={{marginTop: 20, marginBottom: 20}}>
                                    <Col span={12}>
                                            <Form.Item name={'prnId'} label={'PR Id'}>
                                                <Select onSelect={handlePrnSelect} options={prn.map(item => {
                                                    return {
                                                        value: item.id,
                                                        label: item.prNo
                                                    }
                                                })} showSearch={true}/>
                                            </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                            <Form.Item label={'Supplier'} name={'supplier'}>
                                                <Select options={suppliers} showSearch={true}/>
                                            </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'PO No.'} name={'poNo'}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Table loading={isPrnTableLoading} dataSource={prnItems} bordered scroll={{x: 1000}} columns={prnColumns}/>
                            <Form layout={'vertical'} form={prnForm}>
                                <Row gutter={15} style={{marginTop: 20, marginBottom: 20}}>
                                    <Col span={12}>
                                        <Form.Item label={'Special Comment'} name={'specialComment'}>
                                            <TextArea rows={4}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Delivery Before'} name={'supplierComment'}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Delivery Location'} name={'location'}>
                                            <Select showSearch={true}>
                                                <Select.Option value={'1'}>
                                                    Dematagoda
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Contact Person'} name={'contactPerson'}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col span={12} >
                        <Form form={poItemForm} layout={'vertical'}>
                            <Row gutter={15} style={{marginTop: 20, marginBottom: 20}}>
                                <Col span={12}>
                                    <Form.Item name={'poItem'} label={'Item Name'}>
                                        <Select onSelect={handleRmSelect} options={rawMaterials?.map(rm => ({label: `${rm.item_code} - ${rm.name}`, value: rm.id}))} disabled={true} showSearch={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={'qty'} label={'Quantity'}>
                                        <Input addonAfter={suffixSelector}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button onClick={handleAddPoItem} type={'primary'} style={{float: 'right', marginBottom: 15, marginTop: -15}}>Add Item</Button>
                            <Button onClick={()=>{
                                poItemForm.setFieldValue('poItem', "");
                                poItemForm.setFieldValue('qty', "");
                                poItemForm.setFieldValue('suffix', "");
                                setPendingPoItem(undefined)
                            }} style={{float: 'right', marginBottom: 15, marginTop: -15, marginRight: 10}}>Clear</Button>
                        </Form>
                        <Table style={{marginTop: 15}} dataSource={poItems} bordered columns={poColumns}/>
                        <Form form={prnForm} layout={'vertical'}>
                            <Row style={{marginTop: 20}} gutter={15}>
                                <Col offset={12} span={12}>
                                    <Form.Item label={'Total'} name={'grossTotal'} initialValue={grossTotal.toString()}>
                                        <Input style={{textAlign:'right'}} disabled defaultValue={grossTotal.toString()}/>
                                    </Form.Item>
                                </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Discount Type :'} name={'discountType'}>
                                            <Radio.Group defaultValue={"1"} name={'discountType'} onChange={handleNetTotal}>
                                                <Radio value={"0"}>Percentage</Radio>
                                                <Radio value={"1"}>Amount</Radio>
                                            </Radio.Group>
                                            </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Discount'} name={'discount'}>
                                            <Input onChange={handleNetTotal}/>
                                        </Form.Item>
                                    </Col>
                                <Col offset={12} span={12}>
                                    <Form.Item label={'Tax'} name={'tax'}>
                                        <Select mode={'multiple'} allowClear onChange={handleNetTotal}>
                                            {
                                                taxTypes.map(tax => {
                                                    return (
                                                        <Select.Option value={tax.id}>
                                                            {tax.name}
                                                        </Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col offset={12} span={12}>
                                    <Form.Item label={'Net Total'} name={'netTotal'}>
                                        <Input disabled style={{textAlign: 'right'}}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <div style={{width: '100%'}}>
                        <Button onClick={handlePoSubmit} style={{float: "right"}} type={'primary'}>Create PO</Button>
                        <Button style={{float: "right", marginRight: 10}}>Clear</Button>
                    </div>
                </Row>
            </Card>
        </>
    )
}

export default PurchaseOrder;