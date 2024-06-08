import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import OrderImage from '../assets/Arrival1.png';
const Order = () => {
  const [activeTab, setActiveTab] = useState('All Orders');

  const renderScreen = () => {
    switch (activeTab) {
      case 'All Orders':
        return <AllOrdersScreen />;
      case 'On Delivery':
        return <OnDeliveryScreen />;
      case 'Completed':
        return <CompletedScreen />;
      default:
        return null;
    }
  };

  const TabButton = ({title}) => (
    <TouchableOpacity
  style={[
    styles.tabButton,
    activeTab === title && styles.activeTabButton,
  ]}
  onPress={() => setActiveTab(title)}>
  <Text
    style={[
      styles.tabButtonText,
      activeTab === title && styles.activeTabButtonText, // Apply activeTabButtonText style when the tab is active
    ]}>
    {title}
  </Text>
</TouchableOpacity>

  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TitleHeader title={'Order'} />
      </View>
      <View style={styles.tabContainer}>
        <TabButton title="All Orders" />
        <TabButton title="On Delivery" />
        <TabButton title="Completed" />
      </View>
      <View style={styles.screenContainer}>{renderScreen()}</View>
    </SafeAreaView>
  );
};

const data = [
  {id: '1', title: 'Order 1'},
  {id: '2', title: 'Order 2'},
  {id: '3', title: 'Order 3'},
  // Add more data as needed
];

const allorder = [
  {
    id: '1',
    name: 'Woman Sleep suits by Femall clothing',
    status: 'OnDelivery',
    status2: 'On the way by Courir [H Stefunis]',
    image: OrderImage,
  },
  {
    id: '2',
    name: 'Woman Sleep suits by Femall clothing',
    status: 'OnDelivery',
    status2: 'On the way by Courir [H Stefunis]',
    image: OrderImage,
  },
  {
    id: '3',
    name: 'Brown woman shirts by cocklet cloth',
    status: 'Completed',
    status2: 'Order recieved by [Louis Stefinis]',
    image: OrderImage,
  },
  // Add more data as needed
];

const OnDelivery = [
    {
      id: '1',
      name: 'Woman Sleep suits by Femall clothing',
      status: 'OnDelivery',
      status2: 'On the way by Courir [H Stefunis]',
      image: OrderImage,
    },
   
    // Add more data as needed
  ];

  const Completed = [
    {
      id: '1',
      name: 'Woman Sleep suits by Femall clothing',
      status: 'Cancelled',
      status2: 'On the way by Courir [H Stefunis]',
      image: OrderImage,
    },
    {
      id: '2',
      name: 'Woman Sleep suits by Femall clothing',
      status: 'OnDelivery',
      status2: 'On the way by Courir [H Stefunis]',
      image: OrderImage,
    },
    {
      id: '3',
      name: 'Brown woman shirts by cocklet cloth',
      status: 'Completed',
      status2: 'Order recieved by [Louis Stefinis]',
      image: OrderImage,
    },
    // Add more data as needed
  ];
const renderItem = ({item}) => (
  <View style={styles.allorder}>
    <View style={styles.row}>
      <View style={{width:"85%"}}>
        <Text
          style={{
            color: '#000000',
            fontFamily: 'Gilroy',
            fontWeight: 600,
            fontSize: 14,
          }}>
          #123456754
        </Text>
        <View style={{marginTop:15}}>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Gilroy-SemiBold',
              fontWeight: 600,
              fontSize: 14,
            }}>
            {item?.name}
          </Text>
        </View>
      </View>

      
      <View syle={{height:80,width:"40%%"}}>
        <Image
          source={item?.image}
          style={{height: 60, width: 60, borderRadius: 8}}
        />
      </View>
    </View>

    <View style={{flexDirection:"row",alignItems:"center",marginTop:15,paddingHorizontal:15,justifyContent:"space-between"}}>
    <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>Grey Varient</Text>
    <View style={{flexDirection:"row",alignItems:"center"}}>
    <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:700,marginRight:20}}>1x</Text>
    <Text style={{color:"#0D775E",fontSize:16,fontFamily:"Gilroy",fontWeight:700}}>$47.7</Text>
    </View>
    </View>

    <View style={[styles.row,{alignItems:"center",position:"absolute",bottom:20}]}>
    <View style={{height:50,width:"40%",borderRadius:8,backgroundColor:"#F10C18",justifyContent:"center",alignItems:"center"}}>
    <Text style={{color:"#fff",fontSize:16}}>{item?.status}</Text>
    </View>
    <View style={{width:"55%"}}>
    <Text style={{color:"#6a6a6a",fontSize:15,fontFamily:"Gilroy",fontWeight:600}}>{item?.status2}</Text>
    </View>
    </View>
  </View>
);

const renderOnDelivery = ({item}) => (
    <View style={styles.allorder}>
      <View style={styles.row}>
        <View>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Gilroy',
              fontWeight: 600,
              fontSize: 14,
            }}>
            #123456754
          </Text>
          <View style={{marginTop:15}}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
                fontWeight: 600,
                fontSize: 16,
              }}>
              {item?.name}
            </Text>
          </View>
        </View>
  
        
        <View syle={{borderWidth: 1, marginLeft: 20,header:80,width:80,backgroundColor:""}}>
          <Image
            source={item?.image}
            style={{height: 60, width: 60, borderRadius: 8}}
          />
        </View>
      </View>
  
      <View style={{flexDirection:"row",alignItems:"center",marginTop:15,paddingHorizontal:15,justifyContent:"space-between"}}>
      <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>Grey Varient</Text>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:700,marginRight:20}}>1x</Text>
      <Text style={{color:"#0D775E",fontSize:16,fontFamily:"Gilroy",fontWeight:700}}>$47.7</Text>
      </View>
      </View>
  
      <View style={[styles.row,{alignItems:"center",position:"absolute",bottom:20}]}>
      <View style={{height:50,width:"40%",borderRadius:8,backgroundColor:"#F10C18",justifyContent:"center",alignItems:"center"}}>
      <Text style={{color:"#fff",fontSize:16}}>{item?.status}</Text>
      </View>
      <View style={{width:"55%"}}>
      <Text style={{color:"#6a6a6a",fontSize:15,fontFamily:"Gilroy",fontWeight:600}}>{item?.status2}</Text>
      </View>
      </View>
    </View>
  );

  const renderCompleted = ({item}) => (
    <View style={styles.allorder}>
      <View style={styles.row}>
        <View>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Gilroy',
              fontWeight: 600,
              fontSize: 14,
            }}>
            #123456754
          </Text>
          <View style={{marginTop:15}}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Gilroy-SemiBold',
                fontWeight: 600,
                fontSize: 16,
              }}>
              {item?.name}
            </Text>
          </View>
        </View>
  
        
        <View syle={{borderWidth: 1, marginLeft: 20,header:80,width:80,backgroundColor:""}}>
          <Image
            source={item?.image}
            style={{height: 60, width: 60, borderRadius: 8}}
          />
        </View>
      </View>
  
      <View style={{flexDirection:"row",alignItems:"center",marginTop:15,paddingHorizontal:15,justifyContent:"space-between"}}>
      <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>Grey Varient</Text>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:700,marginRight:20}}>1x</Text>
      <Text style={{color:"#0D775E",fontSize:16,fontFamily:"Gilroy",fontWeight:700}}>$47.7</Text>
      </View>
      </View>
  
      <View style={[styles.row,{alignItems:"center",position:"absolute",bottom:20}]}>
      <View style={{height:50,width:"40%",borderRadius:8,backgroundColor:"#F10C18",justifyContent:"center",alignItems:"center"}}>
      <Text style={{color:"#fff",fontSize:16}}>{item?.status}</Text>
      </View>
      <View style={{width:"55%"}}>
      <Text style={{color:"#6a6a6a",fontSize:15,fontFamily:"Gilroy",fontWeight:600}}>{item?.status2}</Text>
      </View>
      </View>
    </View>
  );

const AllOrdersScreen = () => {
  return (
    <FlatList
      data={allorder}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
};

const OnDeliveryScreen = () => {
  return (
    <FlatList
      data={OnDelivery}
      renderItem={renderOnDelivery}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
};

const CompletedScreen = () => {
  return (
    <FlatList
      data={Completed}
      renderItem={renderCompleted}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTabButton: {
    backgroundColor: '#F10C18',
  },
  tabButtonText: {
    color: '#000000',
    fontSize:15,
    fontFamily:"Gilroy",
    fontWeight:'600'
  },
  activeTabButtonText: {
    color: '#fff',
    fontSize:15,
    fontFamily:"Gilroy",
    fontWeight:'600'
  },
  screenContainer: {
    flex: 1,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  allorder: {
    height: 200,
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
    width:"100%"
  },
  insiderow: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  
});

export default Order;
