import { Action } from "../../../types/type"
import { GET_COMICS_BY_GENRES, GET_GENRES, loading } from "./types"

const initialState:{loading:boolean,lstGenres:any,lstComicByGenres:any} = {
    loading: false,
    lstGenres:null,
    lstComicByGenres:null
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
        state.lstComicByGenres = action.payload;
        return { ...state};
    }
    default: {
        return { ...state};
    }
  }
}
