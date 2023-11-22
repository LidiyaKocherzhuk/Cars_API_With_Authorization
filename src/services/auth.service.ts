import {IAuth, ITokens, IUser} from "../interfaces";
import {apiService} from "./api.service";
import {urls} from "../constants";
import {IRes} from "../types";


const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';

const authService = {
    register(userData: IAuth): IRes<any> {
        return apiService.post(urls.register, userData).then();
    },

    async login(userData: IAuth): Promise<IUser> {
        const {data} = await apiService.post<ITokens>(urls.login, userData).then();
        await this.setTokens({access: data.access, refresh: data.refresh});
        const {data: me} = await this.me();
        return me;
    },

    me(): IRes<IUser> {
        return apiService.get(urls.me).then();
    },

    async refresh(refreshToken: string): Promise<ITokens> {
        console.log(refreshToken);
        const {data} = await apiService.post<ITokens>(urls.refresh, {refresh: refreshToken}).then();

        this.setTokens({access: data.access, refresh: data.refresh});
        return data;
    },

    setTokens({access, refresh}: ITokens): void {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
    },
    getAccessToken(): string {
        return localStorage.getItem('access');
    },
    getRefreshToken(): string {
        return localStorage.getItem('refresh');
    },
    deleteTokens(): void {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    },

}

export {
    authService,
}