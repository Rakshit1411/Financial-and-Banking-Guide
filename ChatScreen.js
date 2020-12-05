import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import Headbar from './Components/Headbar';
import { Container } from 'native-base';


import { dialogflowConfig } from './env';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRecDbTa9Scvumvu2kndRqlKYHoNt-BjkFPmw&usqp=CAU'
};

class ChatScreen extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: "Unhealthy Transaction Pattern Identified. \n From your transactions pattern, we have analysed that you started spending, on an average\, Rs.5000 every day\, from the last 2 months\, to the same merchant \'Online Rummy Play\' and we found out that these transactions are related to gambling.\If this keeps on going, you will end up in a financial crisis within next 10 days",
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    const navigate = this.props.navigation;
    const title = 'Assistant Bot';
    return (
      <Container>
      <Headbar navigation={ navigate } title={ title }/>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
      </Container>
    );
  }
}

export default ChatScreen;
