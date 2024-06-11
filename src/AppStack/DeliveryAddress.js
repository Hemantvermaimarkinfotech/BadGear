import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import MainHeader from '../Components/MainHeader';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
// Dummy JSON data
const addressesData = [
  {
    id: '1',
    type: 'home',
    name: 'Home Address',
    address: '323 Main Street, Anytown, USA 12345',
    icon: 'home'
  },
  {
    id: '2',
    type: 'office',
    name: 'Office Address',
    address: '3436 Example St, Anytown, USA 12345',
    icon: 'location-pin'
  },
  
];

const DeliveryAddress = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // Load JSON data
    setAddresses(addressesData);
  }, []);

  const handleRadioPress = (id) => {
    setSelectedId(id);
  };

  const renderItem = ({ item }) => (
    <View key={item.id}>
      <TouchableOpacity style={styles.row} onPress={() => handleRadioPress(item.id)}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={[styles.iconContainer, selectedId === item.id ]}>
            <Entypo name={item.icon} size={22} color={"#fff"} />
          </View>
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ color: "#000000", fontSize: 15 }}>{item.name}</Text>
            <Text style={{ color: "#000000", fontSize: 12, fontFamily: "Gilroy-Regular", marginVertical: 5 }}>{item.address}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 10 }}>
          {selectedId === item.id ? (
            <MaterialIcons name="radio-button-checked" size={24} color={"red"} />
          ) : (
            <MaterialIcons name="radio-button-unchecked" size={24} color={"red"} />
          )}
        </View>
      </TouchableOpacity>
      <View style={{ height: 1, width: "100%", marginTop: 15, backgroundColor: "#707070", opacity: 0.3 }} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={"Delivery Address"} />
      
      <View>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      {/* Add Address Button */}
      <TouchableOpacity style={styles.addAddressButton} onPress={()=>navigation.navigate("AddDeliveryAddress")} >
     <View style={{flexDirection:"row",alignItems:"center"}}>
     <EvilIcons name="plus" size={24} color={"#000000"} />
        <Text style={styles.addAddressButtonText}>Add Address</Text>
     </View>

     <MaterialIcons name="keyboard-arrow-right" size={30} color={"#000000"} />
      </TouchableOpacity>
      </View>
      
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Checkout")}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFC",
  },
  listContainer: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#F10C18",
    height: 55,
    borderRadius: 8,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomButtonContainer: {
    height: 80,
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  button: {
    height: 55,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#F10C18',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F10C18",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  addAddressButton: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor:"#707070",
    borderWidth:1,
    marginTop:20,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:20,

   
  },
  addAddressButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    marginLeft:10
  },
});
