import {Form, Input, Modal, Radio, Select} from "antd";
import {BaseModalPropsInterface} from "../../models/interfaces/BaseModalProps.interface";
import {useState} from "react";
import {MaterialTypeEnum} from "../../enums/MaterialType.enum";
import {RawMaterialInterface} from "../../models/interfaces/RawMaterial.interface";


interface AddNewRawMaterialProps extends BaseModalPropsInterface{
    onOk?: (data: RawMaterialInterface)=>void;
    onCancel: ()=>void;
    open: boolean,
    rawmCategories: any[],
    uom: any[]
}

const AddNewRawMaterial = ({onOk, onCancel, open, rawmCategories, uom}: AddNewRawMaterialProps) => {

    const [rmCategories, setRmCategories] = useState([
        {
            value: 1,
            label: 'Wool'
        },
        {
            value: 2,
            label: 'Glue'
        }
    ]);

    const [form] = Form.useForm();

    const handleCancel = async () => {
        form.resetFields();
        onCancel();
    }

    const unitOptions = [
        {
            value: 1,
            label: 'Kilogram'
        },
        {
            value: 2,
            label: 'Meter'
        }
    ]

    const {TextArea} = Input;

    const handleOk = () => {
        const {name, description, code, unitId, categoryId, reOrderLevel, reOrderQty, materialType} = form.getFieldsValue();
        if (onOk) {
            console.log('in OK==> ', {name, description, code, unitId, categoryId, reOrderLevel, reOrderQty, materialType})
            onOk({name, description, code, unitId, categoryId, reOrderLevel, reOrderQty, materialType});
        }
        form.resetFields();
    }

    return (
        <>
            <Modal title={'Add New Raw Material'} onCancel={handleCancel} onOk={handleOk} open={open}>
                <Form form={form} layout={'vertical'}>
                    <Form.Item name={'categoryId'} label={'RM Category'}>
                        <Select
                        showSearch={true}
                        options={rawmCategories.map(rm => {
                            return {
                                label: rm.name,
                                value: rm.id
                            }
                        })}
                        />
                    </Form.Item>
                    <Form.Item name={'code'} label={'Item Code'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'name'} label={'Item Name'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'description'} label={'Description'}>
                        <TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item name={'unitId'} label={'Unit'}>
                        <Select options={uom.map(u => {
                            return {label: u.name, value: u.id}
                        })}/>
                    </Form.Item>
                    <Form.Item name={'reOrderLevel'} label={'Re-Order Level'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'reOrderQty'} label={'Re-Order Qty'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'materialType'} label={'Material Type'}>
                        <Radio.Group buttonStyle={'solid'} defaultValue={1}>
                            <Radio.Button value={MaterialTypeEnum.INVENTORY}>Inventory</Radio.Button>
                            <Radio.Button value={MaterialTypeEnum.NON_INVENTORY}>Non-Inventory</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddNewRawMaterial;