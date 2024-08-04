import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { refreshUser } from '../../redux/auth/operations';
import RestrictedRoute from '../../components/RestricktedRoute';
import PrivateRoute from '../../components/PrivateRoute';
import HomePage from '../../pages/HomePage/HomePage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import TrackerPage from '../../pages/TrackerPage/TrackerPage';

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user</b>
  ) : (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/signin"
        element={
          <RestrictedRoute redirectTo="/signin" component={<SignInPage />} />
        }
      />
      <Route
        path="/tracker"
        element={
          <PrivateRoute redirectTo="/tracker" component={<TrackerPage />} />
        }
      />
    </Routes>
  );
}
