export interface PrnItemResponseDto {
    id: string;
    qty: string;
    ordered_qty: string;
    estimated_price_per_unit: string;
    prn_id: string;
    rm_id: string;
}

export interface PrnResponseDto {
    id: string,
    prn_no: string,
    requested_by: string,
    remark: string
    approved_by: string
    priority_id: number,
    prn_item: PrnItemResponseDto[]

}