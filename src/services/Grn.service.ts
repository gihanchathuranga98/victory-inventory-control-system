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

}

export default GrnService;