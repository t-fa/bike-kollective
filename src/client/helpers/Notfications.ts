import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

/**
 * Schedule notification to fire 8 hours in the future
 * Returns string notficiation id
 */
export const firstBikeReturnReminder = async () => {
  try {
    const scheduledNotification: string =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Bike Return Reminder',
          body: `You've been riding this bike for a long time. Return it and give someone else a turn.`,
          sound: 'default'
        },
        trigger: {
          seconds: 28800
        }
      });
    return scheduledNotification;
  } catch (error) {
    // console.log(error);
    return '';
  }
};

/**
 * Schedule notification to fire 24 hours in the future
 * Returns string notficiation id
 */
export const lastBikeReturnReminder = async () => {
  try {
    const scheduledNotification: string =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Bike Return Reminder',
          body: `Your bike is overdue. You have to return it now.`,
          sound: 'default'
        },
        trigger: {
          seconds: 86400
        }
      });
    return scheduledNotification;
  } catch (error) {
    // console.log(error);
    return '';
  }
};

/**
 * Cancels scheduled notification
 * @param notificationId string. Id of notification to cancel
 */
export const cancelBikeReturnReminder = async (notificationId: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    return 'Return Notification canceled';
  } catch (error) {
    console.log(error);
  }
};

/**
 * Gets users permission to send push token
 * @returns ExpoPushToken
 */
export const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token: string = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }
    return token;
  } else {
    alert("Couldn't check notificatipns permissions. Must be on device.");
  }
};
