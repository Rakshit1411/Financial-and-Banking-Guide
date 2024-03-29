import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View, Button, TextInput, Image, Text, KeyboardAvoidingView } from 'react-native';
import Headbar from '../Headbar';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-paper'
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Container, Header, Content, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Register extends Component {
  constructor(props)
	{
		super(props);
		this.state = {
			phoneNumber: '',
			password: '',
      fullName: '',
      confirmPassword: '',
      primaryBank:'',
      email:'',
      loader:false,showAlert:false,errorMessage:'',
		}
	}
  _register = () => {
    console.log(this.state);

    this.setState({loader:true});
    axios.post("http://"+SERVER_URL+":8080/user/add", {'params':this.state})
					.then(response => {
            console.log('this is',response.data);
							if (response.data!="FAILED:USER ALREADY EXISTS") {
									// this.setState({fullname: userInfo.fullname});
                  console.log(response.data);
                  this.props.navigation.navigate('OtpConfirmation',{
                          phoneNumber: this.state.phoneNumber,
                          hex: response.data,
                          password:this.state.password,
                          fullName:this.state.fullName,
                          primaryBank:this.state.primaryBank,
                          email:this.state.email,
                        });
							}
              else if(response.data=="FAILED:USER ALREADY EXISTS"){
                console.log("Here");
                this.setState({errorMessage:response.data,loader:false,showAlert:true})
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

  render() {
    if(this.state.loader==true){
      // return (<ActivityIndicator size='large' color="#0A1045" style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}/>);
      return (<MaterialIndicator color='white' style={{backgroundColor:"#0A1045"}}/>)
    }
    let data = [{
      value: 'HSBC',
    }, {
      value: 'ICICI',
    }, {
      value: 'HDFC',
    }, {
      value: 'Punjab National Bank',
    }, {
      value: 'Bank of Baroda',
    }, {
      value: 'State Bank of India',
    }];
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container1}>
				<Text style={styles.title2}>Enter details to Sign Up</Text>

				<View style={styles.formContainer}>
					<View style={styles.container2}>

          <TextInput
            style={styles.newinput}
            placeholder="Full Name"
            placeholderTextColor='rgba(255,255,255,0.7)'
            returnKeyType = "next"
            onChangeText = {(text)=>this.setState({fullName: text})}
            value={this.state.fullName}
            autoCapitalize="none"
          />
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
							placeholder="Email ID"
							placeholderTextColor='rgba(255,255,255,0.7)'
							returnKeyType = "go"
							onChangeText = {(text)=>this.setState({email: text})}
							value={this.state.email}
							ref={(input) => this.email = input}
							secureTextEntry
              keyboardType="email-address"
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
            <TextInput
							style={styles.newinput}
							placeholder="Confirm Password"
							placeholderTextColor='rgba(255,255,255,0.7)'
							returnKeyType = "go"
							onChangeText = {(text)=>this.setState({confirmPassword: text})}
							value={this.state.confirmPassword}
							ref={(input) => this.confirmPassword = input}
							secureTextEntry
						/>
            <Dropdown
              icon='chevron-down'
              iconColor='black'
              label='Choose your Primary Bank'
              textColor='#0A1045'
              baseColor='#0A1045'
              itemColor='#0A1045'
              iconColor='#0A1045'
              data={data}
              style={styles.dropdown}
              onChangeText={(value, index, data)=>{this.setState({primaryBank:value})}}
            />
						<TouchableOpacity style={styles.userBtn} onPress={this._register}>
							<Text style={styles.btnTxt} >Register</Text>
						</TouchableOpacity>
            <Text style={styles.loginBtnTxt} onPress={this._login}>Click to Login</Text>

					</View>
				</View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Error"
          message={this.state.errorMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Try Again"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState({showAlert:false})
          }}
        />
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
	}
});
