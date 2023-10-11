import { Action } from "../../../types/type"
import { GET_LST_COMIC_BY_KEYWORD, loading } from "./types"

const initialState:{loading:boolean,lstComicByKeyword:any,totalItem:number} = {
    loading:false,
    lstComicByKeyword:null,
    totalItem:0
}

export const searchComicReducer = (state = initialState,action:Action) => {
  switch (action.type) {
        case loading: {
            state.loading = true;
            state.lstComicByKeyword = null;
            return { ...state };
        }
        case GET_LST_COMIC_BY_KEYWORD: {
            state.loading = false;
            state.lstComicByKeyword = action.payload;
            state.totalItem = (action.payload.total_pages - 1) * 36;
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}
