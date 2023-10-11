import { comicsService } from "../../../services/ComicService";
import { Action } from "../../../types/type";
import { GET_LST_TOP_COMIC, loading } from "./types";

const loadingAction = ():Action => {
    return {
        type:loading,
        payload:null
    }
};

export const getLstTopComicAction = (type:string,page:number,status:string):any => {
    return async (dispatch:any) => {
        await dispatch(loadingAction());
        try {
            const result = await comicsService.getTopComicByType(type,page,status);
            if(result.status === 200) {
                dispatch({
                    type:GET_LST_TOP_COMIC,
                    payload:result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}