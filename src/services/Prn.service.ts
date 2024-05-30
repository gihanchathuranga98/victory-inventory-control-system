import axios from "axios";
import {PrnItemResponseDto, PrnResponseDto} from "../models/dto/PrnResponse.dto";
import {PrnDto} from "../models/dto/Prn.dto";

export class PrnService {
    getAllPRNs = async (): Promise<PrnDto[]> => {
        try {
            const res: PrnResponseDto[] = (await axios.get('prn/all')).data;

            return res.map(prn => {
                return {
                    id: prn.id,
                    prNo: prn.prn_no,
                    requestedBy: prn.requested_by,
                    approvedBy: prn.approved_by,
                    remark: prn.remark,
                    priorityId: prn.priority_id,
                    prnItem: prn.prn_item.map((item: PrnItemResponseDto) => {
                        return {
                            prnItemId: item.id,
                            qty: item.qty,
                            orderedQty: item.ordered_qty,
                            estimatedPricePerUnit: item.estimated_price_per_unit,
                            prnId: item.prn_id,
                            rmId: item.rm_id

                        }
                    })
                }
            })
        }catch (e){
            return Promise.reject(e);
        }
    }

    createPrn = async (prn: any) => {
        try {
            const res = await axios.post('/prn/add', {...prn});
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }

    getPrn = async (prnId: string) => {
        try {
            const res = await axios.get(`/prn/${prnId}`)
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}
