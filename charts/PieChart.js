import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Platform } from "react-native";
import FusionCharts from "react-native-fusioncharts";

export default class PieChart extends React.PureComponent {
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
          plottooltext: props.plottooltext,
          usedataplotcolorforlabels: props.usedataplotcolorforlabels,
          legendposition: props.legendposition,
          showpercentvalues: props.showpercentvalues,
          showlegend: props.showlegend,
          theme: props.theme,
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

  render() {
    return (
      <View style={{paddingTop:15,paddingBottom:10}}>
      <FusionCharts
            type='pie2d'
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property

          />
          </View>
    );
  }
}
