import {AppDispatch, AppState} from './store';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
