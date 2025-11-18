// app/utils/Notifications.js
import * as Notifications from "expo-notifications";

export function showNotification({ title, body, data }) {
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: null, // immediate
  });
}
