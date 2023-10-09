import { Action } from "../../../types/type"
import { GET_RECOMMEND_COMICS, GET_TOP_COMICS } from "./types"

const initialState:{lstRecommendComics:any[] | null ,lstTopComics:any[] | null} = {
    lstRecommendComics:null,
    lstTopComics:null
}

export const homeReducer = (state = initialState, action:Action) => {
    switch (action.type) {
        case GET_RECOMMEND_COMICS: {
            state.lstRecommendComics = action.payload;
            return { ...state };
        };
        case GET_TOP_COMICS: {
            state.lstTopComics = action.payload;
            return { ...state };
        }
        default: {
            return { ...state };
        };
    }
}
