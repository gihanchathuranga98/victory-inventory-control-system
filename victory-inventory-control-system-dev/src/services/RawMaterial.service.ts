import axios from "axios";
import {RawMaterialInterface} from "../models/interfaces/RawMaterial.interface";
import {MaterialTypeEnum} from "../enums/MaterialType.enum";
import {RawMaterialDto} from "../models/dto/RawMaterialDto";

class RawMaterialService {
    getAllRawMaterials = async () => {
        try {
            const res = await axios.get('/raw-material/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    deleteRawMaterial = async (id: string) => {
        try {
            const res = await axios.delete(`/raw-material/${id}`);
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    addNewRawMaterial = async (req: RawMaterialInterface) => {
        try {

            console.log('[addNewRawMaterial] [req]', req)

            const payload: {name: string, item_code: string, is_inventory: boolean, rm_category_id: number, uom_id: number, description?: string, re_order_level?: string, re_order_qty?: number, is_active: boolean} = {
                name: req.name,
                item_code: req.code,
                is_inventory: req.materialType === 0 ? true : false,
                rm_category_id: +req.categoryId,
                uom_id: +req.unitId,
                description: req.description,
                re_order_qty: req.reOrderQty ? +req.reOrderQty : 0,
                re_order_level: req.reOrderLevel,
                is_active: true
            }

            console.log('[addNewRawMaterial] [payload]', payload);

            const res = await axios.post('/raw-material/add', payload)
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getOneRawMaterial = async (id: string): Promise<RawMaterialDto> => {
        try {
            const res = (await axios.get(`/raw-material/${id}`)).data;
            return  {
                id: res.id,
                name: res.name,
                itemCode: res.item_code,
                description: res.description,
                reOrderLevel: res.re_order_level,
                reOrderQty: res.re_order_qty,
                isInventory: res.is_inventory,
                rmCategoryId: res.rm_category_id,
                uomId: res.uom_id,
                supplier: res.supplier,
                rmCategory: res.rm_category,
                uom: res.uom,
            }
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getRawMaterials = async (rmIds: string[]) => {
        try {
            const res = await axios.post('/raw-material/list', rmIds);
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getAllRMCategories = async () => {
        try {
            const res = await axios.get('/raw-material/categories/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    addNewRMCategory = async (name: string) => {
        try {
            const res = await axios.post('/raw-material/add-category', {name})
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    removeRMCategory = async (id: string) => {
        try {
            const res = await axios.delete(`/raw-material/category/${id}`)
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }
}

export default RawMaterialService;