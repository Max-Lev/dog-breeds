export interface IBreedsResponse {
    message: {
        [key: string]: string[];
    },
    status: string;
}

export interface IBreed {
    breed: string;
    id?: number
    subBreeds: string[];
}

export interface IByBreedResponse {
     message: string[];
     success: string ;
}

export interface IAlbum{
    images:string[];
}