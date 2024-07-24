import {Breadcrumb as NewBreadcrumb, Card} from "antd";

interface BreadcrumbProps {
    items: any[];
}
const Breadcrumbs = ({items}: BreadcrumbProps) => {

    return (
        <Card size={'small'} style={{margin: 0, marginBottom: 5}}>
            <NewBreadcrumb separator={'>'} items={items}/>
        </Card>
    )
}

export default Breadcrumbs;