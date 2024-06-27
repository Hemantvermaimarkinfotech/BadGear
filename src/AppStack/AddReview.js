import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import {Dropdown} from 'react-native-element-dropdown';
import {AuthContext} from '../Components/AuthProvider';
import DropDownPicker from 'react-native-dropdown-picker';
import {AirbnbRating} from 'react-native-ratings';


const AddReview = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleRating = value => {
    setRating(value);
    setIsOpen(false);
  };
  const reviews =
    rating > 0
      ? ['Add Rating', 'Terrible', 'Bad', 'OK', 'Good', 'Amazing']
      : 'pleade add';
  const dropdownItems = [
    {label: '1 Star', value: 1},
    {label: '2 Stars', value: 2},
    {label: '3 Stars', value: 3},
    {label: '4 Stars', value: 4},
    {label: '5 Stars', value: 5},
  ];

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

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'AddReview'} />
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
              source={require('../assets/cat3.png')}
              style={{height: 60, width: 60, borderRadius: 5}}
            />
          </View>

          <View style={{marginLeft: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
              }}>
              LumbarCloud™ Hybrid
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                  fontFamily: 'Gilroy-Medium',
                }}>
                $45
              </Text>
              <View
                style={{
                  height: 25,
                  width: 40,
                  flexDirection: 'row',
                  backgroundColor: '#F4F4F4',
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#000000',
                    fontFamily: 'Gilroy-Medium',
                  }}>
                  4
                </Text>
                <Image
                  source={require('../assets/star.png')}
                  style={{height: 12, width: 12, marginLeft: 5}}
                />
              </View>
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
              reviews={reviews}
              defaultRating={rating} // Initial rating
              size={30} // Size of the rating stars
              onFinishRating={handleRating} // Function to handle the rating selected
            />
            <Text style={styles.selectedRatingText}>
              Selected rating: {rating} / 5
            </Text>
          </View>
          <DropDownPicker
            open={isOpen}
            value={rating}
            items={dropdownItems}
            setOpen={setIsOpen}
            setValue={handleRating}
            setItems={null}
            placeholder="Select Rating"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            dropDownContainerStyle={styles.dropdownList}
          />
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

        {/* {loading ? 
             (   <TouchableOpacity style={styles.button}>
             <Loader/>
         </TouchableOpacity>):(
              <TouchableOpacity style={styles.button} onPress={()=>updateProfile()}>
              <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
             )} */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom:80
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
    fontFamily:"Gilroy-Medium"
  },
  dropdownList: {
    borderColor: '#DEDEDE',
    borderWidth: 1.2,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});
