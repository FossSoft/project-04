import { useState } from 'react';
import { format, parseISO, subHours } from 'date-fns';
import css from './WaterItem.module.css';
import sprite from '../../image/sprite/sprite.svg';
import DeleteWaterModal from 'components/DeleteWaterModal/DeleteWaterModal';

import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/slice';

const WaterItem = ({ item, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { _id: id, amount, date } = item;

  const formatAmount = (amount) => {
    // const mlAmount = amount * 1000;
    return `${amount} ml`;
  };

  const formatTime = (isoString) => {
    const date = subHours(parseISO(isoString), 0);
    return format(date, 'hh:mm');
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteWater(id));
    closeDeleteModal();
  };

  return (
    <div className={css.itemWrapper}>
      <svg className={css.svgGlass}>
        <use xlinkHref={`${sprite}#icon-water-glass`} />
      </svg>
      <div className={css.waterInfo}>
        <p className={css.mlInfo}>{formatAmount(amount)}</p>
        <p className={css.timeInfo}>{formatTime(date)}</p>
      </div>
      <div className={css.waterActions}>
        <button className={css.btnSvg} type="button" onClick={() => onEdit(item)}>
          <svg className={css.svgEdit}>
            <use xlinkHref={`${sprite}#icon-edit-2`} />
          </svg>
        </button>
        <button className={css.btnSvg} type="button" onClick={openDeleteModal}>
          <svg className={css.svgDelete}>
            <use xlinkHref={`${sprite}#icon-trash-04`} />
          </svg>
        </button>
      </div>
      {isDeleteModalOpen && (
        <DeleteWaterModal
          item={item}
          onDelete={handleDelete}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default WaterItem;
