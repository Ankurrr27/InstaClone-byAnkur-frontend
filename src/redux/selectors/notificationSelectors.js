import { createSelector } from "@reduxjs/toolkit";

export const selectLikeNotifications = createSelector(
  (state) => state.realTimeNotification?.likeNotification,
  (likeNotification) => likeNotification ?? []
);
