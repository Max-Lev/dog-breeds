export interface IBreedsResponse {
    message: {
        [key: string]: string[];
    },
    status: string;
}

export interface IBreed {
    name: string;
    id?: number
    subBreeds: string[];
}

export interface IOptions{
    id?:number | null;
    name:string;
}

export interface IByBreedResponse {
     message: string[];
     success: string ;
}

export interface IAlbum{
    images:string[];
}