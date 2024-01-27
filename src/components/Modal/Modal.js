import React from "react";
import { Dialog } from "@mui/material";

const Modal = ({ children, open, close }) => {
  if (!open) {
    return <></>;
  }

  return <Dialog open={open} onClose={close}>{children}</Dialog>;
};
export default Modal;
