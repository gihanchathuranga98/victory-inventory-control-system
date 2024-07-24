import {DiscountTypeEnum} from "../../enums/DiscountTypeEnum";

export interface PoDto {
    po_no: string | null;
    supplier_id: string;
    special_note?: string,
    delivery_location: string,
    currency?: string,
    discount_type: string,
    tax_type: number[],
    discount?: number,
    contact_person: string,
    items: PoItemDto[];
}

interface PoItemDto {
    rm_id: string,
    qty: number,
    price_per_unit: number,
    prn_item_id: string
}
