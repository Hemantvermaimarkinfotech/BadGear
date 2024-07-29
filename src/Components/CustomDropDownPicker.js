// #This code is written by Hemant Verma
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropdownPicker = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      style={{
        width: 120,
        height: 40,
        backgroundColor: 'white',
        borderColor: '#B2B2B2',
        marginLeft:20,
        marginTop:10
      }}
      dropDownContainerStyle={{ width: 120 ,marginLeft:20}} 
    />
  );
};

export default CustomDropdownPicker;
