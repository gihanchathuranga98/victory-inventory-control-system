import {DiscountTypeEnum} from "../../enums/DiscountTypeEnum";

export interface PoDto {
    prnId: string;
    supplierId: string;
    specialComment: string;
    deliveryLocation: string;
    contactPerson: string;
    supplierComment: string;
    discount: number | string;
    discountType: DiscountTypeEnum;
    taxId: string[];
    poItem: any[];
}

interface PoItemDto {
    id?:string;
    poId?: string;
    rmId: string;
    qty: string | number;
    pricePerUnit?: string | number;
    prnItemId?: string;
}
