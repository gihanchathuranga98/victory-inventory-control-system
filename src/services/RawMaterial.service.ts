import axios from "axios";
import {RawMaterialInterface} from "../models/interfaces/RawMaterial.interface";
import {MaterialTypeEnum} from "../enums/MaterialType.enum";

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

            const payload: {name: string, item_code: string, is_inventory: boolean, rm_category_id: number, uom_id: number, description?: string, re_order_level?: string, re_order_qty?: number} = {
                name: req.name,
                item_code: req.code,
                is_inventory: req.materialType === 0 ? true : false,
                rm_category_id: +req.categoryId,
                uom_id: +req.unitId,
                description: req.description,
                re_order_qty: req.reOrderQty ? +req.reOrderQty : 0,
                re_order_level: req.reOrderLevel
            }

            console.log('[addNewRawMaterial] [payload]', payload);

            const res = await axios.post('/raw-material/add', payload)
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getOneRawMaterial = async (id: string) => {
        try {
            const res = await axios.get(`/raw-material/${id}`);
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }
}

export default RawMaterialService;