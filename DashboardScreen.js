import { Button, ScrollView, View, StyleSheet, Text , ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import { Icon, Container, Header, Content } from 'native-base'
import Headbar from './Components/Headbar';
import { Card, Title, Paragraph } from 'react-native-paper';
import FusionCharts from "react-native-fusioncharts";
import { chartData1 } from './Components/chart_components/DATA1'
import { chartData2 } from './Components/chart_components/DATA2'
import LineChart from './charts/LineChart'
import Column2dChart from './charts/Column2dChart'
import PieChart from './charts/PieChart'
import DataTables from './Components/DataTables'
import CustomList from './Components/CustomList';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
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


class DashboardScreen extends Component
{
	constructor(props) {
		super(props);
		this.state = {
				modalVisible: false,
				loader:false,
				lineChartData:[],
				barGraphData:[],
			};
	}
	setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
		console.log(visible);
  };
	loadModal=(name)=>{

		console.log(name);

	}
	extractSms(minDate,phoneNumber){
		console.log('minDate'+minDate);
		console.log('phone',phoneNumber);
		var SmsAndroid = require('react-native-android-sms');
		var filter = {
		box: 'inbox',
		minDate: minDate,
		bodyRegex: '(?i)((.*)debited(.*)Acc(.*))|((.*)credited(.*)Acc(.*))|((.*)Acc(.*)debited(.*))|((.*)Acc(.*)credited(.*))|((.*)a/c(.*)debited(.*))|((.*)a/c(.*)credited(.*))|((.*)credited(.*)a/c(.*))|((.*)debited(.*)a/c(.*))', // content regex to match
		indexFrom: 0,
		};
		var url = "http://192.168.1.54:8080/sms/analyse";
		var data = {};
		SmsAndroid.list(
		JSON.stringify(filter),
		(fail) => {
		  console.log('Failed with this error: ' + fail);
		},
		(count, smsList) => {
			axios.post(url, {'data':smsList,'phoneNumber':phoneNumber})
		        .then(response => {
							console.log('here'+response);
		            if (response) {
		                console.log(response);
		                //send_response = response;
										var d = new Date();
										console.log('date to be set',d.getTime());
										AsyncStorage.setItem('lastDataSync',JSON.stringify(d.getTime()));
										console.log('Transactions fetched successfully');
										this.getAllGraphsData(phoneNumber);
		            }
		        })
		       	.catch(error => {
		            console.log('Error while fetching the transactions from sms');
		        });
		},
		);
	}

	getAllGraphsData(phoneNumber){
		axios.post("http://192.168.1.54:8080/graph/getAllGraphsData", {'phoneNo':phoneNumber})
					.then(response => {
						console.log('here'+response);
							if (response) {
									console.log('blahhhhblahhhhblahhhhblahhhhblahhhhblahhhhblahhhhblahhhhblahhhhblahhhh',response.data );
									this.setState({lineChartData:response.data.lineChartData});
									this.setState({barGraphData:response.data.barGraphData});
									this.setState({pieChartData:response.data.pieChartData});
									this.setState({loader:false});
							}
					})
					.catch(error => {
							console.log('Error while fetching the transactions from sms');
					});
	}

	componentDidMount(){
		this.setState({loader:true});
		AsyncStorage.getItem("lastDataSync").then((value) => {
			if(value==null){
				var d = new Date();
				d.setMonth(d.getMonth() - 1);
				d.setHours(0, 0, 0);
				d.setMilliseconds(0);
				value=d.getTime();
			}
			AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
				this.extractSms(value,phoneNumber);
			})
			console.log('val'+value)
			})
			.then(res => {
					console.log('Error while connecting to the cache')
		});

	}

	render(){
		//this.listSms();
		if(this.state.loader==true){
			// return (<ActivityIndicator size='large' color="#0A1045" style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}/>);
			return (<DotIndicator color='#0A1045'/>)
		}
    const navigate = this.props.navigation;
    const title='Dashboard';
		this.visible=true;
		const recurring_transactions = [
		  {
		    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		    title: "Vodafone Mobile",
				category: "Mobile Payments",
				last_payment_date: "2020-02-18",
				amount:"Rs 450.00"
		  },
			{
		    id: "bd7acbea-c1b1-4622-aed5-3ad53abb28ba",
		    title: "Apple Music",
				category: "Music Subscriptions",
				last_payment_date: "2020-02-03",
				amount:"Rs 99.00"
		  },
			{
				id: "bd7acbea-c1b1-46c2-ae9d5-3ad53abb28ba",
				title: "Spotify",
				category: "Music Subscriptions",
				last_payment_date: "2020-02-07",
				amount:"Rs 79.00"
			},
		];
		return (
      <Container style={{backgroundColor:'#0A1045'}}>
      <Headbar navigation={ navigate } title={ title } sendSms={this.listSms} />
      <ScrollView>
      <ScrollView horizontal={true}>
      <Card style={{...styles.card,margin:5,backgroundColor: '#206a5d',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>My Budget Status</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Good</Title>
        </Card.Content>
      </Card>
      <Card style={{...styles.card,margin:5,backgroundColor: '#e94560',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>Savings Last Month</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Rs. 10000</Title>
        </Card.Content>
      </Card>
      <Card style={{...styles.card,margin:5,backgroundColor: '#40a8c4',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>Highest Spent Category</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Shopping</Title>
        </Card.Content>
      </Card>

      </ScrollView>
      <Card
        style={{...styles.card,backgroundColor: 'white'}}
      >
      <LineChart
            width='100%'
            height='350'
            xAxisName='Date'
            dataFormat='json'
            yAxisName='Amount (in rupees)'
            numberPrefix='Rs.'
            theme='fusion'
            caption='Daily Transactions'
            subCaption='Date vs Amount spent'
            data={this.state.lineChartData}
          />
			</Card>
      <Card
        style={{...styles.card,backgroundColor: 'white'}}
      >
      <Column2dChart
            width='100%'
            height='350'
            xAxisName='Transaction Mode'
            dataFormat='json'
            yAxisName='Amount'
            caption='Transactions Mode'
            subCaption='Transactions Mode vs amount'
            theme='fusion'
            data={this.state.barGraphData}
          />
						</Card>
      <Card
        style={{...styles.card,backgroundColor: 'white'}}
      >
      <PieChart width='100%'
			height='350'
			plottooltext='<b>$percentValue</b> of your total spendings were for $label'
			dataFormat='json'
			showlegend='0'
			showpercentvalues='1'
			theme='fusion'
			caption='Transactions By Category'
			legendposition='Bottom'
			usedataplotcolorforlabels='1'
			data={this.state.pieChartData}/>
			</Card>

			<Card
				style={{...styles.card,backgroundColor: 'white'}}
			>
			<Text style={styles.cardTitle}>Recurring Transactions</Text>
			<CustomList data={recurring_transactions}/>
			</Card>

			</ScrollView>
      </Container>

		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  card: {
    shadowColor: '#000',
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
		borderRadius: 10,
    elevation: 2,backgroundColor: '#f8edeb'
  },
	cardTitle: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
		fontSize:22,
		color: 'black'
  },
});
export default DashboardScreen;
