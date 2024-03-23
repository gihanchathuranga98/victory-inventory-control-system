import {Form, Input, Modal, Select} from "antd";

interface AddNewPrnItemProps {
    open: boolean;
    onOk: (data: any)=>void;
    onCancel: () => void
}

const AddNewPrnItem = ({open, onOk, onCancel}: AddNewPrnItemProps) => {

    const [form] = Form.useForm()

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

    const handleOk = async (values:any) => {
        // @ts-ignore
        console.log('values', form.getFieldsValue(()=>{ return nameList}))
    }

    return (
        <>
            <Modal onOk={handleOk} open={open} onCancel={onCancel} title={'Add New PRN Item'}>
                <Form form={form} layout={'vertical'}>
                    <Form.Item name={'item'} label={'Item Name'}>
                        <Select options={itemOptions}/>
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