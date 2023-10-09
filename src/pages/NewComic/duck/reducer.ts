import { Action } from "../../../types/type"
import { GET_LST_NEW_COMIC, loading } from "./type"

const initialState:{loading:boolean,lstNewComic:any} = {
    loading:false,
    lstNewComic:null
}

export const newCommicReducer = (state = initialState, action:Action) => {
  switch (action.type) {
        case loading: {
            state.loading = true;
            state.lstNewComic = null;
            return { ...state };
        }
        case GET_LST_NEW_COMIC: {
            state.loading = false;
            state.lstNewComic = action.payload;
            return { ...state };
        }
        default:{
            return { ...state };
        }
    }
}
