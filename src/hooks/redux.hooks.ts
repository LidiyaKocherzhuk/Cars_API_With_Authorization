import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {AppDispatch, RootStore} from '../redux';

const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

export {
    useAppSelector,
    useAppDispatch,
}