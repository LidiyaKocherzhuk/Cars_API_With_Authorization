import {IAuth, ITokens, IUser} from '../interfaces';
import {apiService} from './api.service';
import {urls} from '../constants';
import {IRes} from '../types';

const authService = {
    async register(userData: IAuth): Promise<void> {
        await apiService.post(urls.auth.register, userData).then();
    },

    async login(userData: IAuth): Promise<IUser> {
        const {data} = await apiService.post<ITokens>(urls.auth.login, userData).then();
        await this.setTokens({access: data.access, refresh: data.refresh});
        const {data: me} = await this.me();
        return me;
    },

    me(): IRes<IUser> {
        return apiService.get(urls.auth.me).then();
    },

    async refresh(refreshToken: string): Promise<ITokens> {
        const {data} = await apiService.post<ITokens>(urls.auth.refresh, {refresh: refreshToken}).then();

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