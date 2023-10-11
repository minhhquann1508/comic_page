import { Action } from "../../../types/type"
import { GET_RECOMMEND_COMICS, GET_TOP_COMICS, loading } from "./types"

const initialState:{lstRecommendComics:any[] | null ,lstTopComics:any[] | null,loading:boolean} = {
    lstRecommendComics:null,
    lstTopComics:null,
    loading:false
}

export const homeReducer = (state = initialState, action:Action) => {
    switch (action.type) {
        case loading: {
            state.loading = true;
            state.lstRecommendComics = null;
            state.lstTopComics = null;
            return { ...state };
        }
        case GET_RECOMMEND_COMICS: {
            state.loading = false;
            state.lstRecommendComics = action.payload;
            return { ...state };
        };
        case GET_TOP_COMICS: {
            state.loading = false;
            state.lstTopComics = action.payload;
            return { ...state };
        }
        default: {
            return { ...state };
        };
    }
}
