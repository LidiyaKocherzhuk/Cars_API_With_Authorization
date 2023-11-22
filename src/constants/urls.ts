const baseURL = 'http://owu.linkpc.net/carsAPI/v2';

const auth = '/auth';
const cars = '/cars';
const users = '/users';

const urls = {
    login: auth,
    refresh: `${auth}/refresh`,
    register: users,
    me: `${auth}/me`,
    cars,
    carsById: (id: number) => `${cars}/${id}`,
};

export {
    baseURL,
    urls,
}