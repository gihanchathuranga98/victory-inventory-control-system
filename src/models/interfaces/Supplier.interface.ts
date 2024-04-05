import {ContactsInterface} from "./Contacts.interface";

export interface SupplierInterface {
    id?: string;
    name: string;
    address: string;
    tel?: string;
    fax?: string;
    brNo?: string;
    vatRegNo?: string;
    contacts?: ContactsInterface[];
}