import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Image, Text, KeyboardAvoidingView } from 'react-native';
import { Avatar } from 'react-native-paper'
import axios from 'axios';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { FlatGrid } from 'react-native-super-grid';


import { Container, Header, Content, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';

export default class TransactionCategoryUpdate extends Component {
	constructor(props)
	{
	super(props);
	this.state = {
		transactionId:props.route.params.id,
		categories:[],
	}
	var categoriesArray = [];
	var categoriesJSON = props.route.params.categories;
	var keys = Object.keys(categoriesJSON);

	console.log(keys);
	for(var i = 0;i<keys.length;i++){
		categoriesArray.push({name:keys[i],code:categoriesJSON[keys[i]]});
	}
	this.state = {
		transactionId:props.route.params.id,
		categories:categoriesArray,
	}
}

	updateCategory(category){
		console.log("UPDATE");
		axios.post("http://"+SERVER_URL+":8080/sms/updateCategory", {'id':this.state.transactionId,'category':category})
					.then(response => {
						console.log('here'+response);
							if (response) {
									//console.log(response);
									//send_response = response;
									console.log('Transaction updated successfully');

							}
					})
					.catch(error => {
							console.log('Error while fetching the transactions from sms');
					});
	}
	render() {
		// const navigation = this.props.navigation;

		const items = this.state.categories;
		console.log(items);
		return (

			<FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
				<TouchableOpacity onPress={() => this.updateCategory(item.name)}>
        <View style={styles.itemContainer}>
				<Image source = {{uri:item.code}}
style = {styles.itemImage}
				 />
				<Text style={styles.itemName}>{item.name}</Text>

        </View>
				</TouchableOpacity>
      )}
    />

		);
	}

}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
		backgroundColor: '#0A1045',
  },
  itemContainer: {
		alignSelf:'center',
    justifyContent: 'flex-end',
    padding: 10,
    height: 120,
		width:120,
		backgroundColor: 'white',
		borderRadius:500,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 10,
  },
  itemName: {
    fontSize: 12,
    color: '#000',
		alignSelf: 'center',
		marginBottom:5
  },
	itemImage: {
		 width: 70,
		 height: 70,
		 alignSelf:'center',
	}
});
