const baseURL = 'http://owu.linkpc.net/carsAPI/v2';

const auth = '/auth';
const cars = '/cars';
const users = '/users';

const urls = {
    auth: {
        login: auth,
        refresh: `${auth}/refresh`,
        register: users,
        me: `${auth}/me`,
    },
    cars: {
        cars,
        carsById: (id: number) => `${cars}/${id}`,
        carsPhoto: (id: number) => `${cars}/${id}/photo`,
    },
    image: (imgPath: string) => `http://owu.linkpc.net/${imgPath}`,
};

export {
    baseURL,
    urls,
}