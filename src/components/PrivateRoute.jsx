import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { accessToken} = useAuth();

  return accessToken ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
