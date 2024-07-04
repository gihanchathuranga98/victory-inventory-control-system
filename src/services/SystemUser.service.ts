import axios from "axios";

class SystemUserService {

    getAllSystemUsers = async () => {
        try {
            const res = await axios.get('/user/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}

export default SystemUserService;