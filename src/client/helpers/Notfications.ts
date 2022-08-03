import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

export const sendNotifications = async (token: Notifications.ExpoPushToken) => {
  console.log('sending');
  const message = {
    to: token,
    sound: 'default',
    title: 'Push Notfication',
    body: 'And here is the body!',
    data: { someData: 'goes here' }
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
};

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
          seconds: 60
        }
      });
    return scheduledNotification;
  } catch (error) {
    console.log(error);
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
          title: 'Return Bike Reminder',
          body: `Your bike is overdue. You have to return it now.`
        },
        trigger: {
          seconds: 60
        }
      });
    return scheduledNotification;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Cancels scheduled notification
 * @param notificationId string. Id of notification to cancel
 */
export const cancelBikeReturnReminder = async (notificationId: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
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
    console.log(token);

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
