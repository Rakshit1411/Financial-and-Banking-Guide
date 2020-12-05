

import { Button, ScrollView, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Icon, Container, Header, Content, Left } from 'native-base'
//import SmsAndroid from 'react-native-android-sms';


export default class Sms extends Component
{
  constructor(props) {
    super(props);
    //STEP 3 - Chart Configurations

  }
  sendSms(){
    console.log('sending sms');
    var SmsAndroid = require('react-native-android-sms');
    var text = "Hello ... This is test message from Rakshit Sharma, Please ignore !!!!!";
    var addressList = {
        addressList: [
            "7014477935"
        ]
    }

    SmsAndroid.send(JSON.stringify(addressList), text, (fail) => {
        console.log("OH Snap: " + fail)
    },
    (status) => {
        console.log('Status: ', status);
    });
  }
	// render(){
	// 	return (
  //     <View style={{paddingTop:15}}>
  //     <FusionCharts
  //           type='line'
  //           width={this.state.width}
  //           height={this.state.height}
  //           dataFormat={this.state.dataFormat}
  //           dataSource={this.state.dataSource}
  //           libraryPath={this.libraryPath} // set the libraryPath property
  //         />
  //         </View>
  //
	// 	);
	// }
}
