import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import css from './WelcomeSection.module.css';
import { useSelector } from 'react-redux';

export default function WelcomeSection() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <section className={css.section}>
      <div className={css.logo} >
        <Logo />
        </div>
      <div className={css.text}>
        <h2 className={css.subtitle}>Record daily water intake and track</h2>
        <h1 className={css.title}>Water consumption tracker</h1>
      </div>
      <div className={css.link}>
        <Link
          className={css.link_signup}
          to={isLoggedIn ? '/tracker' : '/signup'}
        >
          Try tracker
        </Link>
        {!isLoggedIn && (
          <Link className={css.link_signin} to="signin">
            Sign In
          </Link>
        )}
      </div>
    </section>
  );
}
