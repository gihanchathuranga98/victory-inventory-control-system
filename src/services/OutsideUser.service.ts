import axios from "axios";
import {OutsideUserLevelEnum} from "../enums/OutsideUserLevel.enum";
class OutsideUserService {

    baseUrl = 'http://173.249.48.198:8078/api';
    getOutsideUsers = async (userLevel: OutsideUserLevelEnum) => {
        try {
            let getUsersUrl: string;

            switch (userLevel){
                case OutsideUserLevelEnum.EMPLOYEE:
                    getUsersUrl = `${this.baseUrl}/employee/getEmployees`;
                    break;

                case OutsideUserLevelEnum.SUPERVISOR:
                    getUsersUrl = `${this.baseUrl}`;
                    break
            }

            const headers = {
                "APIKey": "EC0D2C80-3FD1-41B4-A01B-29152055267D"
            }

            const res = await axios.get(getUsersUrl, {headers: headers});
            return res.data;
        }catch (e) {
            return Promise.reject(e);
        }
    }
}

export default OutsideUserService;