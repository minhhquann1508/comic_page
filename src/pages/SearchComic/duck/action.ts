import { comicsService } from "../../../services/ComicService";
import { Action } from "../../../types/type";
import { GET_LST_COMIC_BY_KEYWORD, loading } from "./types";

const loadingAction = ():Action => {
    return {
        type:loading,
        payload:null
    }
};

export const getLstComicByKeywordAction = (keyword:string,page:number):any => {
    return async (dispatch:any) => {
        await dispatch(loadingAction());
        try {
            const result = await comicsService.getComicByKeyword(keyword,page || 1);
            if(result.status === 200) {
                await dispatch({
                    type:GET_LST_COMIC_BY_KEYWORD,
                    payload:result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}