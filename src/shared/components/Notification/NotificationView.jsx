import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import React from "react";

import "./NotificationView.scss";

const NotificationView = ({
  isOpen,
  message,
  icon,
  resetNotification,
}) => {
  const handleClose = () => {
    if (resetNotification) {
      resetNotification();
    }
  };

  // Decide severity & icon
  const isSuccess = icon === "IconConfirmation";

  console.log("isSuccess:", isSuccess);
  return (
    <Collapse in={isOpen}>
      <Alert
        className="notification-message-bar"
        severity={isSuccess ? "success" : "info"}
        icon={
          isSuccess ? (
            <CheckCircleIcon fontSize="inherit" />
          ) : (
            <InfoIcon fontSize="inherit" />
          )
        }
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default NotificationView;