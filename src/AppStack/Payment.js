import React, { useEffect ,useState} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../Components/MainHeader';
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import { Dropdown } from 'react-native-element-dropdown';
import Feather from "react-native-vector-icons/Feather"

const Payment = ({navigation}) => {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const order = [
        { name: "Kenworth Red Skull Hoodie", price: "2000" },
        { name: "Kenworth Red Skull Hoodie", price: "2000" },

        
    ]
    const data = [
        {label: 'January', value: '1'},
        {label: 'February', value: '2'},
        {label: 'March', value: '3'},
        {label: 'April', value: '4'},
        {label: 'May', value: '5'},
        {label: 'June', value: '6'},
        {label: 'July', value: '7'},
        {label: 'August', value: '8'},
        {label: 'September', value: '9'},
        {label: 'October', value: '10'},
        {label: 'November', value: '11'},
        {label: 'December', value: '12'},
      ];

    const handleOrderSubmission = () => {
        // Logic for submitting the order
        // You can add API calls or any other necessary logic here
        console.log("Order submitted!");
    }

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader title={"Payment"} />

            <ScrollView style={{ marginHorizontal: 10 }}>
             <View style={{width:"95%",alignSelf:"center",marginTop:15}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <Image source={require("../assets/discount.png")} style={{height:25,width:25}}/>
            <Text style={{fontSize:18,fontFamily:"Gilroy-Bold",color:"#000000",marginLeft:10}}>Bank Offer</Text>
            </View>

            <View style={{flexDirection:"row",marginTop:15}}>
            <AntDesign name="arrowright" size={18} color={"#6a6a6a"}/>
            <View style={{width:"85%"}}>
            <Text numberOfLines={5} style={{fontSize:15,fontFamily:"Gilroy-Medium",color:"#000000",marginLeft:10,lineHeight:20}}>10% instant Savings on Citi Credit and Debit Cards on a min spend of Rs 3,0000. TCA</Text>
            </View>
            </View>


            <View style={{ marginTop: 15 }}>
            <Dropdown
  style={[styles.dropdown, isFocus && { borderColor: '#DEDEDE' }]}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  inputSearchStyle={styles.inputSearchStyle}
  iconStyle={[styles.iconStyle]}
  data={data}
  search
  maxHeight={500}
  minHeight={20}
  labelField={null}
  valueField={null}
  renderLeftIcon={({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require("../assets/cash.png")} style={{ width: 25, height: 25 }} />
      <Text style={{ marginLeft: 5, fontSize: 18, color: "#000000", fontFamily: "Gilroy-SemiBold", marginLeft: 15 }}>Credit/Debit Card</Text>
    </View>
  )}
  renderRightIcon={() => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <AntDesign name="down" size={18} color="#F10C18" />
    </View>
  )}
  onFocus={() => setIsFocus(true)}
  onBlur={() => setIsFocus(false)}
  onChange={item => {
    setValue(item.value);
    setIsFocus(false);
  }}
/>

</View>





             </View>
            </ScrollView>
            <View style={{ height: 1, width: "100%", marginTop: 10, backgroundColor: "#707070", opacity: 0.3, position: "absolute", bottom: 90 }} />
            <View style={{ height: 80, justifyContent: "center", position: "absolute", bottom: 10, width: "100%" }}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("DeliveryAddress")}>
                    <Text style={styles.buttonText}>Submit Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Payment;

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
    dropdown: {
        height: 50,
        borderColor: '#DEDEDE',
        borderWidth: 1.2,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 14,
        color:"#888888",
        fontFamily:"Montserrat-Medium"
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 27,
        height: 27,
        tintColor:"#F10C18"
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
 
});
