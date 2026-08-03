import { closeNotification } from "@/state-management/modules/notification/notificationActions";
import { selectNotification } from "@/state-management/modules/notification/notificationSelectors";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationView from "../Notification/NotificationView";
import "./GlobalNotificationContainer.scss";

const GlobalNotificationContainer = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  const handleResetNotification = () => {
    dispatch(closeNotification());
  };

  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        dispatch(closeNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.isOpen, dispatch]);

  return (
    <div className="global-notification-container">
      <NotificationView
        isOpen={notification.isOpen}
        message={notification.message}
        icon={notification.icon}
        resetNotification={handleResetNotification}
      />
    </div>
  );
};

export default GlobalNotificationContainer;
