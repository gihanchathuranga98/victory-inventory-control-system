import axios from "axios";

export  class CustomerService {

    getAllCustomers = async () => {
        try {
            const res = await axios.get('/customer/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }
}