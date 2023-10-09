import axios from "axios"
import { DOMAIN_API } from "../utils/constant"
export class BaseService {
    get = (uri:string) => {
        return axios({
            method: "GET",
            url:`${DOMAIN_API}/${uri}`
        });
    };
    post = (uri:string,model:any) => {
        return axios({
            method: "POST",
            url:`${DOMAIN_API}/${uri}`,
            data:model
        });
    };
    put = (uri:string,model:any) => {
        return axios({
            method: "PUT",
            url:`${DOMAIN_API}/${uri}`,
            data:model
        });
    };
    delete = (uri:string) => {
        return axios({
            method: "DELETE",
            url:`${DOMAIN_API}/${uri}`,
        });
    };
}