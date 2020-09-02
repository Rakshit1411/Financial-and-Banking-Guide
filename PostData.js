import React, { Component } from 'react';
import axios from 'axios';
import {
    View,
    Text
} from "react-native";

var send_response: '';

export default function PostData({ url,data,headers }){
	axios.post(url, data, headers)
        .then(response => {
            if (response.data.status) {
                console.log(response);
                send_response = response;
            } 
        })
       	.catch(error => {
            console.log(error);
        });
    return(<Text>{send_response}</Text>);
}
