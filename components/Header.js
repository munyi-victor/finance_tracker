import { View, Text } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View style={{ marginLeft: 80 }}>
      <Text style={{ fontWeight: "bold", fontSize: 28, color:'#fff' }}>{props.name}</Text>
    </View>
  );
};

export default Header;
