import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './AddWaterModal.module.css';
import sprite from '../../image/sprite/sprite.svg';
import { addWaterAmount } from '../../redux/water/operations';
import { selectWaterDate } from '../../redux/water/selectors';

export const WaterModal = ({ onClose }) => {
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

  const handleChangeQuantity = e => {
    const value = Number(e.target.value);
    if (value >= 50 && value <= 1500) {
      setQuantity(value);
    }
  };

  const handleChangeTime = e => {
    setTime(e.target.value);
  };

  const handleSaveWater = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const waterData = {
      amountOfWater: quantity,
      time,
      date: waterDate,
    };

    try {
      const result = await dispatch(addWaterAmount([waterData, token])).unwrap();

      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      //  місце для обробки помилок, якщо потрібно
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.addWaterTitle}>Add Water</h1>

      <div>
        <h2 style={{ marginBottom: '20px' }} className={css['value-text-title']}>
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
          value={time}
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
