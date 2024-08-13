import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountCustomers } from '../../redux/user/selectors';
import css from './Customers.module.css';
import img1_1x from '../../image/x1/Male_Memojis.png';
import img1_2x from '../../image/x2/Male_Memojis.png';
import img2_1x from '../../image/x1/Male_Memojis_1.png';
import img2_2x from '../../image/x2/Male_Memojis_1.png';
import img3_1x from '../../image/x1/Male_Memojis_2.png';
import img3_2x from '../../image/x2/Male_Memojis_2.png';
import { useEffect } from 'react';
import { fetchCountCustomers } from '../../redux/user/operations';
// import { selectIsLoading } from '../../redux/user/selectors';

export default function Customers() {
  const dispatch = useDispatch();
  const countCustomers = useSelector(selectCountCustomers);
  // const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCountCustomers());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <div className={css.box}></div>

      <img
        className={clsx(css.img, css.paddingFirst)}
        srcSet={`${img1_1x} 1x,
                  ${img1_2x} 2x`}
        src={`${img1_1x}`}
        alt="User1"
      />
      <img
        className={clsx(css.img, css.paddingSecond)}
        srcSet={`${img2_1x} 1x,
                  ${img2_2x} 2x`}
        src={`${img2_1x}`}
        alt="User2"
      />
      <img
        className={clsx(css.img, css.paddingThird)}
        srcSet={`${img3_1x} 1x,
                  ${img3_2x} 2x`}
        src={`${img3_1x}`}
        alt="User3"
      />

      <p className={css.text}>
        Our <span className={css.accent}> {countCustomers} happy</span>
        <br />
        customers
      </p>
    </div>
  );
}
