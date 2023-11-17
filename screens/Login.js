import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const [maxLength, setMaxLenght] = useState(16);

  const passwordLength = () => {
    if (maxLength > 16) {
      alert("Password must not exceed 16 characters");
    }
  };

  const showPwd = () => {
    setShowPassword(!showPassword);
  };

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert("Invalid email or password.");
    }

    passwordLength();
  };

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 26 }}>Login</Text>
      <View style={{ marginTop: 40 }}>
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
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Don't have an account? Sign up here
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          forgotPassword();
        }}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
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
    width: 200,
    backgroundColor: "crimson",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  show: {
    marginLeft: 220,
  },
});
