import { comicsService } from "../../../services/ComicService"
import { Action } from "../../../types/type";
import { GET_COMIC_DETAILS, loading } from "./types";

const loadingAction = ():Action => {
    return {
        type:loading,
        payload:null
    }
}

export const getComicsDetailAction = (id:string):any => {
    return async (dispatch:any) => {
        await dispatch(loadingAction())
        try {
            const result = await comicsService.getComicsDetail(id);
            if(result.status === 200) {
                await dispatch({
                    type:GET_COMIC_DETAILS,
                    payload:result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}