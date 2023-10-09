export interface ComicFormat {
    id:string,
    title:string,
    thumbnail:string,
    updated_at:string,
    [key:string]:any
}

export interface GenresFormat {
    id:string,
    name:string,
    [key:string]:any
}

export interface ComicDetail {
    title:string,
    thumbnail:string,
    description:string,
    authors:string,
    status:string,
    genres: GenresFormat[],
    total_views:number,
    followers:number,
    chapters:any[],
    id:string,
    other_names:string[]
}

export interface ChapterImage {
    page:number,
    src:string,
    backup_src:string
}