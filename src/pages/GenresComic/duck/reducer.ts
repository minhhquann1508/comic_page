import { Action } from "../../../types/type"
import { GET_COMICS_BY_GENRES, GET_GENRES, loading } from "./types"

const initialState:{loading:boolean,lstGenres:any,lstComicByGenres:any,totalItem:number} = {
    loading: false,
    lstGenres:null,
    lstComicByGenres:null,
    totalItem:0
}

export const genresReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case loading: {
        state.loading = true;
        state.lstGenres = null;
        state.lstComicByGenres = null;
        return { ...state};
    }
    case GET_GENRES: {
        state.loading = false;
        state.lstGenres = action.payload;
        return { ...state};
    }
    case GET_COMICS_BY_GENRES: {
        state.loading = false;
        state.totalItem = (action.payload.total_pages - 1) * 36;
        state.lstComicByGenres = action.payload;
        return { ...state};
    }
    default: {
        return { ...state};
    }
  }
}
