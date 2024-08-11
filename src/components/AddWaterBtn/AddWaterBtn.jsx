import clsx from 'clsx';
import Modal from 'components/Modal/Modal';
import { AddWaterModal } from 'components/AddWaterModal/AddWaterModal.jsx';
import { useAddWater } from '../../hooks/useWater';
import css from './AddWaterBtn.module.css';
import sprite from '../../image/sprite/sprite.svg';

const AddWaterBtn = ({ isPrimary = false }) => {
  const { isModalOpen, openModal, closeModal, handleAddWater } = useAddWater();

  return (
    <>
      <button
        className={clsx(css.btn, {
          [css.btnPrimary]: isPrimary,
          [css.btnSecondary]: !isPrimary,
        })}
        type="button"
        onClick={openModal}
      >
        <svg
          className={clsx(css.svgPlus, {
            [css.svgPlusPrimary]: isPrimary,
            [css.svgPlusSecondary]: !isPrimary,
          })}
        >
          <use xlinkHref={`${sprite}#icon-plus`} />
        </svg>
        <span>Add water</span>
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <AddWaterModal onSubmit={handleAddWater} onCancel={closeModal} />
      </Modal>
    </>
  );
};

export default AddWaterBtn;
