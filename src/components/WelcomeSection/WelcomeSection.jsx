import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import css from './WelcomeSection.module.css';

export default function WelcomeSection (){
  return (
    <section className={css.section}>
      <Logo />
      <div className={css.text}>
      <h2  className={css.subtitle}>Record daily water intake and track</h2>
      <h1 className={css.title}>Water consumption tracker</h1>
        </div>
      <div className={css.link}>
        <Link className={css.link_signup} to ='signup'>Try tracker</Link>
         <Link className={css.link_signin} to ='signin' >Sign In</Link>
        </div>
    </section>
  );
};

