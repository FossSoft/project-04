import SignInForm from '../../components/SignInForm/SignInForm';
import Logo from '../../components/Logo/Logo';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import { Link } from 'react-router-dom';
import css from './SignInPage.module.css';

export default function LoginPage() {
  return (
    <div className={css.page}>
      <div className={css.wrapper}>
        <div className={css.logoBox}>
          <Logo />
        </div>
        <div className={css.container}>
          <SignInForm />
          <p className={css.text}>
            Don`t have an account?{' '}
            <Link to="/signup" className={css.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className={css.imageWrapper}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
