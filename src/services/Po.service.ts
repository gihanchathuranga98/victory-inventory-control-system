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
            const res = await axios.post('/po/add-v2', {...payload});
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}