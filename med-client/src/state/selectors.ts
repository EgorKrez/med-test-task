import { IUserState } from "./userSlice";
import { IRecordsState } from "./recordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";
import { AsyncThunkAction } from "@reduxjs/toolkit";

interface AllStates {
  user: IUserState;
  records: IRecordsState;
}

export function useAppSelector<T>(mapTo: (states: AllStates) => T) {
  return useSelector((state: AllStates) => mapTo(state));
}

type AppDispatch = (
  action: UnknownAction | AsyncThunkAction<any, any, any>
) => void;
type AppPostDispatch = (
  action: UnknownAction | AsyncThunkAction<any, any, any>
) => Promise<any>;

export function useAppDispatch(): { dispatch: AppDispatch } {
  return {
    dispatch: useDispatch() as AppDispatch,
  };
}

export function useAppPostDispatch(): { postDispatch: AppPostDispatch } {
  return {
    postDispatch: useDispatch() as AppPostDispatch,
  };
}
