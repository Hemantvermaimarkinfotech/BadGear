import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,FlatList} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import discountimage from "../assets/discount.png"
import AntDesign from "react-native-vector-icons/AntDesign"

const Notification = () => {
  const data = [
    { id: 1, offers: "Cashback 10%", offernext: "Get 10% cashback for the next top up", time: "5 hr ago", image: discountimage },
    { id: 2, offers: "Free Cashback 15%", offernext: "Get 15% cashback on your next purchase", time: "7:00 AM", agotim: "4 hr ago", image: discountimage },
    { id: 3, offers: "Cashback 10%", offernext: "Get 10% cashback for the next top up", time: "8:00 AM", agotim: "5 hr ago", image: discountimage },
    { id: 4, offers: "Free Cashback 15%", offernext: "Get 15% cashback on your next purchase", time: "9:00 AM", agotim: "4 hr ago", image: discountimage },
    
  ];

  const renderdata = ({ item }) => (
    <View style={styles.voucher}>
      <View style={{ width: "100%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between",}}>
        <View style={{ flexDirection: "row", marginLeft:10}}>
          <Image source={item?.image} style={{ height: 50, width: 50 }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item?.offers}</Text>
            <Text style={styles.subtext}>{item?.offernext}</Text>
          </View>
        </View>


      </View>
      <View style={{ flexDirection: "row", height: 20, alignItems: "center" ,position:"absolute",right:10,top:15}}>
          <AntDesign name="clockcircleo" size={14} color={"#000000"} />
          <Text style={{ marginLeft: 5, color: "#000000", fontSize: 14 }}>{item?.time}</Text>
        </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TitleHeader title={"Notification"} />
      <View style={styles.header}>
        <View style={styles.headertext}>
          <Text style={{ color: "#000000", fontSize: 18, fontFamily: "Gilroy-Bold" }}>Today</Text>
          <Text style={{ color: "#F10C18", fontSize: 16, fontFamily: "Gilroy-SemiBold" }}>Mark as read</Text>
        </View>
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <FlatList
          data={data}
          renderItem={renderdata}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={[styles.headertext, { width: "95%", alignSelf: "center" }]}>
        <Text style={{ color: "#000000", fontSize: 18, fontFamily: "Gilroy-Bold" }}>Yesterday</Text>
        <Text style={{ color: "#F10C18", fontSize: 16, fontFamily: "Gilroy-SemiBold" }}>Mark as read</Text>
      </View>
      {/* <View style={{ width: "100%", marginTop: 20 }}>
        <FlatList
          data={data}
          renderItem={renderdata}
          keyExtractor={(item, index) => `key-${index}`}
        />
      </View> */}
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFC"
  },
  header: {
    width: "95%",
    alignSelf: "center",
    marginTop: 20
  },
  headertext: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  voucher: {
    height: 85,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderBottomColor: "#DDD",
    width: "100%",
    justifyContent: "center",
  
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Gilroy-Bold"
  },
  subtext: {
    color: "#b7b7b7",
    marginVertical: 5
  }
});
