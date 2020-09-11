import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection:'column'}}>
        <Text style={styles.title}><Text style={{fontWeight: "bold",fontSize:20}}>{item.title}</Text></Text>
        <Text style={styles.title}><Text style={{fontWeight: "bold"}}>Payment Date</Text>-{item.last_payment_date}</Text>
      </View>
    <Text style={{...styles.title,flexDirection: 'row',fontSize:20,marginLeft:40,marginRight:20}}>{item.amount}</Text>

    </View>
  </TouchableOpacity>
);

const CustomList = ({data}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item , index}) => {
    const backgroundColorArray = ['#f77f00','#4ea8de','#b56576','#6c757d','#fff3b0'];

    const backgroundColor = backgroundColorArray[index];
    console.log(index)
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor:'#43658b' }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius:10
  },
  title: {
    fontSize: 12,
    marginLeft: 20,
    color: 'white'
  },
});
export default CustomList;
