import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Image, Text, KeyboardAvoidingView } from 'react-native';
import Headbar from '../Headbar';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-paper'
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Container, Header, Content, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import OTPTextView from 'react-native-otp-textinput';

export default class OtpConfirmation extends Component {
  constructor(props)
	{
		super(props);
		this.state = {
			phoneNumber: '',
      number:'',
      hex:'',
		}
    console.log('these are props',props.navigation.state.params.hex)
	}
  _verify = () => {
    console.log(this.state);
    axios.post("http://192.168.1.54:8080/user/verify", {'phoneNumber':this.state.phoneNumber,'password':this.state.password})
					.then(response => {
						console.log('here'+response);
							if (response.data) {
									// this.setState({fullname: userInfo.fullname});\
									this.props.navigation.navigate('LoginScreen');
							}
					})
					.catch(error => {
							console.log('Error while fetching the transactions from sms');
					});
  }
  _login = () => {
    console.log(this.state);
    this.props.navigation.navigate('LoginScreen');
  }

  componentDidMount(){
    this.setState({phoneNumber:this.props.navigation.state.params.phoneNumber,hex:this.props.navigation.state.params.hex});


	}

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container1}>
				<Text style={styles.title2}>Enter OTP</Text>

				<View style={styles.formContainer}>
					<View style={styles.container2}>


            <OTPTextView
                      ref={(e) => (this.number = e)}
                      containerStyle={styles.textInputContainer}
                      handleTextChange={(text) => this.setState({number: text})}
                      inputCount={6}
                      textInputStyle={styles.roundedTextInput}
                      keyboardType="numeric"
                      tintColor='#f0ad4e'
                    />

						<TouchableOpacity style={styles.userBtn}>
							<Text style={styles.btnTxt} onPress={this._verify}>Verify</Text>
						</TouchableOpacity>
            <Text style={styles.loginBtnTxt} onPress={this._login}>Click to Login</Text>

					</View>
				</View>

			</KeyboardAvoidingView>
    )
  }

}


const styles = StyleSheet.create({
	container1: {
		flex: 1,
		backgroundColor: '#0A1045'
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
  dropdown: {
		backgroundColor: "rgba(255,255,255,0.7)",
    width: "100%",
		padding: 0,
		marginBottom: 10
	},
	userBtn: {
		backgroundColor: "#f0ad4e",
		paddingVertical: 15,
		height: 60,
	},
	btnTxt: {
		fontSize: 20,
		textAlign: 'center',
		color: "black",
		fontWeight: '700'
	},
  loginBtnTxt: {
    fontSize: 15,
    textAlign: 'center',
    color: "white",
    marginTop:5
  },
	registerTxt: {
		marginTop: 5,
		fontSize: 15,
		textAlign: 'center',
		color: "white",
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
	},
  textInputContainer: {
  marginBottom: 20,
},
roundedTextInput: {
  borderRadius: 10,
  borderWidth: 4,
  color:'white'
},
});
