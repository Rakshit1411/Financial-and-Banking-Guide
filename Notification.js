import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { LocalNotification } from './src/services/LocalPushController';

const Notification = () => {
  const handleButtonPress = () => {
    LocalNotification()
  }
  return (
    <View style={styles.container}>
      <Text>Press a button to trigger the notification</Text>
      <View style={{ marginTop: 20 }}>
        <Button title={'Local Push Notification'} onPress={handleButtonPress} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20
  }
});
export default Notification



