import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../store/store";

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatchType>()
