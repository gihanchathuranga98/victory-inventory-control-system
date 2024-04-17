import {Button, Col, Form, Input, notification, Row, Typography} from "antd";
import Card from "../components/Card/Card";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import AuthService from "../services/Auth.service";
import {AlertContext} from "../context/AlertContext";

const Login:React.FC = () => {

    const {isLoggedIn, setLogin} = useContext(AuthContext)
    const {success, info, warning, error} = useContext(AlertContext)

    const {Password} = Input;
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {Title} = Typography;

    const authService = new AuthService();

    const handleFinish = ({username, password}:any) => {
        authService.login(username, password)
            .then(data => {
                localStorage.setItem('fName', data.fname)
                localStorage.setItem('lName', data.lname)
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setLogin(true, data.accessToken, data.refreshToken);
            })
            .catch( err =>{
                console.log('error in login', err)
                error('Login Faild', 'Please check your credentials and try again')
            })
    }

    return (
        <>
            <Row style={{display: "flex", justifyContent: "center"}}>
                <Col style={{marginTop: '20vh'}} span={7} className={''}>
                    <Card bordered={true} subTitle={'Please enter your credentials'} title={'USER LOGIN'}>
                        <Form form={form} layout={'vertical'} onFinish={handleFinish}>
                            <Form.Item initialValue={'denam98'} name={'username'} label={'Username'} rules={[{required: true}]}>
                                <Input defaultValue={'denam98'}/>
                            </Form.Item>
                            <Form.Item name={'password'} initialValue={'123abc'} label={'Password'} rules={[{required: true}]}>
                                <Password defaultValue={'123abc'}/>
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