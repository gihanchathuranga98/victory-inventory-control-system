import {Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import RawMaterialService from "../../services/RawMaterial.service";
import {RawMaterialInterface} from "../../models/interfaces/RawMaterial.interface";

interface AddNewPrnItemProps {
    open: boolean;
    onOk: (data: {item: string, qty: number})=>void;
    onCancel: () => void
}

const AddNewPrnItem = ({open, onOk, onCancel}: AddNewPrnItemProps) => {

    const [form] = Form.useForm()

    const rawMaterialService = new RawMaterialService();
    const [rawMaterials, setRawMaterials] = useState<{value: string, label: string}[]>([]);

    useEffect(() => {
        rawMaterialService.getAllRawMaterials()
            .then(data => {
                setRawMaterials(prevState => {
                    return data.map((rm:any) => {
                        return {
                            value: rm.id,
                            label: `${rm.item_code} - ${rm.name}`
                        }
                    })
                })
            })
            .catch(e => {

            })
    }, []);

    const itemOptions = [
        {
            value: 'wool',
            label: 'Wool'
        },
        {
            value: 'threads',
            label: 'Threads'
        }
    ]

    const handleOk = async () => {
        const {item, qty} = form.getFieldsValue()
        onOk({item, qty});
    }

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    }

    return (
        <>
            <Modal onOk={handleOk} open={open} onCancel={handleCancel} title={'Add New PRN Item'}>
                <Form form={form} layout={'vertical'}>
                    <Form.Item name={'item'} label={'Item Name'}>
                        <Select filterOption={(input, option?)=>{
                            if(option){
                                return option.label.toLowerCase().includes(input.toLowerCase())
                            }else {
                                return true;
                            }
                        }} showSearch={true} options={rawMaterials}/>
                    </Form.Item>
                    <Form.Item name={'qty'} label={'Quantity'}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddNewPrnItem;