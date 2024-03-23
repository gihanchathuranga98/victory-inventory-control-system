import {Form, Input, Modal, Radio, Select} from "antd";
import {BaseModalPropsInterface} from "../../models/interfaces/BaseModalProps.interface";
import {useState} from "react";

interface AddNewRawMaterialProps extends BaseModalPropsInterface{
    onOk?: (data: any)=>void;
    onCancel: ()=>void;
    open: boolean
}

const AddNewRawMaterial = ({onOk, onCancel, open}: AddNewRawMaterialProps) => {

    const [rmCategories, setRmCategories] = useState([
        {
            value: '1',
            label: 'Wool'
        },
        {
            value: '2',
            label: 'Glue'
        }
    ]);

    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields([['name']]);
        onCancel();
    }

    const unitOptions = [
        {
            value: 'KG',
            label: 'Kilogram'
        },
        {
            value: 'M',
            label: 'Meter'
        }
    ]

    const {TextArea} = Input;

    return (
        <>
            <Modal title={'Add New Raw Material'} onCancel={handleCancel} onOk={onOk} open={open}>
                <Form form={form} layout={'vertical'}>
                    <Form.Item label={'RM Category'}>
                        <Select
                        showSearch={true}
                        options={rmCategories}
                        />
                    </Form.Item>
                    <Form.Item label={'Item Code'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'name'} label={'Item Name'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Description'}>
                        <TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item label={'Unit'}>
                        <Select options={unitOptions}/>
                    </Form.Item>
                    <Form.Item label={'Re-Order Level'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Re-Order Qty'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'Material Type'}>
                        <Radio.Group buttonStyle={'solid'} defaultValue={1}>
                            <Radio.Button value={1}>Inventory</Radio.Button>
                            <Radio.Button value={0}>Non-Inventory</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddNewRawMaterial;