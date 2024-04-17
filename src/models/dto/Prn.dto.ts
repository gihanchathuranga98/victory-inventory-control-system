export interface PrnItemDto {
    prnItemId: string;
    qty: string;
    orderedQty: string;
    estimatedPricePerUnit: string;
    prnId: string;
    rmId: string;
    rmCode?: string;
    rmName?: string;
}

export interface PrnDto {
    id: string,
    prNo: string,
    requestedBy: string,
    remark: string
    approvedBy: string
    priorityId: number,
    prnItem: PrnItemDto[]

}