import clsx from 'clsx';
import Button from 'components/Button/Button';
import css from './LogOutModal.module.css';
import { useDispatch } from 'react-redux';
import { closeModalLogout } from '../../redux/modal/slice';
import { logout } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';

export default function LogOutModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch(closeModalLogout());
  };

  const handleClearStorage = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Log out</h3>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.btns}>
        <Button
          className={clsx(css.params, css.green)}
          onClick={handleClearStorage}
        >
          Log out
        </Button>
        <Button
          className={clsx(css.params, css.gray)}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
