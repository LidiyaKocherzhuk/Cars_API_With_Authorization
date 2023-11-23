import {ICar} from './car.interface';

export interface IPagination {
    prev: IPrevNext;
    next: IPrevNext;
    items: ICar[];
}

export interface IPrevNext {
    page: string;
}