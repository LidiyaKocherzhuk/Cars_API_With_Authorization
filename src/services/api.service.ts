import axios, {AxiosError} from "axios";

import {baseURL, urls} from "../constants";
import {authService} from "./auth.service";
import {router} from "../router";

type IWaitList = () => void;
const apiService = axios.create({baseURL});
let isRefreshing = false;
const waitList: IWaitList[] = [];
apiService.interceptors.request.use(request => {
    const accessToken = authService.getAccessToken();

    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
});

apiService.interceptors.response.use(response => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        console.log(error)

        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;

                try {

                    await authService.refresh(localStorage.getItem('refresh'));
                    runAfterRefresh();
                    isRefreshing = false;
                    console.log('one', originalRequest.url);
                    return apiService(originalRequest);

                }catch (e) {

                    authService.deleteTokens();
                    isRefreshing = false;
                    await router.navigate('/login');
                    console.log('two')
                    return Promise.reject(error);

                }

            }

            if (originalRequest.url === urls.refresh) {
                console.log('three')
                return Promise.reject(error);
            }

            console.log('promise');
            return new Promise(resolve => {
                console.log(originalRequest.url);
                subscribeToWaitList(() => resolve(apiService(originalRequest)));
            });

        }
        console.log('four')
        return Promise.reject(error);
    }
);

const subscribeToWaitList = (cb: IWaitList): void => {
    waitList.push(cb);
}

const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb();
    }
}

export {
    apiService
};

