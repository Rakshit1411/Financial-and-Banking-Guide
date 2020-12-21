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
		console.log('State Props: ',props.route.params.transaction.item);
		this.state = {
			transaction:props.route.params.transaction.item,
			categoryImage:props.route.params.categoryImage,
			categories:props.route.params.categories,
		}
	}
	render() {
		// const navigation = this.props.navigation;
		const title = 'Login';
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container1}>
			<View style={styles.banner}>
			<Image source = {{uri:this.state.categoryImage}}
			 style = {styles.topImage}
			 />
			 <Text style={styles.amount}>Rs. {this.state.transaction.amount}</Text>
			</View>
			<Card style={styles.card}>

				<CardTitle
					title={this.state.transaction.paidToCategory} style={{paddingBottom:-200}}
				 />
				<CardContent style={{marginTop:-80}} text={this.state.transaction.rawBody} />
				<CardAction
					separator={true}
					inColumn={false}>
					<CardButton onPress={() => this.props.navigation.navigate('Transaction Category Update',{categories:this.state.categories,id:this.state.transaction.id})}
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
