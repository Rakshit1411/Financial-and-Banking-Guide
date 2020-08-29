import { Text, Button, ScrollView, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Icon, Container, Header, Content, Left } from 'native-base'
import { Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart
} from 'react-native-chart-kit';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const barData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get("window").width;

class DashboardScreen extends Component
{
	render(){
		return (

			<Container>
				<Content contentContainerStyle = {{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'lightblue'
				}}>
					<Text>Dashboard</Text>

         			<BarChart
            			data={barData}
           				width={screenWidth}
            			height={220}
            			yAxisLabel="$"
            			chartConfig={chartConfig}
            			verticalLabelRotation={30}
          			/>

				</Content>
			</Container>
		);
	}
}


export default DashboardScreen;