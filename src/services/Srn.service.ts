import {throws} from "assert";
import axios from "axios";

export class SrnService {

    createNewSrn = async (payload:any) => {
        try {
            const res = await axios.post('/srn/add', {...payload})
            return res.data;
        }catch (e) {
            throw e;
        }
    }
}