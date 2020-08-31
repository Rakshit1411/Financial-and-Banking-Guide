import React, { Component } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

class FetchData extends Component
{
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			fromAxios: false,
			axiosData: null
		};
	}

	goForAxios = () => {

        this.setState({
            loading: true,

        })
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                console.log('getting data from axios', response.data);
                this.setState({
                    loading: false,
                    axiosData: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    FlatListSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    }

    renderItem = (data) => {
        return (
            <TouchableOpacity>
                <Text>{data.item.name}</Text>
                <Text>{data.item.email}</Text>
                <Text>{data.item.company.name}</Text>
            </TouchableOpacity>
        )

    }

    render()
    {
    	const { loading, fromAxios, axiosData } = this.state
    	return(
    		<View>
    		<Text>Fetch data</Text>
    		<Text>{axiosData}</Text>
            </View>

    	);
    }
}

export default FetchData;