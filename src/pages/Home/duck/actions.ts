import { comicsService } from "../../../services/ComicService"
import { Action } from "../../../types/type";
import { GET_RECOMMEND_COMICS, GET_TOP_COMICS, loading } from "./types";

const loadingAction = ():Action => {
    return {
        type:loading,
        payload:null
    }
}

export const getRecommendComicsAction = ():any => {
    return async (dispatch:any) => {
        await dispatch(loadingAction())
        try {
            let result = await comicsService.getRecommendComics();
            if(result.status === 200) {
                await dispatch({
                type:GET_RECOMMEND_COMICS,
                payload:result.data
            });
        }
        } catch (error) {
            console.log(error);
        }
    }
};

export const getTopComicsAction = (page?:number,status?:string):any => {
    return async (dispatch:any) => {
        await dispatch(loadingAction())
        try {
            let result = await comicsService.getTopComics(page,status);
            if(result.status === 200) {
                await dispatch({
                type:GET_TOP_COMICS,
                payload:result.data.comics
            });
        }
        } catch (error) {
            console.log(error);
        }
    }
};

