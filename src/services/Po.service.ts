import axios from "axios";

export class PoService {
    getAllPOs = async () => {
        try {
            const res = await axios.get('/po/all')
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}