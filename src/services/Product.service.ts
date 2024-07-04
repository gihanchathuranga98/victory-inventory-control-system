import axios from "axios";

export class ProductService {

    getAllProductCategories = async () => {
        try {
            const res = await axios.get('/product/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getAllProductSubCategories = async (id: number) => {
        try {
            const res = await axios.get(`/product/allSubCategories/${id}`);
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    createNewProduct = async (payload: any) => {
        try {
            const res = await axios.post('/product/add', {...payload})
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }
}