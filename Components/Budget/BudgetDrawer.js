import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import NewBudget from './NewBudget';
import BudgetScreen from './BudgetScreen';
const Stack = createStackNavigator();

export default function BudgetDrawer() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Budget Screen" component={BudgetScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="New Budget" component={NewBudget} options={{title:'Update Category'
  ,headerStyle: {backgroundColor: '#0A1045'},headerTintColor: '#fff'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
