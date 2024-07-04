import axios from "axios";

export class BatchService {

    createNewBatch = async (payload: any) =>{
        try {
            const res = await axios.post('/batch/add', {...payload});
            return res.data;

        }catch (e) {
            return Promise.reject(e);
        }
    }

    getAllBatches = async () => {
        try {
            const res = await axios.get('/batch/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}