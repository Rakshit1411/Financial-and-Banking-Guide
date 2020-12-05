import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Headbar from './Components/Headbar';
import BudgetScreen from './BudgetScreen';
import MyTransactionsScreen from './MyTransactionsScreen';
import Icon from "react-native-vector-icons/FontAwesome";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function SpendingsScreen({navigation}) {
  Icon.loadFont();
  return (
    <NavigationContainer independent="true">
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Transactions') {
            iconName = focused
              ? 'money'
              : 'money';
          } else if (route.name === 'My Budget') {
            iconName = focused ? 'life-saver' : 'life-saver';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0A1045',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Transactions" component={MyTransactionsScreen} />
      <Tab.Screen name="My Budget" component={BudgetScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}
