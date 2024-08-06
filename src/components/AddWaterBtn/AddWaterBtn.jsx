

import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/water/slice';
import css from './AddWaterBtn.module.css';
import sprite from '../../image/sprite/sprite.svg';

const AddWaterBtn = () => {
  const dispatch = useDispatch();

  // Поки не має модалки додавання води, пізніше це видалити
  const handleClick = () => {

    const waterItem = {
      _id: new Date().toISOString(),
      amount: 250,
      date: new Date().toISOString(),
    };

    console.log('Dispatching water item:', waterItem);

    dispatch(addWater(waterItem));
  };

  return (
    <button className={css.btnAddWater} type='button' onClick={handleClick}>
      <svg className={css.svgPlus}>
        <use xlinkHref={`${sprite}#icon-plus`} />
      </svg>
      <span>Add water</span>
    </button>
  );
};

export default AddWaterBtn;
