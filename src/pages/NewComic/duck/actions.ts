import { comicsService } from "../../../services/ComicService";
import { Action } from "../../../types/type";
import { GET_LST_NEW_COMIC, loading } from "./type";

const loadingAction = ():Action => {
    return {
        type:loading,
        payload:null
    }
};

export const getListNewComicAction = (page:number = 1,status:string = 'all'):any => {
    return async (dispatch:any) => {
        await dispatch(loadingAction());
        try {
            let result = await comicsService.getNewComic(page,status);
            if(result.status === 200) {
                dispatch({
                    type:GET_LST_NEW_COMIC,
                    payload:result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
