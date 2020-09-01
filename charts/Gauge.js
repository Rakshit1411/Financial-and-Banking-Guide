import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

export default class Gauge extends Component {
  constructor(props) {
    super(props);
    this.apiCaller = null;
    this.state = {
      type: 'angulargauge',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {/* see data tab */}
    };
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: { uri: 'file:///android_asset/fusioncharts.html' },
      ios: require('../assets/fusioncharts.html')
    });
  }

  render() {
    return (
      <View style={styles.container1}>
        <View style={styles.chartContainer1}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 10
  },
  header1: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10
  },
  chartContainer1: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1
  }
});
