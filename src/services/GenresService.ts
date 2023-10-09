import { BaseService } from "./BaseService";

class GenresService extends BaseService {
    constructor() {
        super();
    }
    
    getListGenres = () => {
        return this.get('genres');
    }
}

export const genresService = new GenresService();