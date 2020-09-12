import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MessageDetails from '../MessageDetails'
import NotificationCentreScreen from '../NotificationCentreScreen'

const Stack = createStackNavigator();

function MessagesNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="My Messages" component={NotificationCentreScreen} />

        <Stack.Screen name="Message Details" component={MessageDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MessagesNavigator;
