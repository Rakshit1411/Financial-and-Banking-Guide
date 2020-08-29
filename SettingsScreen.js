import { Text, ScrollView, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Icon, Button, Container, Header, Content, Left } from 'native-base'
import Headbar from './Components/Headbar';

class SettingsScreen extends Component
{
	render(){
		const navigate = this.props.navigation;
		const title='Settings';
		return (

			<Container>
				<Headbar navigation={ navigate } title={title}/>
				<Content contentContainerStyle = {{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'

				}}>
					<Text>Settings for this tab</Text>
				</Content>
			</Container>
		);
	}
}

export default SettingsScreen;
