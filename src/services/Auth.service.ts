import axios from "axios";

class AuthService {
    login = async (username: string, password: string) => {

        try {
            const res = await axios.post('/auth/authenticate', {username, password})
            return res.data;
        }catch (e){
            return Promise.reject(e);
        }
    }

    refreshToken = async (refreshToken: string) => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${refreshToken}`
                }
            }

            const res = await axios.post('/auth/refresh', {refresh: refreshToken}, config)
            return res.data;
        }catch (e){
            return Promise.reject(e);
        }
    }
}

export default  AuthService;