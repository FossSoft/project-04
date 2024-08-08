import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/auth/selectors.js';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  // const { isLoggedIn, isRefreshing } = useAuth();
  // const shouldRedirect = !isLoggedIn;

  const accessToken = useSelector(selectAccessToken);

  return accessToken ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
