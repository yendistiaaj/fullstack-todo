export const ModalTypeEnum = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "information",
} as const;

export type ModalType = (typeof ModalTypeEnum)[keyof typeof ModalTypeEnum];
