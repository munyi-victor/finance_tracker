import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "../config";
import DropDownPicker from "react-native-dropdown-picker";

const Income = () => {
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");

  const currentDate = new Date();
  const fullDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const [dateAdded, setDateAdded] = useState(fullDate);

  const addIncome = async (incomeAmount, incomeCategory, dateAdded) => {
    setDateAdded(dateAdded);

    await firebase
      .firestore()
      .collection("income_collection")
      .doc(firebase.auth().currentUser.uid)
      .set({
        incomeAmount,
        incomeCategory,
        dateAdded,
      })
      .then(() => {
        alert("Income added successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
    setIncomeAmount("");
    setIncomeCategory("");
  };

  // const options = [
  //   { label: "Option 1", value: "option-1" },
  //   { label: "Option 2", value: "option-2" },
  //   { label: "Option 3", value: "option-3" },
  // ];

  return (
    <View style={styles.incomeContainer}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginLeft: 110 }}>
        Your income
      </Text>
      <View style={styles.inputContainer}>
        <AntDesign
          name="creditcard"
          size={20}
          color="black"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Income Amount"
          keyboardType="numeric"
          onChangeText={(incomeAmount) => setIncomeAmount(incomeAmount)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="attach-money"
          size={20}
          color="black"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Income Category"
          onChangeText={(incomeCategory) => setIncomeCategory(incomeCategory)}
        />
      </View>

      {/* <View>
        <DropDownPicker
          items={[
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
            { label: "Option 3", value: "option-3" },
          ]}
          value={incomeCategory}
          onValueChange={(value) => setIncomeCategory(value)}
          style={{width:200}}
        />
      </View> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => addIncome(incomeAmount, incomeCategory, dateAdded)}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Add Income</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Income;

const styles = StyleSheet.create({
  incomeContainer: {
    marginLeft: 10,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "crimson",
    backgroundColor: "#eee",
    paddingHorizontal: 15,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 10,
    left: 10,
    marginRight: 20,
  },
  icon: {
    marginRight: 8,
    marginTop: 13,
  },
  input: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "crimson",
    width: 140,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 110,
  },
});
