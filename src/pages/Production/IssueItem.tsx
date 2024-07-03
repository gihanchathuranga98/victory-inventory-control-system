import Breadcrumbs from "../../components/Breadcrumb/Breadcrumb";
import {Button, Card, Col, Form, Input, Row, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {BatchService} from "../../services/Batch.service";
import RawMaterialService from "../../services/RawMaterial.service";
import OutsideUserService from "../../services/OutsideUser.service";
import {OutsideUserLevelEnum} from "../../enums/OutsideUserLevel.enum";
import {IssueService} from "../../services/Issue.service";

const IssueItem = () => {

    const [issueForm] = Form.useForm();
    const [rmForm] = Form.useForm();

    const batchService = new BatchService();
    const rmService = new RawMaterialService();
    const otherUserService = new OutsideUserService();
    const issueService = new IssueService();

    const [rawMaterials, setRawMaterials] = useState<any[]>([]);
    const [batches, setBatches] = useState<any[]>([]);
    const [outsideEmployees, setOutsideEmployees] = useState<any[]>([]);
    const [selectedRawMaterials, setSelectedRawMaterials] = useState<any[]>([]);

    const issueItemTableColumns =[
        {
            key: 1,
            title: 'Item Code',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rmObj = rawMaterials.find(rm => rm.id === value);
                return rmObj.item_code
            }
        },
        {
            key: 2,
            title: 'Item Name',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rmObj = rawMaterials.find(rm => rm.id === value);
                return rmObj.name
            }
        },
        {
            key: 3,
            title: 'Quantity',
            dataIndex: 'qty'
        },
        {
            key: 4,
            title: 'UOM',
            dataIndex: 'rm_id',
            render: (value: string) => {
                const rmObj = rawMaterials.find(rm => rm.id === value);
                return rmObj.uom.name
            }
        },
        {
            key: 5,
            title: 'Issued to',
            dataIndex: 'issued_to'
        },
        {
            key: 6,
            title: 'Option',
            dataIndex: 'rm_id',
            render: (value:string) => {
                return <Button type={'primary'} danger onClick={()=>{
                    setSelectedRawMaterials(prevState => {
                        return prevState.filter(rm => rm.rm_id !== value)
                    })
                }}>Remove</Button>
            }
        },
    ]

    useEffect(() => {
        batchService.getAllBatches()
            .then(data => {
                setBatches(data);
            })
            .catch(e => {
                console.log(e);
            })

        rmService.getAllRawMaterials()
            .then(data => {
                setRawMaterials(data);
            })
            .catch(e => {
                console.log(e);
            })

        otherUserService.getOutsideUsers(OutsideUserLevelEnum.EMPLOYEE)
            .then(data => {
                console.log('employee data', data)
                setOutsideEmployees(data);
            })
            .catch(e => {
                console.log(e);
            })
    }, []);

    const handleRmChange = (rmId:any) => {
        const rmObject = rawMaterials.find(rm => rm.id === rmId);
        rmForm.setFieldValue('uom', rmObject.uom.name);
        // rmForm.setFieldValue('availableQty', rmObject.)
    }

    const handleAddRmItem = (values: any) => {
        console.log('handleAddRmItem', values);
        setSelectedRawMaterials(prevState => {
            return prevState.concat([{rm_id: values.rmId, qty: values.issueQty, issued_to: values.issueTo}])
        })
    }

    const handleSubmit = () => {
        const {issueNo, batchNo} = issueForm.getFieldsValue();
        const payload = {
            addRMIssueDto: {batch_id: batchNo, issue_note_no: Number(issueNo)},
            rmIssueItems: selectedRawMaterials.map(rm => {
                console.log('rms in map', rm)
                return {
                    rm_id: rm.rm_id,
                    issue_to: rm.issued_to,
                    qty: rm.qty
                }
            })
        }

        issueService.addIssueNote(payload)
            .then(data => {
                console.log('data', data);
            })
            .catch(e => {
                console.log(e);
            })

    }

  return (
      <>
        <Breadcrumbs items={[{title: 'Home', href: '/'}, {title: 'Issue Items'}]}/>
        <Card title={'Issue Items'}>
          <Row>
            <Col span={12}>
                <Row>
                    <Col offset={6} span={12}>
                        <Form form={issueForm} layout={'vertical'}>
                            <Form.Item name={'issueNo'} label={'Issue No.'}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={'batchNo'} label={'Batch No.'}>
                                <Select options={batches.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}/>
                            </Form.Item>
                            {/*<Form.Item name={'issueNote'} label={'Issue Note No.'}>*/}
                            {/*    <Input/>*/}
                            {/*</Form.Item>*/}
                        </Form>
                    </Col>
                </Row>
            </Col>
          <Col span={12}>
              <div style={{borderLeft: 'solid', borderColor: '#E3E1D9', borderWidth: 1, paddingLeft: 15, paddingBottom: 20}}>
              <Row>
                  <Col offset={6} span={12}>
                    <Form form={rmForm} layout={'vertical'} onFinish={handleAddRmItem}>
                        <Form.Item name={'rmId'} label={'Raw Material'}>
                            <Select onChange={handleRmChange} options={rawMaterials.map(item => {
                                return {
                                    label: item.name,
                                    value: item.id
                                }
                            })}/>
                        </Form.Item>
                        {/*<Form.Item name={'availableQty'} label={'Available Qty.'}>*/}
                        {/*    <Input disabled={true}/>*/}
                        {/*</Form.Item>*/}
                        <Form.Item name={'uom'} label={'Unit of measure'}>
                            <Input disabled={true}/>
                        </Form.Item>
                        <Form.Item name={'issueQty'} label={'Issue Qty.'}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={'issueTo'} label={'Issue to'}>
                            <Select options={outsideEmployees.map(emp => ({value: emp.name, label: emp.name}))}/>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{float: 'right'}} type={'primary'} htmlType={'submit'}>Add</Button>
                        </Form.Item>
                    </Form>
                  </Col>
              </Row>
              <Row>
                  <Col span={24}>
                      <Table bordered columns={issueItemTableColumns} dataSource={selectedRawMaterials}/>
                  </Col>
              </Row>

              </div>
          </Col>
              <div style={{width: '100%', marginTop: 20}}>
                  <Button style={{float: "right", marginLeft: 15}} type={'primary'} onClick={handleSubmit}>Submit</Button>
                  <Button style={{float: "right"}}>Clear</Button>
              </div>
          </Row>
        </Card>
      </>
  )
}

export default IssueItem;