import css from './TitleHello.module.css';

export default function TitleHello() {
  return (
    <div className={css.text}>
      Hello, <span className={css.span}>Nadia!</span>
    </div>
  );
}
