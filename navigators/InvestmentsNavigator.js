import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SavingsAndInvestmentsScreen from '../SavingsAndInvestmentsScreen'
import SpendingsScreen from '../SpendingsScreen'
import HelpfulArticles from '../HelpfulArticles'
import HSBCProducts from '../HSBCProducts'
import WebviewScreen from '../WebviewScreen'
const Stack = createStackNavigator();

function InvestmentsNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Savings And Investments" component={SavingsAndInvestmentsScreen} />
        <Stack.Screen name="My Spendings" component={SpendingsScreen} />
        <Stack.Screen name="Helpful Articles" component={HelpfulArticles} />
        <Stack.Screen name="HSBC Products" component={HSBCProducts} />
        <Stack.Screen name="Webview Screen" component={WebviewScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default InvestmentsNavigator;
