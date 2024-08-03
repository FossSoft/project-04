import css from './UserBar.module.css';

export default function UserBar() {
  return (
    <button className={css.btn} type="button">
      <p className={css.text}>Nadia</p>
      <img
        className={css.img}
        srcset="./image/x1/Ellipse_14.png 1x,
                ./image/x2/Ellipse_14.png 2x"
        src="./image/x1/Ellipse_14.png"
        alt="User"
      />
      <svg>
        <use href="./image/sprite/sprite.svg#icon-eye"></use>
      </svg>
    </button>
  );
}
