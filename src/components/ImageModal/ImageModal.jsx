import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, image, onCloseModal }) => {
  const imageSrc = image && image.imageSrc;

  return (
    <Modal
      // overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      {imageSrc && (
        <div className={css.imgModal}>
          <img
            className={css.image}
            src={imageSrc}
            alt={image && image.alt_description}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
