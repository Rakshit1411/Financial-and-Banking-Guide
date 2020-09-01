import React, { Component } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { DataTable } from 'react-native-paper';
export default class DataTables extends Component {
  constructor(props) {
    super(props);
    console.log('called again');
    console.log(props);
    this.headers = props.headersForTable;
    this.keys = props.keysForTable;
    this.state = {
        modalVisible: props.visible
      };
  }


  setModalVisible = (visible) => {
    console.log('here now');
    console.log(visible)
    this.setState({ modalVisible: visible });
  };

  setColumn(colData,key){
    return (

      <DataTable.Cell>{colData[key]}</DataTable.Cell>

    )
  };
  setRow(rowData){
    return (<DataTable.Row>
              {
                this.keys.map((data,idx) => {
                  return this.setColumn(rowData,data)
                })
              }
            </DataTable.Row>

    )
  };
  setHeaders(header){
    return (
      <DataTable.Title>
      {header}
      </DataTable.Title>
    )
  }

  render() {
    const { modalVisible } = this.state;
    const data = this.props.data;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Raw Data</Text>

              <DataTable style={{height:'80%'}}>
              <DataTable.Header>
              {
                this.headers.map((head,index) => {
                  return this.setHeaders(head);
                })
              }
              </DataTable.Header>
              <ScrollView>

              {
                data.map((data1,idx) => {
                  return this.setRow(data1);
                })
              }

              </ScrollView>

              <DataTable.Pagination
              page={1}
              numberOfPages={1}
              onPageChange={page => {
              console.log(page);
              }}
              label="All Data"
              />
              </DataTable>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "green" }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Download</Text>
                </TouchableHighlight>

                <Text style={{color:'black',margin:5}} onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>Cancel</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,height:'50%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,height:'50%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 50
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  cellStyle: {
    flex: 1,
    margin: 10,
  },
});
