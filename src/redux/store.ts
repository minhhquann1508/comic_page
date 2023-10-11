import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { homeReducer } from "../pages/Home/duck/reducer";
import { comicDetailReducer } from "../pages/Detail/duck/reducer";
import { chapterReducer } from "../pages/Comic/duck/reducer";
import { genresReducer } from "../pages/GenresComic/duck/reducer";
import { newCommicReducer } from "../pages/NewComic/duck/reducer";
import { topComicReducer } from "../pages/TopComic/duck/reducer";
import { searchComicReducer } from "../pages/SearchComic/duck/reducer";
const rootReducer = combineReducers({
    homeReducer,
    comicDetailReducer,
    chapterReducer,
    genresReducer,
    newCommicReducer,
    topComicReducer,
    searchComicReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;