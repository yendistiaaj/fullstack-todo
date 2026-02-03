import successIcon from "../../assets/success.png";
import errorIcon from "../../assets/error.png";
import warningIcon from "../../assets/warning.png";
import infoIcon from "../../assets/info.png";
import { ModalTypeEnum, type ModalType } from "./ModalTypeEnum";

export const modalIconMap: Record<ModalType, string> = {
  [ModalTypeEnum.SUCCESS]: successIcon,
  [ModalTypeEnum.ERROR]: errorIcon,
  [ModalTypeEnum.WARNING]: warningIcon,
  [ModalTypeEnum.INFO]: infoIcon,
};
