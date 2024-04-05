import React, {ReactNode, ReactPropTypes} from "react";
import {Card as NewCard, Typography} from "antd";
import {CardSize} from "antd/es/card/Card";
import './Card.css'

interface CardProps {
    children?: ReactNode;
    title?: string;
    className?: string;
    bordered?: boolean;
    size?: CardSize;
    subTitle?: string;
}

const Card = ({children, title, className, bordered=true, size='small', subTitle}:CardProps) => {

    const {Title, Text} = Typography;

    return (
        <>
            <NewCard style={{padding: 15}} size={size} className={className} bordered={bordered}>
                <div style={{textAlign: "center"}}>
                    {title && <Title level={3} style={{marginBottom: '10px'}} className={'card-middle-title'}>{title}</Title>}
                    {subTitle && <Text style={{marginBottom: '20px'}} className={'card-middle-subtitle'}>{subTitle}</Text>}
                </div>
                {children}
            </NewCard>
        </>
    )
}

export default Card;