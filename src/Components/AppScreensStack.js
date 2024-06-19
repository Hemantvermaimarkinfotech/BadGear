import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../AppStack/Home';
// import DrawerContent from './DrawerContent';
import Search from '../AppStack/Search';
import Setting from '../AppStack/Setting';
import Notification from '../AppStack/Notification';
import Cart from '../AppStack/Cart';
import Category from '../AppStack/Category';
import NewArrival from '../AppStack/NewArrival';
import ProductDetailsPage from '../AppStack/ProductDetailsPage';
import WishList from '../AppStack/WishList';
import colors from "../Utils/Colors"
import { Platform } from 'react-native'
import AntDesign from "react-native-vector-icons/Feather"
import Checkout from '../AppStack/CheckOut';
import DeliveryAddress from '../AppStack/DeliveryAddress';
import AddDeliveryAddress from '../AppStack/AddDeliveryAddress';
import Payment from '../AppStack/Payment';
import Order from '../AppStack/Order';
import HelpCenter from '../AppStack/HelpCenter';
import EditProfile from '../AppStack/EditProfile';
import Coupons from '../AppStack/Coupons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AppScreenStack = () => {

  return (
    <Stack.Navigator initialRouteName={'BottomTab'}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
      />
      
     

      <Stack.Screen
        name="NewArrivel"
        component={NewArrival}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="WishList"
        component={WishList}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="DeliveryAddress"
        component={DeliveryAddress}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="AddDeliveryAddress"
        component={AddDeliveryAddress}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{
          headerShown: false,
        }}
      />

<Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />


<Stack.Screen
        name="Coupons"
        component={Coupons}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppScreenStack;

const BottomTabNav = ({ navigation }) => (
  <Tab.Navigator
  initialRouteName="HomeStack"
  screenOptions={{
    tabBarActiveTintColor: "red",
    tabBarInactiveTintColor: "",
    tabBarStyle: {
      backgroundColor: 'white', // Set background color here
      borderWidth: 0,
      shadowColor: "gray", // Add shadow color
      shadowOpacity: 0.25, // Adjust shadow opacity as needed
      shadowRadius: 2, // Adjust shadow radius as needed
      elevation: 5,
      height:70,
      // borderTopLeftRadius: 25, // Adjusted to borderTopLeftRadius
      // borderTopRightRadius: 25, // Adjusted to borderTopRightRadius// Android only, adjust elevation as needed
    },
  }}>

    <Tab.Screen name="Home" component={Home}

      options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/house.png')}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                tintColor: focused ? "#F10C18" : "#000000",
              }}
            />
            <Text style={{fontSize: 15, fontWeight: 500, marginTop: 5, color:"#000000"}}>Home</Text>
          
          </View>
        ),
        tabBarLabel: () => null,
        headerStyle: {
          height: 120, // Set the desired height value
          shadowColor: '#fff',
        },
        // headerTitle: (props) => <TopHeader />
    // Custom header component
    headerShown: false,
      }}/>

    <Tab.Screen name="Search" component={Search} 
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
          

<Image source={require("../assets/search.png")} style={{   height: 27,
                width: 27,
                resizeMode: 'contain',
                tintColor: focused ? "#F10C18" : "#000000",
              }}/>
            <Text style={{fontSize: 15, fontWeight: 500, marginTop: 5,color:"#000000"}}>Search</Text>
          </View>
        ),
        tabBarLabel: () => null,
        headerStyle: {
          height: 120, // Set the desired height value
          shadowColor: '#fff',
        },
        // headerTitle: (props) => <TopHeader />
        // Custom header component
        headerShown: false
      }}/>

    <Tab.Screen name="Notification" component={Notification}
      options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/notification.png')}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: focused ? "#F10C18" : "#000000",
                }}
              />
              <Text style={{fontSize: 15, fontWeight: 500, marginTop: 5, color:"#000000"}}>Notification</Text>
            </View>
          ),
          tabBarLabel: () => null,
          headerStyle: {
            height: 120, // Set the desired height value
            shadowColor: '#fff',
          },
          // headerTitle: (props) => <TopHeader />
          // Custom header component
          headerShown: false
      }}
      
      />

<Tab.Screen name="Settings" component={Setting}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/account.png')}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: focused ? "#F10C18" : "#000000",
                }}
              />
              <Text style={{ fontSize: 15, fontWeight: 500, marginTop: 5,color:"#000000"}}>Settings</Text>
            </View>
          );
        },
        tabBarLabel: () => null,
        headerShown: false,
      }}
    />
      
  </Tab.Navigator>
);
const styles = StyleSheet.create({});




//   <Tab.Navigator
//     initialRouteName="HomeStack"
//     screenOptions={{
//       tabBarActiveTintColor: colors.#000000,
//       tabBarInactiveTintColor: colors.darkGrey,
//       tabBarStyle: {
//         backgroundColor: 'white', // Set background color here
//         borderWidth: 0,
//         shadowColor: colors.shadowColor, // Add shadow color
//         shadowOpacity: 0.25, // Adjust shadow opacity as needed
//         shadowRadius: 2, // Adjust shadow radius as needed
//         elevation: 5,
//         height:70,
//         // borderTopLeftRadius: 25, // Adjusted to borderTopLeftRadius
//         // borderTopRightRadius: 25, // Adjusted to borderTopRightRadius// Android only, adjust elevation as needed
//       },
//     }}>




//     <Tab.Screen name="HomeStack" component={HomeStack}
//       options={{
//         tabBarIcon: ({focused}) => (
//           <View style={{alignItems: 'center', justifyContent: 'center'}}>
//             <Image
//               source={require('../assets/images/iconImages/home.png')}
//               style={{
//                 height: 20,
//                 width: 20,
//                 resizeMode: 'contain',
//                 tintColor: focused ? colors.primary : colors.black,
//               }}
//             />
//             <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Home</Text>
//           </View>
//         ),
//         tabBarLabel: () => null,
//         headerStyle: {
//           height: 120, // Set the desired height value
//           shadowColor: '#fff',
//         },
//         // headerTitle: (props) => <TopHeader />
//         header: () => <MainHeader title="Home" navigation={navigation} />, // Custom header component
//       }}/>

//     <Tab.Screen name="Payout" component={PayoutStack} 
//       options={{
//         tabBarIcon: ({focused}) => (
//           <View style={{alignItems: 'center', justifyContent: 'center'}}>
//             <Image
//               source={require('../assets/images/iconImages/income.png')}
//               style={{
//                 height: 20,
//                 width: 20,
//                 resizeMode: 'contain',
//                 tintColor: focused ? colors.primary : colors.black,
//               }}
//             />
//             <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Payout</Text>
//           </View>
//         ),
//         tabBarLabel: () => null,
//         headerStyle: {
//           height: 120, // Set the desired height value
//           shadowColor: '#fff',
//         },
//         // headerTitle: (props) => <TopHeader />
//         header: () => <TitleHeader title="Payout" navigation={navigation} />, // Custom header component
//       }}/>

//     <Tab.Screen name="Tracking" component={TrackingStack}
//       options={{
//           tabBarIcon: ({focused}) => (
//             <View style={{alignItems: 'center', justifyContent: 'center'}}>
//               <Image
//                 source={require('../assets/images/iconImages/order-tracking.png')}
//                 style={{
//                   height: 20,
//                   width: 20,
//                   resizeMode: 'contain',
//                   tintColor: focused ? colors.primary : colors.black,
//                 }}
//               />
//               <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Tracking</Text>
//             </View>
//           ),
//           tabBarLabel: () => null,
//           headerStyle: {
//             height: 120, // Set the desired height value
//             shadowColor: '#fff',
//           },
//           // headerTitle: (props) => <TopHeader />
//           header: () => <TitleHeader title="Tracking" navigation={navigation} />, // Custom header component
//       }}/>

//     <Tab.Screen name="Settings" component={SettingsStack}
//       options={{
//         tabBarIcon: ({focused}) => (
//           <View style={{alignItems: 'center', justifyContent: 'center'}}>
//             <Image
//               source={require('../assets/images/iconImages/setting.png')}
//               style={{
//                 height: 20,
//                 width: 20,
//                 resizeMode: 'contain',
//                 tintColor: focused ? colors.primary : colors.black,
//               }}
//             />
//             <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Settings</Text>
//           </View>
//         ),
//         tabBarLabel: () => null,
//         headerStyle: {
//           height: 120, // Set the desired height value
//           shadowColor: '#fff',
//         },
//         // headerTitle: (props) => <TopHeader />
//         header: () => <TitleHeader title="Settings" navigation={navigation} />, // Custom header component
//       }}/>
      
//   </Tab.Navigator>
// );