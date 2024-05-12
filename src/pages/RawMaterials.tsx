import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Form, Modal, Table} from "antd";
import Input from "../components/Input/Input";
import AddNewRawMaterial from "../components/modals/AddNewRawMaterial";
import {useContext, useEffect, useState} from "react";
import RawMaterialService from "../services/RawMaterial.service";
import {AlertContext} from "../context/AlertContext";
import {RawMaterialInterface} from "../models/interfaces/RawMaterial.interface";

const RawMaterials = () => {

    const rawMaterialService = new RawMaterialService();

    const {error, success} = useContext(AlertContext);
    const {confirm} = Modal;

    const [addNewRmModal, setAddNewRmModal] = useState<boolean>(false);
    const [rawMaterials, setRawMaterials] = useState<any[]>([])

    useEffect(() => {
        loadRawMaterials();
    }, []);

    const loadRawMaterials = () => {
        rawMaterialService.getAllRawMaterials()
            .then(data => {
                setRawMaterials(data);
            })
            .catch(err => {
            })
    }

    const columns = [
        {
            title: 'Item Code',
            dataIndex: 'item_code',
            key: 'item_code'
        },
        {
            title: 'RM Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value: string) => {
                return (
                    <Button onClick={()=>{handleRmDelete(value)}} danger type={'primary'}>Remove</Button>
                )
            }
        }
    ]

    const handleAddRm = async (materialData: RawMaterialInterface) => {
        console.log('handleAddRm ==> ', materialData)
        rawMaterialService.addNewRawMaterial(materialData)
            .then(data => {
                success('Successfully Added', 'Raw Material Added Successfully')
                setAddNewRmModal(false);
            })
            .catch(err => {
                error('Failed', 'Raw Material Adding Failed')
            })
            .finally(()=> {
                loadRawMaterials();
            })
    }

    const handleRmDelete = (id: string) => {

        confirm({
            okText: 'Remove',
            okType: 'danger',
            title: 'Are You Sure..?',
            content: 'Do you need to delete this raw material?',
            onOk: (): void => {
                rawMaterialService.deleteRawMaterial(id)
                    .then(data => {
                        success('Successfully Removed', 'Material removed successfully');
                    })
                    .catch(err => {
                        error('Removal Failed', 'Material removal failed unexpectedly');
                    })
                    .finally(()=>{
                        loadRawMaterials();
                    })
            }
        })


    }

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'Raw Materials'}]}/>
            <Card title={'Raw Materials'}>
                <Form style={{float: "right", marginBottom: 15}} layout={'inline'}>
                    <Form.Item><Button type={'primary'}>Export</Button></Form.Item>
                    <Form.Item><Button type={'primary'}>Print</Button></Form.Item>
                    <Form.Item><Button onClick={()=>{setAddNewRmModal(true)}} type={'primary'}>Add New RM</Button></Form.Item>
                </Form>
                <Table bordered dataSource={rawMaterials} columns={columns}/>
            </Card>
            <AddNewRawMaterial onOk={handleAddRm} onCancel={() => {setAddNewRmModal(false)}} open={addNewRmModal}/>
        </>
    )
}

export default RawMaterials;