import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../Components/MainHeader';
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const Checkout = ({navigation}) => {

    const order = [
        { name: "Kenworth Red Skull Hoodie", price: "2000" },
        { name: "Kenworth Red Skull Hoodie", price: "2000" },

        
    ]

    const handleOrderSubmission = () => {
        // Logic for submitting the order
        // You can add API calls or any other necessary logic here
        console.log("Order submitted!");
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader title={"Checkout"} />

            <ScrollView style={{ marginHorizontal: 10 }}>
                <View style={styles.mainView}>
                    <TouchableOpacity style={styles.row}  onPress={()=>navigation.navigate("DeliveryAddress")}>

                        <View style={{ flexDirection: "row", justifyContent: "center" }}>

                            <View style={{ backgroundColor: "#F10C18", height: 55, borderRadius: 8, width: 55, justifyContent: "center", alignItems: "center" }}>
                                <Entypo name="location-pin" size={22} color={"#fff"} />
                            </View>

                            <View style={{ justifyContent: "center", marginLeft: 10 }}>
                                <Text style={{ color: "#000000", fontSize: 15 }}>Delivery Address</Text>
                                <Text style={{ color: "#000000", fontSize: 12, fontFamily: "Gilroy-Regular", marginVertical: 5 }}>323 Main Street, Anytown, USA 12345</Text>
                            </View>

                        </View>

                        <MaterialIcons name="keyboard-arrow-right" size={30} color={"#000000"} />
                    </TouchableOpacity>

                    <View style={{ height: 1, width: "100%", marginTop: 15, backgroundColor: "#707070", opacity: 0.3 }} />

                    <TouchableOpacity style={styles.row}>

                        <View style={{ flexDirection: "row", justifyContent: "center" }}>

                            <View style={{ backgroundColor: "#F10C18", height: 55, borderRadius: 8, width: 55, justifyContent: "center", alignItems: "center" }}>
                                <MaterialIcons name="payment" size={22} color={"#fff"} />
                            </View>

                            <TouchableOpacity style={{ justifyContent: "center", marginLeft: 10 }} onPress={()=>navigation.navigate("Payment")}>
                                <Text style={{ color: "#000000", fontSize: 15 }}>Payment</Text>
                                <Text style={{ color: "#000000", fontSize: 12, fontFamily: "Gilroy-Regular", marginVertical: 5 }}><Text > X X X X  X X X X  X X X X  3436</Text></Text>
                            </TouchableOpacity>

                        </View>

                        <MaterialIcons name="keyboard-arrow-right" size={30} color={"#000000"} />
                    </TouchableOpacity>

                    <View style={{ height: 1, width: "100%", marginTop: 15, backgroundColor: "#707070", opacity: 0.3 }} />

                    <View style={{ marginTop: 20 }}>
                        {order.map((item, index) => (
                            <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                <Text style={styles.orderText}>{item.name}</Text>
                                <Text style={styles.orderText}>$ {item.price}</Text>
                            </View>
                        ))}
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        <Text style={styles.orderText}>Discount</Text>
                        <Text style={styles.orderText}>$ 1699</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        <Text style={styles.orderText}>Shipping</Text>
                        <Text style={[styles.orderText, { color: "#159e42" }]}>FREE Delivery </Text>

                    </View>

                    <View style={{ height: 1, width: "100%", marginTop: 20, backgroundColor: "#707070", opacity: 1 }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                        <Text style={[styles.orderText,{fontSize:22,fontFamily:"Gilroy-Bold"}]}>My Order</Text>
                        <Text style={[styles.orderText,{fontSize:22,fontFamily:"Gilroy-Bold"}]}>$ 3599</Text>

                    </View>

                </View>
            </ScrollView>
            <View style={{ height: 1, width: "100%", marginTop: 10, backgroundColor: "#707070", opacity: 0.3, position: "absolute", bottom: 90 }} />
            <View style={{ height: 80, justifyContent: "center", position: "absolute", bottom: 10, width: "100%" }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Submit Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCFC",
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
    mainView: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        alignItems: "center"
    },
    orderText: {
        color: "#000000",
        fontSize: 18,
        fontFamily: "Gilroy-Medium",
        marginTop: 10
    },
 
});
