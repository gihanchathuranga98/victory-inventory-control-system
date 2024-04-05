import {Form, Input as NewInput} from "antd";

interface InputProps {
    label?: string;
    name?: string;
    rules?: any[];
    disabled?: boolean;
    width?: string | number;
    value?: string | number;
    defaultValue?: string | number;
    id?: string;
    initialValue?: string | number;
}
const Input = ({label, name, rules, disabled=false, width, value, defaultValue, id, initialValue=''}: InputProps) => {

    return (
            <Form.Item id={id} label={label} name={name} rules={rules}>
                <NewInput value={value} defaultValue={defaultValue} disabled={disabled}/>
            </Form.Item>
    )
}

export default Input;