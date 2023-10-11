import { BaseService } from "./BaseService";

class ComicService extends BaseService {
    constructor() {
        super();
    }
    
    getRecommendComics = () => {
        return this.get(`recommend-comics`);
    }

    getTopComics = (page?:number,status?:string) => {
        return this.get(`top?status=${status}&page=${page}`);
    }

    getComicsDetail = (id:string) => {
        return this.get(`comics/${id}`);
    }

    getSingleComicsChapter = (idComic:string,idChapter:number) => {
        return this.get(`comics/${idComic}/chapters/${idChapter}`);
    }

    getComicByGenres = (type:string,page:number) => {
        return this.get(`genres/${type}?page=${page}`);
    }

    getNewComic = (page:number = 1,status:string = 'all') => {
        return this.get(`new-comics?page=${page}&status=${status}`);
    }

    getTopComicByType = (type:string,page:number,status:string) => {
        if(type === 'all') {
            return this.get(`top?page=${page}&status=${status}`);
        } else {
            return this.get(`top/${type}?page=${page}&status=${status}`);
        }
    }

    getComicByKeyword = (keyword:string,page:number) => {
        return this.get(`search?q=${keyword}&page=${page}`);
    }
}

export const comicsService = new ComicService();