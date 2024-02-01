import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

import Profile from '../components/Profile';

const Settings = () => {
  const [name, setName] = useState([]);

  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("does not exist");
        }
      });
  }, []);

  return (
    <View style={styles.container}>

      <Profile />

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {name.firstName} {name.lastName}
      </Text>
      <Text style={{fontSize:16}}>{name.email}</Text>

      <TouchableOpacity
        onPress={() => {
          changePassword();
        }}
        style={styles.button2}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
          Change Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
        }}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff" }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    height: 30,
    width: 120,
    backgroundColor: "crimson",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  button2: {
    backgroundColor: 'crimson',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginTop:20
  }
});