import { useSelector } from 'react-redux';

import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectAccessToken,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken)

  return {
    isLoggedIn,
    isRefreshing,
    user,
    accessToken
  };
};
