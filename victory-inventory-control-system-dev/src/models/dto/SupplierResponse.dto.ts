import {ContactsInterface} from "../interfaces/Contacts.interface";

export interface ContactResponseDto {
    id: string;
    name: string;
    email?: string;
    mobile?: string;
    telephone?: string;
    supplier_id: string;
}
export interface SupplierResponseDto {
    id?: string ;
    name: string;
    address: string;
    telephone?: string;
    fax?: string;
    br_number?: string;
    vat_reg_no?: string;
    contact: ContactResponseDto[];
}