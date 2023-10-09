import { ComicDetail } from "../../../types/comic";
import { Action } from "../../../types/type"
import { GET_COMIC_DETAILS, loading } from "./types"

const initialState:{comicDetail:ComicDetail | null,loading:boolean} = {
    comicDetail:null,
    loading:false
}

export const comicDetailReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case loading: {
      state.loading = true;
      state.comicDetail = null;
      return { ...state };
    }
    case GET_COMIC_DETAILS: {
        state.loading = false;
        state.comicDetail = action.payload;
        return { ...state };
    }
    default: {
        return { ...state };
    }
  }
}
