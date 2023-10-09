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
}

export const comicsService = new ComicService();