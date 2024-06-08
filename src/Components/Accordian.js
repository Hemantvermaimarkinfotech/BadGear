import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Accordion = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity onPress={toggleExpanded}>
          <Icon name={collapsed ? 'expand-more' : 'expand-less'} size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
          {children}
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth:1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color:"#000000",
    fontFamily:"Gilroy-SemiBold"

  },
  content: {
    padding: 15,
    
  },
});

export default Accordion;
