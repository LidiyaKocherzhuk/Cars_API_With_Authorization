import {apiService} from './api.service';
import {urls} from '../constants';
import {IRes} from '../types';
import {ICar, ICarData, IPagination, IParams, IUpdateCarData} from '../interfaces';

const carsService = {
    getAll: (params: IParams): IRes<IPagination> => apiService.get(urls.cars.cars, {params}).then(),
    create: (carData: ICarData): IRes<ICar> => apiService.post(urls.cars.cars, carData).then(),
    update: (carId: number, carData: IUpdateCarData): IRes<ICar> => apiService.put(urls.cars.carsById(carId), carData).then(),
    updatePhoto: (carId: number, photo: FormData): IRes<ICar> => apiService.put(urls.cars.carsPhoto(carId), photo).then(),
    delete: (carId: number): IRes<void> => apiService.delete(urls.cars.carsById(carId)).then(),
}

export {
    carsService,
};