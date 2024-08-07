import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import css from './TitleHello.module.css';
import { selectUserName } from '../../redux/user/selectors';
import { fetchUserInfo } from '../../redux/user/operations';

export default function TitleHello() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <div className={css.text}>
      Hello,
      {!userName ? (
        <span className={css.span}>Visitor</span>
      ) : (
        <span className={css.span}>{userName}</span>
      )}
    </div>
  );
}
