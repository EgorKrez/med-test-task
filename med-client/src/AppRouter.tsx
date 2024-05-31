import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PersonalAccountPage } from './PersonalAccountPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import React from 'react';

export function AppRouter() {
  return <Router>
    <Routes>
      <Route
        path={'/'}
        element={
          <ProtectedRoute>
            <PersonalAccountPage/>
          </ProtectedRoute>
        }
      />
      <Route path={'/login'}
             element={<LoginPage/>}/>
      <Route
        path={'/profile'}
        element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>;
}
