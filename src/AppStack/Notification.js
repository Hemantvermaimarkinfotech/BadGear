import React,{useState,useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,FlatList,PermissionsAndroid, Platform,SafeAreaView } from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import discountimage from "../assets/discount.png"
// import { SafeAreaView } from 'react-native-safe-area-context';
// import messaging from "@react-native-firebase/messaging"


const Notification = () => {
  const notifications = [
    { id: 1, offers: "Cashback 10%", offernext: "Get 10% cashback for the next top up", time: "5 hr ago", image: discountimage },
    { id: 2, offers: "Free Cashback 15%", offernext: "Get 15% cashback on your next purchase", time: "7:00 AM", agotim: "4 hr ago", image: discountimage },
    { id: 3, offers: "Cashback 10%", offernext: "Get 10% cashback for the next top up", time: "8:00 AM", agotim: "5 hr ago", image: discountimage },
    { id: 4, offers: "Free Cashback 15%", offernext: "Get 15% cashback on your next purchase", time: "9:00 AM", agotim: "4 hr ago", image: discountimage },
  ];

  // const [notifications, setNotifications] = useState(initialNotifications);
  // const [fcmToken, setFCMToken] = useState(null);

  // Function to request and retrieve FCM token
  // const getFCMToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     if (token) {
  //       console.log('FCM Token:', token);
  //       setFCMToken(token);
  //     } else {
  //       console.log('Failed to get FCM token.');
  //     }
  //   } catch (error) {
  //     console.log('Error getting FCM token:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Request permission for notifications
  //   const requestNotificationPermission = async () => {
  //     try {
  //       const granted = await messaging().requestPermission();
  //       if (granted) {
  //         console.log('Notification permission granted');
  //         getFCMToken(); // Get FCM token once permission is granted
  //       } else {
  //         console.log('Notification permission denied');
  //       }
  //     } catch (error) {
  //       console.log('Error requesting notification permission: ', error);
  //     }
  //   };

  //   requestNotificationPermission();

  //   // Handle foreground messages
  //   const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
  //     console.log('Notification received in foreground:', remoteMessage);
  //     setNotifications(prevNotifications => [...prevNotifications, remoteMessage]);
  //   });

  //   // Handle background messages
  //   const unsubscribeBackground = messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Notification received in background:', remoteMessage);
  //     setNotifications(prevNotifications => [...prevNotifications, remoteMessage]);
  //   });

  //   return () => {
  //     // Clean up listeners when component unmounts
  //     unsubscribeForeground();
  //     unsubscribeBackground();
  //   };
  // }, []);

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
         <Image source={require("../assets/time.png")} style={{height:14,width:14,tintColor:"#000000"}}/>
          <Text style={{ marginLeft: 5, color: "#000000", fontSize: 14 }}>{item?.time}</Text>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={"Notification"} />
      <View style={styles.header}>
        <View style={styles.headertext}>
          <Text style={{ color: "#000000", fontSize: 18, fontFamily: "Gilroy-Bold" }}>Today</Text>
          <Text style={{ color: "#F10C18", fontSize: 16, fontFamily: "Gilroy-SemiBold" }}>Mark as read</Text>
        </View>
      </View>
      <View style={{ width: "100%", marginTop: 20 }}>
        <FlatList
          data={notifications}
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
    </SafeAreaView>
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
