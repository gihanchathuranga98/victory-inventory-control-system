import axios from "axios";

export class ProductService {

    getAllProductCategories = async () => {
        try {
            const res = await axios.get('/product/categories/all');
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getAllProductSubCategories = async (id?: number) => {
        try {
            const res = await axios.get(`/product/sub_categories/all`);
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

    createNewCategory = async (payload:any) => {
        try {
            const res = await axios.post('/product/categories/add', {...payload})
            return res.data;
        }catch (e) {
            throw e;
        }
    }

    removeCategory = async (id: any) => {
        try {
            const res = await axios.put(`/product/categories/delete/${id}`)
            return res.data;
        }catch (e) {
            throw e;
        }
    }

    removeSubCategory = async (id: any) => {
        try {
            const res = await axios.put(`/product/subcategories/delete/${id}`)
            return res.data;
        }catch (e) {
            throw e;
        }
    }

    createNewSubCategory = async (payload:any) =>{
        try{
            const res = await axios.post('/product/sub_categories/add', {...payload})
            return res.data;
        }catch (e) {
            throw e;
        }
    }
}