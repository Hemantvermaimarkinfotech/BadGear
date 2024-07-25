import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
  Button,
  ActivityIndicator
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import {AuthContext} from '../Components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { CommonActions, useNavigation } from '@react-navigation/native';
const Setting = () => {
  const navigation = useNavigation();
  const {userToken, setUserToken} = useContext(AuthContext);
  console.log("userToken",userToken?.token)
  const [profileData, setProfileData] = useState();
  const [loading,setLoading]=useState(false)

   // Function to check if the token is a dummy token
   const isDummyToken = () => {
    return userToken === 'dummy-token';
  };

  const shareContent= async () => {
    try {
      const result = await Share.share({
       title: 'App link',
  message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
  url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  
  const getProfile = async () => {
    setLoading(true);
    // const tokenToUse = isDummyToken() ? 'dummy-token' : userToken?.token; // Adjust how you fetch the token based on your logic
    const tokenToUse = isDummyToken() ? 'dummy-token' : (userToken && userToken.token ? userToken.token : userToken);

    try {
      const response = await axios.get(
        'https://bad-gear.com/wp-json/get-userProfile-api/v1/get_userProfile',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${tokenToUse}`,
          },
        },
      );
  
      const responseData = response.data.data;
      console.log('Response Data:', responseData);
      setProfileData(responseData);
    } catch (error) {
      console.log('Error fetching Profile:', error);
      // Handle error appropriately
    } finally {
      setLoading(false); // Set loading state to false regardless of success or error
    }
  };
  
  useEffect(() => {
    console.log('hello');
    if (!isDummyToken()) {
      getProfile();
    }
  }, []); // Empty dependency array means this effect runs only once on mount
  
  const Logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userData');
    AsyncStorage.removeItem('billingAddress');
    AsyncStorage.removeItem('shippingAddress');
    AsyncStorage.removeItem('cartItems');
    AsyncStorage.removeItem('totalAmount');
  };

  // const LogIn = () => {
  //   if (isDummyToken()) {
  //     console.log("jmjmjmikm,ik")
  //     // setUserToken(null);
  //     // AsyncStorage.removeItem('userData');
  //     navigation.reset({
  //       index: 4, // Index of the Login screen
  //       routes: [{ name: 'Login' }],
  //     });
  //   }
  // };
 


  const LogIn = () => {
    navigation.reset({
      index: 5, // Index of the Login screen
      routes: [{ name: 'Login' }],
    });
  };
  


  const [isEnabled, setIsEnabled] = useState(false);
  const renderProfileContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F10C18" />
        </View>
      );
    }
  
    if (profileData) {
      return (
        <>
          <ScrollView>
            <View style={styles.accountheader}>
              <View style={styles.subaccount}>
                <View>
                  <Image
                    source={require('../assets/user-profile.jpg')}
                    style={{ height: 70, width: 70, borderRadius: 35 }}
                  />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Gilroy-Bold',
                      fontSize: 20,
                    }}
                  >
                    {profileData[0]?.userName.charAt(0).toUpperCase() +
                      profileData[0]?.userName.slice(1)}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 12,
                      fontFamily: 'Gilroy-Medium',
                    }}
                  >
                    {profileData[0]?.userEmail}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile', { profileData })}
              >
                <Image
                  source={require('../assets/edit.png')}
                  style={{ height: 28, width: 25, tintColor: '#F10C18' }}
                />
              </TouchableOpacity>
            </View>
  
            <View style={styles.servicebox}>
              <TouchableOpacity
                style={styles.subservicebox}
                onPress={() => navigation.navigate('Order')}
              >
                <Image
                  source={require('../assets/package.png')}
                  style={{ height: 25, width: 25, tintColor: '#F10C18' }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: 'Gilroy',
                    fontWeight: 600,
                    marginTop: 5,
                  }}
                >
                  Order
                </Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={styles.subservicebox}
                onPress={() => navigation.navigate('WishList')}
              >
                <Image
                  source={require('../assets/heart2.png')}
                  style={{ height: 20, width: 25, tintColor: '#F10C18' }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: 'Gilroy',
                    fontWeight: 600,
                    marginTop: 5,
                  }}
                >
                  WishList
                </Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={styles.subservicebox}
                onPress={() => navigation.navigate('HelpCenter')}
              >
                <Image
                  source={require('../assets/headset.png')}
                  style={{ height: 25, width: 25, tintColor: '#F10C18' }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: 'Gilroy',
                    fontWeight: 600,
                    marginTop: 5,
                  }}
                >
                  Help Center
                </Text>
              </TouchableOpacity>
            </View>
  
            <View
              style={{
                height: 1,
                backgroundColor: '#CCC',
                width: '100%',
                marginTop: 15,
                opacity: 0.6,
              }}
            />
  
            <View
              style={{
                marginHorizontal: 15,
                width: '95%',
                alignSelf: 'center',
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 20,
                }}
              >
                Account Setting
              </Text>
  
              <ScrollView>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() =>
                    navigation.navigate('EditProfile', { profileData })
                  }
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Image
                        source={require('../assets/people.png')}
                        style={{ height: 25, width: 25, tintColor: '#000000' }}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                        }}
                      >
                        Edit Profile
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/arrow-right.png')}
                    style={{ height: 22, width: 22, tintColor: '#000000' }}
                  />
                </TouchableOpacity>
  
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    marginTop: 15,
                    backgroundColor: '#CCC',
                    opacity: 0.6,
                  }}
                />
{/*   
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => navigation.navigate('DeliveryAddress')}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Image
                        source={require('../assets/location.png')}
                        style={{ height: 25, width: 25, tintColor: '#000000' }}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                        }}
                      >
                        Saved Addresses
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/arrow-right.png')}
                    style={{ height: 22, width: 22, tintColor: '#000000' }}
                  />
                </TouchableOpacity>
  
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    marginTop: 15,
                    backgroundColor: '#CCC',
                  }}
                /> */}
  
                {/* <TouchableOpacity
                  style={styles.row}
                  onPress={() => navigation.navigate('Notification')}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Image
                        source={require('../assets/bell.png')}
                        style={{ height: 25, width: 25, tintColor: '#000000' }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                        }}
                      >
                        Notification
                      </Text>
                      <View
                        style={{
                          justifyContent: 'center',
                          backgroundColor: '#F10C18',
                          alignItems: 'center',
                          marginLeft: 10,
                          height: 25,
                          width: 25,
                          borderRadius: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontFamily: 'Gilroy-Medium',
                            fontSize: 12,
                          }}
                        >
                          5
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require('../assets/arrow-right.png')}
                    style={{ height: 22, width: 22, tintColor: '#000000' }}
                  />
                </TouchableOpacity> */}
  
          
  
                <TouchableOpacity
                  style={[styles.row, {}]}
                  onPress={() => Logout()}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Image
                        source={require('../assets/logout.png')}
                        style={{ height: 25, width: 25, tintColor: '#000000' }}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                        }}
                      >
                        Log Out
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/arrow-right.png')}
                    style={{ height: 22, width: 22, tintColor: '#000000' }}
                  />
                </TouchableOpacity>
  
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    marginTop: 15,
                    backgroundColor: '#CCC',
                    opacity: 0.6,
                    marginBottom: 80,
                  }}
                />
              </ScrollView>
            </View>
          </ScrollView>
        </>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.accountheader}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text
                style={{
                  color: '#000000',
                  fontSize: 18,
                  fontFamily: 'Gilroy-Medium',
                }}
              >
                Log in to get exclusive offers
              </Text>
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 90,
                  borderRadius: 5,
                  backgroundColor: '#F10C18',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => Logout()}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Gilroy-Medium',
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
  
          <View
            style={{
              height: 1,
              backgroundColor: '#CCC',
              width: '100%',
              marginTop: 15,
              opacity: 0.6,
            }}
          />
  
          <View
            style={{
              marginHorizontal: 15,
              width: '95%',
              alignSelf: 'center',
              marginTop: 15,
            }}
          >
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 20,
              }}
            >
              Account Setting
            </Text>
  
            <ScrollView>
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('HelpCenter')}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Image
                      source={require('../assets/headset.png')}
                      style={{ height: 25, width: 25, tintColor: '#000000' }}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 15,
                        fontFamily: 'Gilroy',
                        fontWeight: 600,
                      }}
                    >
                      Help Center
                    </Text>
                  </View>
                </View>
                <Image
                  source={require('../assets/arrow-right.png')}
                  style={{ height: 22, width: 22, tintColor: '#000000' }}
                />
              </TouchableOpacity>
  
              <View
                style={{
                  height: 1,
                  width: '100%',
                  marginTop: 15,
                  backgroundColor: '#CCC',
                  opacity: 0.6,
                }}
              />
  
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('Notification')}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Image
                      source={require('../assets/bell.png')}
                      style={{ height: 25, width: 25, tintColor: '#000000' }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      marginLeft: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 15,
                        fontFamily: 'Gilroy',
                        fontWeight: 600,
                      }}
                    >
                      Notification
                    </Text>
                    <View
                      style={{
                        justifyContent: 'center',
                        backgroundColor: '#F10C18',
                        alignItems: 'center',
                        marginLeft: 10,
                        height: 25,
                        width: 25,
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy-Medium',
                          fontSize: 12,
                        }}
                      >
                        5
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require('../assets/arrow-right.png')}
                  style={{ height: 22, width: 22, tintColor: '#000000' }}
                />
              </TouchableOpacity>
  
              <View
                style={{
                  height: 1,
                  width: '100%',
                  marginTop: 15,
                  backgroundColor: '#CCC',
                  opacity: 0.6,
                }}
              />
            </ScrollView>
          </View>
        </ScrollView>
      );
    }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'Setting'} />
      {/* <Button title="Share" onPress={shareContent} /> */}
      {/* <TouchableOpacity onPress={shareContent}>
        <Text>bitpmm</Text>
      </TouchableOpacity> */}
      {renderProfileContent()}
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
    width: '100%',
  },
  accountheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  subaccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
    width: '100%',
  },
  subservicebox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '30%',
    borderColor: '#F10C18',
    borderWidth: 1,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  loadingContainer:{
    justifyContent:"center",
    alignItems:"center",
    flex:1
  }
});




