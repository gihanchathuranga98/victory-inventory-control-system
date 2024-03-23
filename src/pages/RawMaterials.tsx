import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Button, Card, Form, Table} from "antd";
import Input from "../components/Input/Input";
import AddNewRawMaterial from "../components/modals/AddNewRawMaterial";
import {useState} from "react";

const RawMaterials = () => {

    const [addNewRmModal, setAddNewRmModal] = useState<boolean>(false)

    const columns = [
        {
            title: 'Item Code',
            dataIndex: 'item_code',
            key: 'item_code'
        },
        {
            title: 'RM Name',
            dataIndex: 'rm_name',
            key: 'rm_name'
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id'
        }
    ]

    return (
        <>
            <Breadcrumb items={[{title: 'Home', href: '#'}, {title: 'Raw Materials'}]}/>
            <Card title={'Raw Materials'}>
                <Form style={{float: "right", marginBottom: 15}} layout={'inline'}>
                    <Form.Item><Button type={'primary'}>Export</Button></Form.Item>
                    <Form.Item><Button type={'primary'}>Print</Button></Form.Item>
                    <Form.Item><Button onClick={()=>{setAddNewRmModal(true)}} type={'primary'}>Add New RM</Button></Form.Item>
                </Form>
                <Table bordered columns={columns}/>
            </Card>
            <AddNewRawMaterial onCancel={() => {setAddNewRmModal(false)}} open={addNewRmModal}/>
        </>
    )
}

export default RawMaterials;