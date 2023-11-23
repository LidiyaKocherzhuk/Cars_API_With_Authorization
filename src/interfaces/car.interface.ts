export interface ICarData {
    brand: string;
    year: string;
    price: string;
}

export interface ICar extends ICarData {
    id: number;
    photo: string;
}

export interface IUpdateCarData {
    brand?: string;
    year?: string;
    price?: string;
    photo?: FormData;
}

