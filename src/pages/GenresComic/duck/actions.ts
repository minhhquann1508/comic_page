import { comicsService } from "../../../services/ComicService";
import { genresService } from "../../../services/GenresService";
import { Action } from "../../../types/type"
import { GET_COMICS_BY_GENRES, GET_GENRES, loading } from "./types"

const loadingAction = ():Action => {
    return {
        type:loading,
        payload:true
    }
};

export const getLstGenresAction = ():any => {
    return async (dispatch:any) => {
        try {
            const result = await genresService.getListGenres();
            if(result.status === 200) {
                dispatch({
                    type:GET_GENRES,
                    payload:result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getLstComicsByGenreAction = (type:string,page:number | 1):any => {
    return async (dispatch:any) => {
        await dispatch(loadingAction());
        try {
            const result = await comicsService.getComicByGenres(type,page);
            if(result.status === 200) {
                await dispatch({
                    type:GET_COMICS_BY_GENRES,
                    payload:result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}