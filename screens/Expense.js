import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ShowExpense from '../components/ShowExpense';

const Expense = () => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

    const currentDate = new Date();
    const fullDate = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const [dateAdded, setDateAdded] = useState(fullDate);

  const addExpense = async () => {
    setDateAdded(dateAdded);

    await firebase.firestore().collection('expense_collection').doc(firebase.auth().currentUser.uid).set({
      expenseAmount,
      expenseCategory,
      dateAdded
    }).then(() => {
      alert('Expense added successfully');
    }).catch((error) => {
      alert(error.message);
    })
    setExpenseAmount('');
    setExpenseCategory('');
  }
  
  return (
    <View>
      <ShowExpense/>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 110 }}>
          Your Expenses
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <AntDesign
          name="creditcard"
          size={20}
          color="black"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Expense Amount"
          keyboardType="numeric"
          onChangeText={(expenseAmount) => setExpenseAmount(expenseAmount)}
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
          placeholder="Expense Category"
          onChangeText={(expenseCategory) => setExpenseCategory(expenseCategory)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addExpense(expenseAmount, expenseCategory, dateAdded)}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Expense

const styles = StyleSheet.create({
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