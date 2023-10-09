import { ChapterImage } from "../../../types/comic";
import { Action } from "../../../types/type"
import { GET_SINGLE_CHAPTER_COMICS, loading } from "./types"

const initialState: {lstChapterImg:any,loading:any} = {
    lstChapterImg:null,
    loading:false
}

export const chapterReducer = (state = initialState, action:Action) => {
  switch (action.type) {
        case loading: {
            state.loading = true;
            state.lstChapterImg = null;
            return { ...state};
        }
        case GET_SINGLE_CHAPTER_COMICS: {
            state.loading = false;
            state.lstChapterImg = action.payload;
            return { ...state};
        }
        default:{
            return { ...state};
        }
    }
}
