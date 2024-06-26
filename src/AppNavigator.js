// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Normal/Welcome';
// Import your screens
import Splash from './Normal/Splash';
import Choice from './Normal/Choice';
import SubscriptionShop from './Normal/SubscriptionShop ';
import Login from './Normal/Login';
import SignUp from './Normal/SignUp';
import ForgetPassword from './Normal/ForgetPassword';
import Home from './AppStack/Home';
import Category from './AppStack/Category';
import NewArrival from './AppStack/NewArrival';
import ProductDetailsPage from './AppStack/ProductDetailsPage';
import Cart from './AppStack/Cart';
import WishList from './AppStack/WishList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
      <Stack.Screen name="Choice" component={Choice} options={{headerShown:false}}/>
      <Stack.Screen name="Subscription" component={SubscriptionShop} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Category" component={Category} options={{headerShown:false}}/>
      <Stack.Screen name="NewArrivals" component={NewArrival} options={{headerShown:false}}/>
      <Stack.Screen name="ProductDetails" component={ProductDetailsPage} options={{headerShown:false}}/>
      <Stack.Screen name="Cart" component={Cart} options={{headerShown:false}}/>
      <Stack.Screen name="WishList" component={WishList} options={{headerShown:false}}/> */}
    </Stack.Navigator>
  );


  
};

export default AppNavigator;
