import axios from "axios";
import GrnDto from "../models/dto/Grn.dto";

class GrnService {

    createNewGrn = async (payload: GrnDto) => {
        try {
            const res = await axios.post('/grn/add', {...payload});
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getGrnBuId = async (id: string) => {
        try {
            const res = await axios.get(`/grn/${id}`);
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    getAllGrns = async () => {
        try {
            const res = await axios.get('/grn/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getNextId = async (): Promise<number> => {
        try {
            const res = await axios.get('/grn/next/id');
            return res.data.newId;
        } catch (e) {
            throw e;
        }
    }

}

export default GrnService;