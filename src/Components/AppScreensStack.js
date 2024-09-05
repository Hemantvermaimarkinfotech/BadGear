// #This code is written by Hemant Verma

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../AppStack/Home';
import Search from '../AppStack/Search';
import Setting from '../AppStack/Setting';
import Notification from '../AppStack/Notification';
import NewArrival from '../AppStack/NewArrival';
import Category from '../AppStack/Category';
import ProductDetailsPage from '../AppStack/ProductDetailsPage';
import Cart from '../AppStack/Cart';
import WishList from '../AppStack/WishList';
import Checkout from '../AppStack/CheckOut';
import DeliveryAddress from '../AppStack/DeliveryAddress';
import AddDeliveryAddress from '../AppStack/AddDeliveryAddress';
import Payment from '../AppStack/Payment';
import Order from '../AppStack/Order';
import HelpCenter from '../AppStack/HelpCenter';
import EditProfile from '../AppStack/EditProfile';
import Coupons from '../AppStack/Coupons';
import AntDesign from 'react-native-vector-icons/Feather';
import AddReview from '../AppStack/AddReview';
import SingleCategory from '../AppStack/SingleCategoy';
import Splash from '../Normal/Splash';
import Login from '../Normal/Login';
import SignUp from '../Normal/SignUp';
import ForgetPassword from '../Normal/ForgetPassword';
import SubscriptionShop from '../Normal/SubscriptionShop ';
import Choice from '../Normal/Choice';
import Welcome from '../Normal/Welcome';
import orderDetails from '../AppStack/OrderDetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();



const BottomTabNav = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#F10C18', 
      tabBarInactiveTintColor: '#000000',
      tabBarStyle: {
        backgroundColor: '#FFFFFF', 
        height: 90, 
        elevation: 5, 
   
      },
      tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 5,
      },
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 ,width:80}}>
            <Image
              source={require('../assets/house.png')}
              style={{
                // height: 25,
                // width: 26,
                resizeMode: 'contain',
                tintColor: focused ? '#F10C18' : '#000000',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                marginTop: 2,
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Home
            </Text>
          </View>
        ),
        tabBarLabel: () => null,
        headerStyle: {
          height: 120,
          shadowColor: '#fff',
        },
        headerShown: false,
      }}
    />
    
    <Tab.Screen
      name="Category"
      component={Category}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 ,width:80}}>
            <Image
              source={require('../assets/categoryimg.png')}
              style={{
                // height: 26,
                // width: 26,
                resizeMode: 'contain',
                tintColor: focused ? '#F10C18' : '#000000',
              }}
            />
            <Text
              style={{
                fontSize: 13,
                marginTop: 2,
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Categories
            </Text>
          </View>
        ),
        tabBarLabel: () => null,
        headerStyle: {
          height: 120, 
          shadowColor: '#fff',
        },
        headerShown: false,
      }}
    />
    
    <Tab.Screen
      name="Notification"
      component={NewArrival}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 ,width:80}}>
            <Image
              source={require('../assets/shopping-bag.png')}
              style={{
                height: 27,
                width: 26,
                tintColor: focused ? '#F10C18' : '#000000',
              }}
            />
            <Text
              style={{
                fontSize: 13,
                marginTop: 2,
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
              }}>
              New Arrivals
            </Text>
          </View>
        ),
        tabBarLabel: () => null,
        headerStyle: {
          height: 120, 
          shadowColor: '#fff',
        },
        headerShown: false,
      }}
    />
    
    <Tab.Screen
      name="Settings"
      component={Setting}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 ,width:80}}>
            <Image
              source={require('../assets/account.png')}
              style={{
                // height: 26,
                // width: 26,
                tintColor: focused ? '#F10C18' : '#000000',
                resizeMode:"contain"
              }}
            />
            <Text
              style={{
                fontSize: 13,
                marginTop: 2,
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Setting
            </Text>
          </View>
        ),
        tabBarLabel: () => null,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);





const AppScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTab">
   
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewArrival"
        component={NewArrival}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleCategory"
        component={SingleCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeliveryAddress"
        component={DeliveryAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDeliveryAddress"
        component={AddDeliveryAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Coupons"
        component={Coupons}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReview}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="OrderDetails"
        component={orderDetails}
        options={{headerShown: false}}
      />

      
       

      
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AppScreenStack;
