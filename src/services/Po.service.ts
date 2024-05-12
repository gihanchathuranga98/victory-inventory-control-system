import axios from "axios";
import {PoDto} from "../models/dto/Po.dto";

export class PoService {
    getAllPOs = async () => {
        try {
            const res = await axios.get('/po/all')
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    createNewPO = async (payload: PoDto) => {
        try {
            const reqPayload = {
                supplier_id: payload.supplierId,
                special_note: payload.specialComment,
                delivery_location: payload.deliveryLocation,
                currency: 'LKR',
                state: '',
                discount_type: payload.discountType,
                discount: payload.discount,
                items: payload.poItem
            }
            const res = await axios.post('/po/add', {...reqPayload});
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}