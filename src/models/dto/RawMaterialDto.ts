

interface Uom {
    id: number;
    name: string;
}

interface RawMaterialCategory {
    id: number;
    name: string;
}

export interface RawMaterialDto {
    id: string,
    name: string,
    itemCode: string,
    description: string,
    reOrderLevel: string,
    reOrderQty: number,
    isInventory: boolean,
    rmCategoryId: number,
    uomId: number,
    supplier: string[],
    rmCategory: RawMaterialCategory,
    uom: Uom,

}