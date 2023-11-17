import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { firebase } from "../config";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ShowBudget from "../components/ShowBudget";

const Budget = () => {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetDuration, setBudgetDuration] = useState("");

  const currentDate = new Date();
  const fullDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });


  const [dateAdded, setDateAdded] = useState(fullDate);
  
  const addBudget = async (
    budgetName,
    budgetAmount,
    budgetDuration,
    dateAdded
  ) => {
    setDateAdded(fullDate);

    await firebase
      .firestore()
      .collection("budget_collection")
      .doc(firebase.auth().currentUser.uid)
      .set({
        budgetName,
        budgetAmount,
        budgetDuration,
        dateAdded,
      })
      .then(() => {
        alert("Budget added successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
    setBudgetName("");
    setBudgetAmount("");
    setBudgetDuration("");
  };

  const ref = useRef();
  useEffect(() => {
    ref.current = () => {
      addBudget(budgetName, budgetAmount, budgetDuration, dateAdded);
    };
  }, [budgetName, budgetAmount, budgetDuration, dateAdded]);

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 10 }}>
        <ShowBudget />
      </View>
      <Text
        style={{
          marginLeft: 100,
          marginTop: 10,
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        Create a Budget
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
          placeholder="Budget name"
          onChangeText={(budgetName) => setBudgetName(budgetName)}
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
          placeholder="Budget Amount"
          keyboardType="numeric"
          onChangeText={(budgetAmount) => setBudgetAmount(budgetAmount)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="time" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Duration (1 week, 1 month, 1 year)"
          onChangeText={(budgetDuration) => setBudgetDuration(budgetDuration)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => ref.current?.()}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Add Budget
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Budget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 100,
  },
});
