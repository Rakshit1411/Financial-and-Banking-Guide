import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import TransactionsDetails from './TransactionsDetails';
import TransactionCategoryUpdate from './TransactionCategoryUpdate';
import MyTransactionScreen from '../../MyTransactionsScreen';
const Stack = createStackNavigator();

export default function TransactionDrawer() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="My Transaction Screen" component={MyTransactionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Transactions Details" component={TransactionsDetails} options={{title:''
      ,headerStyle: {backgroundColor: '#0A1045'},headerTransparent:true}} />
      <Stack.Screen name="Transaction Category Update" component={TransactionCategoryUpdate} options={{title:''
    ,headerStyle: {backgroundColor: '#0A1045'},headerTransparent:true}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}