import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification'
import {Platform} from 'react-native'
class NotificationManager{
  configure = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("[NotificationManager] onRegister TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("[NotificationManager] onNotification:", notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    })
  }

  _buildAndroidNotification = (id,title,message,data={},options={}) => {
    return {
      id:id,
      autoCancel:true,
      largeIcon: options.largeIcon || "ic_launcher",
      smallIcon: options.smallIcon || "ic_launcher",
      bigText: message || "",
      subText: title|| "",
      priority:"high",
      importance: "high",
      data:data
    }
  }

  _buildIOSNotification = (id,title,message,data={},options={}) => {
    return {
      alertAction: "view", // (optional) default: view
      category: "", // (optional) default: empty string
      userInfo:{
        id:id,
        item:data
      }
    }
  }

  showNotification = (id,title,message,data={},options={}) => {
    PushNotification.localNotificationSchedule({

      ...this._buildAndroidNotification(id,title,message,data,options),

      ...this._buildIOSNotification(id,title,message,data,options),
      date: new Date(Date.now() + 15 * 1000),
      title: title || "",
      message: message || "",
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false

    })
  }
  cancelAllNotofication = (id,title,message,data={},options={}) => {
    if(Platform.OS === "ios"){
      PushNotificationIOS.removeALlDeliveredNotifications();
    }
    else{
      PushNotificationIOS.cancelAllLocalNotifications()
    }
    unregister = () => {
      PushNotification.unregister();
    }
  }

}
export const notificationManager = new NotificationManager()
