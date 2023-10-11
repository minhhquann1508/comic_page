import { Action } from "../../../types/type"
import { GET_LST_TOP_COMIC, loading } from "./types"

const initialState:{loading:boolean,lstTopComic:any,totalItem:number} = {
    loading:false,
    lstTopComic:null,
    totalItem:0
}

export const topComicReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case loading: {
        state.loading = true;
        state.lstTopComic = null;
        return { ...state };
    }
    case GET_LST_TOP_COMIC: {
        state.loading = false;
        state.lstTopComic = action.payload;
        state.totalItem = (action.payload.total_pages - 1) * 36;
        return { ...state };
    }
    default: {
        return { ...state };
    }
  }
}
