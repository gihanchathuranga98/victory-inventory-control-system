import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {Card} from "antd";

const Dashboard = () => {
    return(
        <>
            <Breadcrumb items={[{title: 'Dashboard'}]}/>
            <Card title={'Dashboard'}></Card>
        </>
    )
}

export default Dashboard;