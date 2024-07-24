import {GrnItemDto} from "./GrnItem.dto";

interface GrnDto {
    grn_no: string;
    comment: string;
    supplier_inv_no: string;
    po_id: string;
    discount_type: string;
    tax_type: number[];
    discount: number;
    items: GrnItemDto[];
}

export default GrnDto;