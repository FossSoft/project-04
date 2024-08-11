// import { format, parseISO, subHours } from 'date-fns';
import { useWaterItem } from '../../hooks/useWater';
import css from './WaterItem.module.css';
import sprite from '../../image/sprite/sprite.svg';
import DeleteWaterModal from 'components/DeleteWaterModal/DeleteWaterModal';
import { EditWaterModal } from 'components/EditWaterModal/EditWaterModal';
import Modal from 'components/Modal/Modal';

const WaterItem = ({ item }) => {
  const {
    isDeleteModalOpen,
    isEditModalOpen,
    openDeleteModal,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    handleDelete,
  } = useWaterItem(item);

  const { amountOfWater, time } = item;
  const formatAmount = (amountOfWater) => {
    const liters = amountOfWater / 1000;
    if (liters >= 1) {
      return `${liters.toFixed(2)} L`;
    } else {
      return `${amountOfWater} ml`;
    }
  };
  const formatTime = (time) => time;
  //   const formatTime = (isoString) => {
  //     const date = subHours(parseISO(isoString), 0);
  //     return format(date, 'HH:mm');
  //   };

  return (
    <div className={css.itemWrapper}>
      <svg className={css.svgGlass}>
        <use xlinkHref={`${sprite}#icon-water-glass`} />
      </svg>
      <div className={css.waterInfo}>
        <p className={css.mlInfo}>{formatAmount(amountOfWater)}</p>
        <p className={css.timeInfo}>{formatTime(time)}</p>
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
        <DeleteWaterModal item={item} onDelete={handleDelete} onClose={closeDeleteModal} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
        <EditWaterModal item={item} onClose={closeEditModal} />
      </Modal>
    </div>
  );
};

export default WaterItem;
