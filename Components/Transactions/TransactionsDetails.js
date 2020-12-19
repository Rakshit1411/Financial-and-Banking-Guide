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
			<View style={styles.banner}>
			<Image source = {{uri:'data:image/png;base64,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'}}
			 style = {styles.topImage}
			 />
			 <Text style={styles.amount}>Rs. 5000</Text>
			</View>
			<Card style={styles.card}>

				<CardTitle
					title="Category: Food & Drinks" style={{paddingBottom:-200}}
				 />
				<CardContent style={{marginTop:-80}} text="Your a\/c no. XXXX413211 is credited Rs.151.00 on 28-11-20 by a\/c linked to virtual address ranjana.sharma095@okhdfcbank (UPI Ref no 033309366552)." />
				<CardAction
					separator={true}
					inColumn={false}>
					<CardButton
						title="Update Category"
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
	banner: {
		backgroundColor: '#c8dde2',
		height:200,
		justifyContent: 'center',
    alignItems: 'center',

	},
	topImage: {
		flex: 1,
		width: 80,
		height: 80,
		resizeMode: 'contain',
	},
	card: {
	 shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.5,
   shadowRadius: 4,
   elevation: 5,
   shadowOpacity: 0.5,
   shadowRadius: 2,
   borderRadius: 10,
	 marginBottom:190,
	 marginRight:20,
	 marginLeft: 20,
	 marginTop:-20
 },
 amount:{
	  fontSize:30,
	  marginBottom:40
 }
});
