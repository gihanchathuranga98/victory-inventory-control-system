import { Form } from "antd"
import NewPassword from "antd/es/input/Password";

interface PasswordProps {
    label?: string;
    name?: string;
    rules?: any[];
}
const Password = ({label, name, rules}:PasswordProps) => {

    return (
        <Form.Item label={label} name={name} rules={rules}>
            <NewPassword style={{backgroundColor: '#EEEDEB'}}/>
        </Form.Item>
    )
}

export default Password;