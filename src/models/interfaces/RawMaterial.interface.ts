import {MaterialTypeEnum} from "../../enums/MaterialType.enum";

export interface RawMaterialInterface {
    id?: string;
    name: string;
    code: string;
    categoryId: string;
    description?: string;
    unitId: string;
    reOrderLevel?: string;
    reOrderQty?: number;
    materialType: MaterialTypeEnum
}