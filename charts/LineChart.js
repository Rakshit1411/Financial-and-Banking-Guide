import { Button, ScrollView, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Icon, Container, Header, Content, Left } from 'native-base'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import FusionCharts from "react-native-fusioncharts";



export default class LineChart extends React.PureComponent
{
  constructor(props) {
    super(props);
    //STEP 3 - Chart Configurations
    const chartConfig = {
      height:props.height,
      width:props.width,
      dataFormat:props.dataFormat,
      dataSource: {
        chart: {
          caption: props.caption,
          subCaption: props.subCaption,
          xAxisName: props.xAxisName,
          yAxisName: props.yAxisName,
          numberSuffix: props.numberSuffix,
          theme: props.theme
        },
        data: props.data
      }
    };
    this.state = chartConfig;
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: "file:///android_asset/fusioncharts.html"
      },
      ios: require("../assets/fusioncharts.html")
    });
  }
	render(){
		return (
      <FusionCharts style={{backgroundColor:'grey'}}
            type='line'
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />

		);
	}
}
