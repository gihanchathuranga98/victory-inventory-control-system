import axios from "axios";

export class IssueService {
    addIssueNote = async (payload: any) => {
        try {
            const res = await axios.post('/rm-issue/add', {...payload})
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}