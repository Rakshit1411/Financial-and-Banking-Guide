import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Image, Text, KeyboardAvoidingView } from 'react-native';
import Headbar from './Components/Headbar';
import DashboardScreen from './DashboardScreen'
import AsyncStorage from '@react-native-community/async-storage';
import Sidebar from './Components/Sidebar'
import { Avatar } from 'react-native-paper'
import axios from 'axios';

import { Container, Header, Content, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';


export default class LoginScreen extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			phoneNumber: '',
			password: '',

		}
	}
	render() {
		const navigation = this.props.navigation;
		const title = 'Login';
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container1}>
				<Text style={styles.title2}>Welcome to SmartSave</Text>
				<View style={styles.logoContainer}>
					<Avatar.Image
						style={styles.logo}
                      	source={require('./images/logo.jpg')}
                      size={150}
                    />
					<Text style={styles.title}>Becoming rich is hard. Staying broke is hard. Choose your hard.</Text>
				</View>

				<View style={styles.formContainer}>
					<View style={styles.container2}>

						<TextInput
							style={styles.newinput}
							placeholder="Phone Number"
							placeholderTextColor='rgba(255,255,255,0.7)'
							returnKeyType = "next"
							onChangeText = {(text)=>this.setState({phoneNumber: text})}
							onSubmitEditing={() => this.passwordInput.focus()}
							value={this.state.phoneNumber}
							autoCapitalize="none"
							keyboardType="numeric"
						/>
						<TextInput
							style={styles.newinput}
							placeholder="Password"
							placeholderTextColor='rgba(255,255,255,0.7)'
							returnKeyType = "go"
							onChangeText = {(text)=>this.setState({password: text})}
							value={this.state.password}
							ref={(input) => this.passwordInput = input}
							secureTextEntry
						/>
						<TouchableOpacity style={styles.userBtn}>
							<Text style={styles.btnTxt} onPress={this._login}>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>

			</KeyboardAvoidingView>
		);
	}

	_login = async() => {
		axios.post("http://192.168.1.54:8080/login/check", {'phoneNumber':this.state.phoneNumber,'password':this.state.password})
					.then(response => {
						console.log('here'+response);
							if (response.data) {
									// this.setState({fullname: userInfo.fullname});
									AsyncStorage.setItem('phoneNumber',response.data.phoneNumber);
									AsyncStorage.setItem('fullName',response.data.fullname);
									AsyncStorage.setItem('username',response.data.username);
									AsyncStorage.setItem('profileImage',response.data.profileImage);
									AsyncStorage.setItem('lastDataSync',response.data.dataSyncTime);
									this.props.navigation.navigate('DrawerNavigator');
							}
					})
					.catch(error => {
							console.log('Error while fetching the transactions from sms');
					});
	}

}

const styles = StyleSheet.create({
	container1: {
		flex: 1,
		backgroundColor: '#3498db'
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
		backgroundColor: "#2980b9",
		paddingVertical: 15,
		height: 60
	},
	btnTxt: {
		fontSize: 20,
		textAlign: 'center',
		color: "white",
		fontWeight: '700'
	},
	welcome: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
		color: 'white'
	},
	logo: {
		width: 150,
		height: 150
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	formContainer: {

	},
	title: {
		color: 'white',
		marginTop: 10,
		width: 160,
		opacity: 0.9,
		textAlign: 'center'
	},
	newinput: {
		height: 50,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 10,
		color: 'white',
		paddingHorizontal: 10
	},
	container2: {
		padding: 25
	},
	title2: {
		color: 'white',
		marginTop: '30%',
		marginBottom: 10,
		opacity: 0.9,
		textAlign: 'center',
		fontSize: 30
	}
});
