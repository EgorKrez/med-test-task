import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './state/selectors';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const state = useAppSelector((rootReducer) => rootReducer.user);

  if (!state?.user?.id) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
