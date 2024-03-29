import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import TransactionsDetails from './TransactionsDetails';
import TransactionCategoryUpdate from './TransactionCategoryUpdate';
import MyTransactionScreen from '../../MyTransactionsScreen';
import NewBudget from '../Budget/NewBudget';
const Stack = createStackNavigator();

export default function TransactionDrawer({sideNavigation}) {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="My Transaction Screen" component={MyTransactionScreen} options={{ headerShown: false }} sideNavigation={sideNavigation}/>
        <Stack.Screen name="Transactions Details" component={TransactionsDetails} options={{title:''
      ,headerStyle: {backgroundColor: '#0A1045'},headerTransparent:true}} />
      <Stack.Screen name="Transaction Category Update" component={TransactionCategoryUpdate} options={{title:'Update Category'
    ,headerStyle: {backgroundColor: '#0A1045'},headerTintColor: '#fff'}} />
    <Stack.Screen name="New Budget" component={NewBudget} options={{title:'Update Category'
  ,headerStyle: {backgroundColor: '#0A1045'},headerTintColor: '#fff'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
