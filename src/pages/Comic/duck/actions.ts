import { comicsService } from "../../../services/ComicService";
import { Action } from "../../../types/type";
import { GET_SINGLE_CHAPTER_COMICS, loading } from "./types";

const loadingAction = ():Action => {
    return {
        type:loading,
        payload:true
    }
}

export const getChapterImageAction = (idComic:string,idChapter:number):any => {
    return async (dispatch:any) => {
        dispatch(loadingAction())
        try {
            const result = await comicsService.getSingleComicsChapter(idComic,idChapter);
            if(result.status === 200) {
                dispatch({
                    type: GET_SINGLE_CHAPTER_COMICS,
                    payload: result.data 
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}