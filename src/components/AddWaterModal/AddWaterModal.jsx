import React, { useState } from 'react';
import css from './AddWaterModal.module.css'; // Переконайтеся, що цей шлях правильний і CSS підключається
import sprite from '../../image/sprite/sprite.svg'; // Актуальний шлях до спрайту
import { useDispatch } from 'react-redux';
import { addWaterAmount } from '../../redux/water/operations';

export const WaterModal = ({ onClose }) => {
  const [quantity, setQuantity] = useState(50);
  const timeNow = new Date().toTimeString().slice(0, 5);
  const dispatch = useDispatch();
  const handleDecrease = () => {
    setQuantity(prevValue => (prevValue > 50 ? prevValue - 50 : prevValue));
  };

  const handleIncrease = () => {
    setQuantity(prevValue => (prevValue < 1500 ? prevValue + 50 : prevValue));
  };

  const handleChange = e => {
    setQuantity(Number(e.target.value));
  };

  const handleSaveWater = () => {
    dispatch(addWaterAmount({}));
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
              <use href={`${sprite}#icon-minus`}></use>
            </svg>
          </button>
          <input
            placeholder="50ml"
            className={css.value}
            value={`${quantity}ml`}
            readOnly
            onChange={handleChange}
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
          className={css['water-input']}
          type="text"
          defaultValue={timeNow}
          // value={`${time}`}
        />
      </div>

      <div>
        <h2 style={{ marginBottom: '8px' }} className={css['value-text-title']}>
          Enter the value of the water used:
        </h2>
        <input
          className={css['water-input']}
          placeholder="50"
          type="text"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <button
        type="button"
        onClick={handleSaveWater}
        className={css['btn-save']}
      >
        Save
      </button>
    </div>
  );
};
