import { Text, ScrollView, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Icon, Button, Container, Header, Content, Left } from 'native-base'

class SettingsScreen extends Component
{
	render(){
		return (

			<Container>

				<Content contentContainerStyle = {{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'

				}}>
					<Text>Settings</Text>
				</Content>
			</Container>
		);
	}
}

export default SettingsScreen;