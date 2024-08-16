import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';

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
          <Image
            source={
              collapsed
                ? require("../assets/down-arrow.png") // Collapsed state icon
                : require("../assets/upload.png") // Expanded state icon
            }
            style={[
              styles.icon,
              !collapsed && styles.expandedIcon // Apply expandedIcon style when not collapsed
            ]}
          />
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
    borderBottomWidth: 1,
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
    color: "#000000",
    fontFamily: "Gilroy-SemiBold",
  },
  icon: {
    height: 25,
    width: 25,
    tintColor: "#000000",
  },
  expandedIcon: {
    height: 12, // Adjust the height as needed
    width: 12,  // Adjust the width as needed
    marginRight:5
  },
  content: {
    padding: 15,
  },
});

export default Accordion;
