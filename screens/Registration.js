import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const showPwd = () => {
    setShowPassword(!showPassword);
  }

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            firstName,
            lastName,
            email,
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 23 }}>Register Here!</Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={showPassword}
          maxLength={16}
          minLength={6}
        />

        <TouchableOpacity onPress={showPwd} style={styles.show}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "crimson" }}>
            {showPassword ? "Show password" : "Hide password"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "crimson",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  show: {
    marginLeft: 220,
  },
});
