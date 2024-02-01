import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icon from "../assets/icon.png"

import { ImagePicker, launchImageLibrary } from 'react-native-image-picker'

const Profile = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

 return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.btn} onPress={openCamera}>
          <Text style={styles.btnText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
  </View>
 )
export default Profile;

const styles = StyleSheet.create({
  container: {
    height: 250,
    textAlign: "center",
    justifyContent: "center",
    alignItems:"center"
  },
  img: {
    width: "50%",
    height: "50%",
  },
  btn: {
    backgroundColor:"crimson"
  },
  btnText: {
    color:"#fff"
  }
});