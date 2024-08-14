import React, { useState } from 'react';
import css from './AddWaterModal.module.css'; // Переконайтеся, що цей шлях правильний і CSS підключається
import sprite from '../../image/sprite/sprite.svg'; // Актуальний шлях до спрайту
import { useDispatch, useSelector } from 'react-redux';
import { addWaterAmount } from '../../redux/water/operations';
import { selectWaterDate } from '../../redux/water/selectors';
// import { addWater } from '../../redux/water/slice';

export const AddWaterModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(50);
  const timeNow = new Date().toTimeString().slice(0, 5);
  const [time, setTime] = useState(timeNow);
  const waterDate = useSelector(selectWaterDate);
  const handleDecrease = () => {
    setQuantity(prevValue => (prevValue > 50 ? prevValue - 50 : prevValue));
  };

  const handleIncrease = () => {
    setQuantity(prevValue => (prevValue < 1500 ? prevValue + 50 : prevValue));
  };

  // const handleChangeQuantity = e => {
  //   let value = e.target.value;
  //   if (isNaN(value) || value.trim() === '') {
  //     return;
  //   }

  //   value = Number(value);
  //   if (value < 0) {
  //     value = 0;
  //   } else if (value > 1500) {
  //     value = 1500;
  //   }

  //   setQuantity(value);
  // };
  const handleChangeQuantity = e => {
    let value = e.target.value;

    // Дозволяємо вводити лише цифри, обмежуємо довжину до 4 символів
    if (/^\d{0,4}$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleBlurQuantity = () => {
    let numericValue = Number(quantity);

    // Обмежуємо значення діапазоном від 0 до 1500
    if (numericValue > 1500) {
      numericValue = 1500;
    }
    if (numericValue < 1) {
      numericValue = 1;
    }

    setQuantity(numericValue);
  };

  const handleChangeTime = e => {
    setTime(e.target.value);
  };
  const handleSaveWater = async () => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return;
    // }

    const waterData = {
      amountOfWater: quantity,
      time,
      date: waterDate,
    };
    await dispatch(addWaterAmount(waterData));
    // dispatch(addWater(waterData));
    onCancel();
  };

  return (
    <div className={css.container}>
      <h1 className={css.addWaterTitle}>Add Water</h1>

      <div>
        <h2
          style={{ marginBottom: '20px' }}
          className={css['value-text-title']}
        >
          Choose a value:
        </h2>
        <p className={css['value-text']}>Amount of water:</p>
        <div className={css['value-container']}>
          <button
            className={css['plus-minus']}
            type="button"
            onClick={handleDecrease}
          >
            <svg width="43" height="43" className={css.quantityIcon}>
              <use href={`${sprite}#icon-minus-water`}></use>
            </svg>
          </button>
          <input
            placeholder="50ml"
            className={css.value}
            value={`${quantity}ml`}
            readOnly
            onChange={handleChangeQuantity}
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
            }}
          />
          <button
            className={css['plus-minus']}
            type="button"
            onClick={handleIncrease}
          >
            <svg width="43" height="43" className={css.quantityIcon}>
              <use href={`${sprite}#icon-plus-water`}></use>
            </svg>
          </button>
        </div>
        <p className={css['value-text']}>Recording time:</p>
        <input
          type="time"
          className={css['water-input']}
          defaultValue={timeNow}
          onChange={handleChangeTime}
        />
      </div>

      <div>
        <h2 style={{ marginBottom: '8px' }} className={css['value-text-title']}>
          Enter the value of the water used:
        </h2>
        <input
          className={css['water-input']}
          placeholder="50"
          type="number"
          value={quantity}
          onChange={handleChangeQuantity}
          onBlur={handleBlurQuantity}
        />
      </div>

      <button
        type="submit"
        onClick={handleSaveWater}
        className={css['btn-save']}
      >
        Save
      </button>
    </div>
  );
};
