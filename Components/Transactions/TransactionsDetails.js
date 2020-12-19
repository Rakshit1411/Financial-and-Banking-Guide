import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Image, Text, KeyboardAvoidingView } from 'react-native';
import { Avatar } from 'react-native-paper'
import axios from 'axios';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'


import { Container, Header, Content, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';


export default class TransactionsDetails extends Component {
	constructor(props)
	{
		super(props);
	}
	render() {
		// const navigation = this.props.navigation;
		const title = 'Login';
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container1}>
			<Card style={{...styles.card,height:30,marginBottom:300,paddingTop:30,marginTop:0}}>

<CardContent/>
				 <Text style={styles.title}>Rs.5000</Text>
				 <Text style={styles.subTitle}>Food & Drinks</Text>

				<Text style={styles.content}>Your a\/c no. XXXX413211 is credited Rs.151.00 on 28-11-20 by a\/c linked to virtual address ranjana.sharma095@okhdfcbank (UPI Ref no 033309366552).</Text>

				<CardAction
					separator={true}
					inColumn={false}>
					<CardButton
						onPress={() => {navigate.navigate('Helpful Articles',{articles:this.state.articles[0]})}}
						title="Update Category"
						color="#0A1045"
						titleStyle={{fontSize:10}}
					/>
					<CardButton
						onPress={() => {navigate.navigate('My Spendings', { screen: 'My Budget' });}}
						title="Setup a new monthly budget"
						color="#0A1045"
						titleStyle={{fontSize:10}}
					/>
				</CardAction>
			</Card>
			</KeyboardAvoidingView>
		);
	}

}

const styles = StyleSheet.create({
	container1: {
		flex: 1,
		backgroundColor: '#0A1045'
	},
	card: {shadowColor: '#000',
	 shadowOffset: { width: 0, height: 2 },
	 shadowOpacity: 0.5,
	 shadowRadius: 4,
	 elevation: 5,
	 shadowOpacity: 0.5,
	 shadowRadius: 2,
	 borderRadius: 10,
 },
 title:{
	 paddingLeft:20,
	 paddingTop:100,
	 fontSize:30
 },
 subTitle:{
	paddingLeft:20,
	paddingBottom:15,
	fontSize:16
},
 content:{
 paddingLeft:20,
 paddingBottom:10,
 fontSize:16
 }
});
