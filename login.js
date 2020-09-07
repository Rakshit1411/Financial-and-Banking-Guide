import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Button, TextInput } from 'react-native';
import Headbar from './Components/Headbar';
import DashboardScreen from './DashboardScreen'
import AsyncStorage from '@react-native-community/async-storage';
import Sidebar from './Components/Sidebar'

import { Container, Header, Content, Text, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';

const userInfo = {username:'anushka', password:'anushka'};

export default class LoginScreen extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}
	render() {
		const navigation = this.props.navigation;
		const title = 'Login';
		return (
			<View style={styles.container}>
			 
				
						<Text style={styles.welcome}>Welome to Wizely</Text>
						<TextInput
							style={styles.input}
							placeholder="Username"
							onChangeText = {(text)=>this.setState({username: text})}
							value={this.state.username}
							autoCapitalize="none"
						/>
						<TextInput
							style={styles.input}
							placeholder="Password"
							onChangeText = {(text)=>this.setState({password: text})}
							value={this.state.password}
							secureTextEntry
						/>
						<View style={styles.btnContainer}>
							<TouchableOpacity style={styles.userBtn}>
								<Text style={styles.btnTxt} onPress={this._login}>Submit</Text>
							</TouchableOpacity>
						</View>
			</View>
		);
	}

	_login = async() => {
		if(userInfo.username === this.state.username && userInfo.password === this.state.password)
		{
			await AsyncStorage.setItem('isLoggedIn',this.state.username);
			this.props.navigation.navigate('DrawerNavigator');
		}
		else
		{
			alert("Incorrect username or password");
		}
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightblue'
	},
	input: {
		width: "90%",
		backgroundColor: "white",
		padding: 15,
		marginBottom: 10
	},
	btnContainer: {
		flexDirection: "row",
		justifyContent: "center"
	},
	userBtn: {
		backgroundColor: "pink",
		padding: 15,
		width: "35%"
	},
	btnTxt: {
		fontSize: 20,
		textAlign: 'center',
		color: "white"
	},
	welcome: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
		color: 'white'
	}
});