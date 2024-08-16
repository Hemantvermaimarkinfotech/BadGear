import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import {AuthContext} from '../Components/AuthProvider';
import {AirbnbRating} from 'react-native-ratings';
import axios from 'react-native-axios';
import Loader from '../Components/Loader';

const AddReview = ({route}) => {
  const productDetails = route.params;
  console.log('productId', productDetails?.productId);
  const {userToken} = useContext(AuthContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = value => {
    setRating(value);
  };

  const reviews = ['Terrible', 'Bad', 'OK', 'Good', 'Amazing'];

  const addReview = () => {
    if (isNaN(rating) || rating < 1 || rating > 5) {
      Alert.alert('Warning', 'Please select a valid rating.');
      return;
    }

    if (!text.trim().length) {
      Alert.alert('Warning', 'Please provide a review.');
      return;
    }

    setLoading(true);
    let data = new FormData();
    data.append('product_id', productDetails?.productId);
    data.append('rating', rating);
    data.append('review', text);

    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;

    let config = {
      method: 'post',
      url: 'https://bad-gear.com/wp-json/addProductReview/v1/addProduct_Review',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${tokenToUse}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        Alert.alert('Success', 'Review added successfully.');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'Add Review'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
          <View style={styles.headerView}>
            <View
              style={{
                height: 70,
                width: 70,
                borderWidth: 1,
                borderColor: '#D8D8D8',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: productDetails?.productDetails.product_img}}
                style={{height: 60, width: 60, borderRadius: 5}}
              />
            </View>

            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                  fontFamily: 'Gilroy-SemiBold',
                }}>
                {productDetails?.productDetails.product_name}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000000',
                    fontFamily: 'Gilroy-Medium',
                  }}>
                  ${productDetails?.productDetails.price}
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={{
              fontSize: 16,
              color: '#000000',
              fontFamily: 'Gilroy-Medium',
              marginTop: 20,
            }}>
            Rating
          </Text>

          <View style={{marginTop: 10}}>
            <View style={styles.ratingContainer}>
              <AirbnbRating
                count={5} // Total number of stars to be displayed
                reviews={reviews} // Reviews labels to be shown for each star level
                defaultRating={rating} // Initial rating
                size={30} // Size of the rating stars
                onFinishRating={handleRating} // Function to handle the rating selected
              />
              <Text style={styles.selectedRatingText}>
                Selected rating: {rating > 0 ? reviews[rating - 1] : ''} / 5
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 16,
              color: '#000000',
              fontFamily: 'Gilroy-Medium',
              marginTop: 20,
            }}>
            Message
          </Text>

          <View style={styles.Textarea}>
            <TextInput
              style={styles.textareaContainer}
              multiline={true}
              numberOfLines={10}
              onChangeText={text => setText(text)}
              value={text}
              placeholder={'Write'}
              placeholderTextColor={'#818181'}
              underlineColorAndroid={'transparent'}
              textAlignVertical={'top'}
              textAlign={'left'}
            />
          </View>

          {loading ? (
            <View
              style={{
                height: 55,
                width: '100%',
                alignSelf: 'center',
                borderColor: '#F10C18',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                marginBottom: 80,
              }}>
              <Loader />
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => addReview()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFCFC',
    flex: 1,
  },
  mainView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  headerView: {
    flexDirection: 'row',
  },
  Textarea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  textareaContainer: {
    height: 120,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    textAlignVertical: 'top',
    textAlign: 'left',
    fontSize: 16,
  },
  button: {
    height: 55,
    width: '100%',
    alignSelf: 'center',
    borderColor: '#F10C18',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    marginTop: 30,
    marginBottom: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  dropdown: {
    height: 45,
    borderColor: '#DEDEDE',
    borderWidth: 1.2,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 10,
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
    color: '#888888',
    fontFamily: 'Montserrat-Medium',
  },

  ratingContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 5,
    height: 150,
    justifyContent: 'center',
  },

  selectedRatingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Gilroy-Medium',
  },
  dropdownList: {
    borderColor: '#DEDEDE',
    borderWidth: 1.2,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});
