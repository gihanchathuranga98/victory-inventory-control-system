import axios from "axios";

class TaxService {
    getAllTaxTypes = async () => {
        try {
            const res = await axios.get('/tax/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}

export default TaxService;