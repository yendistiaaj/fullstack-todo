import { modalIconMap } from "../ModalIconMap";
import { type ModalType } from "../ModalTypeEnum";

type Props = {
  type: ModalType;
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ type, title, message, isOpen, onClose }: Props) {
  if (!isOpen) return null;
  const iconSrc = modalIconMap[type];
  return (
    <div className="modal-main">
      <div className="modal-card">
        <img className="modal-icon" src={iconSrc} alt={type.toLowerCase()} />
        <h2 className="modal-title">{title}</h2>
        <p className="modal-subtitle">{message}</p>
        <button className="modal-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Modal;
