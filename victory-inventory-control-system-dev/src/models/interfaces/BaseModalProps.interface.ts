export interface BaseModalPropsInterface {
    onCancel: ()=> void;
    open: boolean;
    onOk?: (data: any)=>void;
    data?: any;
}