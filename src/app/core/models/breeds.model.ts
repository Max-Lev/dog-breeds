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