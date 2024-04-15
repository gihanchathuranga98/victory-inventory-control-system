import axios from "axios";
import {SupplierInterface} from "../models/interfaces/Supplier.interface";
import {SupplierResponseDto} from "../models/dto/SupplierResponse.dto";

class SupplierService {
    getNewSupplierId = async () => {
        try {
            const res = await axios.get('/supplier/id')
            return res.data;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    createNewSupplier = async (supplier: SupplierInterface) => {
        try {

            const payload = {
                addSupplierDto: {
                    name: supplier.name,
                    br_number: supplier.brNo,
                    vat_reg_no: supplier.vatRegNo,
                    telephone: supplier.tel,
                    fax: supplier.fax,
                    address: supplier.address
                },
                supplierContacts: supplier.contacts?.map(contact => {
                    return {
                        telephone: contact.tel,
                        email: contact.email,
                        mobile: contact.mobile,
                        name: contact.name,
                    }
                })
            }

            const res = await axios.post('/supplier/add', payload);
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    getAllSuppliers = async () => {
        try {
            const res = await axios.get('/supplier/all')
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    deleteSupplier = async (id: string) => {
        try {
            const res = await axios.delete(`/supplier/${id}`);
            return res.data;
        }catch (e) {
            return Promise.reject(e)
        }
    }

    getSupplier = async (id: string): Promise<SupplierResponseDto> => {
        try {
            const res = await axios.get(`/supplier/${id}`)
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    updateSupplier = async (id: string, supplier: SupplierInterface) => {
        try {

            const supplierPayload = {
                name: supplier.name,
                br_number: supplier.brNo,
                address: supplier.address,
                vat_reg_no: supplier.vatRegNo,
                fax: supplier.fax,
                telephone: supplier.tel
            }

            const contactPayload = supplier.contacts?.map(cntct => {
                return {
                    id: cntct.id ? cntct.id : null,
                    name: cntct.name,
                    mobile: cntct.mobile,
                    telephone: cntct.tel
                }
            })

            const updateSupplierPromise = new Promise((resolve, reject) => {
                axios.put(`/supplier/${id}`, {...supplierPayload})
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(e => {
                        reject(e);
                    })
            })

            const updateContactsPromise = new Promise((resolve, reject) => {
                axios.put(`/supplier/contacts/${id}`, contactPayload)
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(e => {
                        reject(e);
                    })
            })

            const res = await Promise.all([updateSupplierPromise, updateContactsPromise]);
            return res;

        }catch (e) {
            return Promise.reject(e)
        }
    }
}

export default SupplierService;