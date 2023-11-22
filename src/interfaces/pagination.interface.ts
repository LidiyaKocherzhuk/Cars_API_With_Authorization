import {ICar} from "./car.interface";

export interface IPagination {
    prev: string;
    next: string;
    items: ICar[];
}