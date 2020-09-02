import React, { Component } from 'react';
import axios from 'axios';
import {
    View,
    Text
} from "react-native";
 
 var Data: [];

export default function GetData({ url }){
	axios.get(url)
        .then(response => {
            console.log('getting data from axios in function', response.data);
            Data = response.data;
        })
       	.catch(error => {
            console.log(error);
        });
    return(<Text>{Data}</Text>);
}
