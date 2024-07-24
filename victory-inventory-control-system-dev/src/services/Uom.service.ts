import axios from "axios";

export class UomService {

    getAllUoms = async () => {
        try {
            const res = await axios.get('uom/all')
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}