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
    </Stack.Navigator>
  );
};

export default AppScreenStack;

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={props => <DrawerContent {...props} />}>
//       <Drawer.Screen
//         name="Home"
//         component={Home}
//         options={{ headerShown: false }}
//       />
//     </Drawer.Navigator>
//   );
// };

const BottomTabNav = ({}) => {
  const [focusedTab, setFocusedTab] = useState('Home');

  return (
    <Tab.Navigator
      initialRouteName="Drawer"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          let tintColor;
          let label;
          // Set icon and tint color based on the route and focus state
          if (route.name === 'Home') {
            iconName = require('../assets/house.png');
            tintColor = focused ? 'red' : 'black'; // Change tint color to blue when focused
            label = 'Home';
          } else if (route.name === 'Search') {
            iconName = require('../assets/search.png');
            tintColor = focused ? 'red' : 'black'; // Change tint color to blue when focused
            label = 'Search';
          } else if (route.name === 'Notification') {
            iconName = require('../assets/notification.png');
            tintColor = focused ? 'red' : 'black'; // Change tint color to blue when focused
            label = 'Notification';
          } else if (route.name === 'Setting') {
            iconName = require('../assets/account.png');
            tintColor = focused ? 'red' : 'black'; // Change tint color to blue when focused
            label = 'Setting';
          }

          return (
            <View style={{alignItems: 'center'}}>
              <Image
                source={iconName}
                style={{
                  width: 24,
                  height: 24,
                  tintColor,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{color: 'black', marginTop: 5}}>{label}</Text>
            </View>
          );
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ADD8E6', // Light blue background color
          height: 80,
          borderTopRadius: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
    
      />
      
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
        
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({});
