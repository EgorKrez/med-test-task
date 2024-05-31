import React, {
  PropsWithChildren,
  useEffect,
} from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from './state/selectors';
import { fetchUserData } from './state/userSlice';

export function DrawAfterFirstUserInitialize({ children }: PropsWithChildren) {
  const { userInitialized } = useAppSelector(s => s.user);
  const { dispatch } = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserData())
  }, []);

  return <>
    {userInitialized && children}
  </>;
}
