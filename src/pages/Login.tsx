import {Button, Col, Form, Input, Row, Typography} from "antd";
import Card from "../components/Card/Card";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

const Login:React.FC = () => {

    const {isLoggedIn, setLogin} = useContext(AuthContext)
    const {Password} = Input;
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {Title} = Typography;

    const handleFinish = async ({username, password}:any) => {
        form.resetFields();
        setLogin && setLogin(true);
        // await axios.post('/auth', {username, password})
        //     .then(data => {
        //
        //     })
        //     .catch(err => {
        //
        //     })
    }

    return (
        <>
            <Row style={{display: "flex", justifyContent: "center"}}>
                <Col style={{marginTop: '20vh'}} span={7} className={''}>
                    <Card bordered={true} subTitle={'Please enter your credentials'} title={'USER LOGIN'}>
                        <Form form={form} layout={'vertical'} onFinish={handleFinish}>
                            <Form.Item name={'username'} label={'Username'} rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={'password'} label={'Password'} rules={[{required: true}]}>
                                <Password/>
                            </Form.Item>
                            <Form.Item style={{justifyContent: "center", display: 'flex'}}>
                                <Button htmlType={'submit'} loading={isLoading} style={{paddingLeft: 55, paddingRight: 55}} type={'primary'}>Login</Button>
                            </Form.Item>
                        </Form>
                    </Card>

                </Col>
            </Row>
        </>
    )
}

export default Login;