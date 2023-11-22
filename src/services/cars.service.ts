import {apiService} from "./api.service";
import {urls} from "../constants";
import {IRes} from "../types";
import {ICar, ICarData, IPagination, IUpdateCarData} from "../interfaces";

const carsService = {
    getAll: (): IRes<IPagination> => apiService.get(urls.cars).then(),
    create: (carData: ICarData): IRes<ICar> => apiService.post(urls.cars, carData).then(),
    update: (carId: number, carData: IUpdateCarData): IRes<ICar> => apiService.put(urls.carsById(carId), carData).then(),
    delete: (carId: number): IRes<void> => apiService.delete(urls.carsById(carId)).then(),
}

export {
    carsService,
};