import { useState } from 'react';
// import { format, parseISO, subHours } from 'date-fns';
import css from './WaterItem.module.css';
import sprite from '../../image/sprite/sprite.svg';
import DeleteWaterModal from 'components/DeleteWaterModal/DeleteWaterModal';
import { EditWaterModal } from 'components/EditWaterModal/EditWaterModal';
import Modal from 'components/Modal/Modal';
import { useDispatch } from 'react-redux';
import { deleteWater } from '../../redux/water/slice';

const WaterItem = ({ item, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { _id: id, amountOfWater, time } = item;

  const formatAmount = (amountOfWater) => {
    return `${amountOfWater} ml`;
  };

  //   const formatTime = (isoString) => {
  //     const date = subHours(parseISO(isoString), 0);
  //     return format(date, 'HH:mm');
  //   };

  const formatTime = (time) => {
    return time;
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
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
        <p className={css.mlInfo}>{formatAmount(amountOfWater)}</p>
        <p className={css.timeInfo}>{formatTime(time)}</p> {/* Використовуйте time */}
      </div>
      <div className={css.waterActions}>
        <button className={css.btnSvg} type="button" onClick={openEditModal}>
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
      <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal}>
        <DeleteWaterModal onDelete={handleDelete} onClose={closeDeleteModal} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
        <EditWaterModal onClose={closeEditModal} />
      </Modal>
    </div>
  );
};

export default WaterItem;
