import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";

const ShowExpense = () => {
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    const docRef = db.collection("expense_collection").doc(user.uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        const expense = doc.data();
        setExpense(expense);
      }
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const expense = (
  //       await firebase
  //         .firestore()
  //         .collection("expense_collection")
  //         .doc(firebase.auth().currentUser.uid)
  //         .get()
  //     ).data();
  //     setExpense(expense);
  //   };
  //   fetchData();
  // }, []);

  return (
    <View style={styles.expenseContainer}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Your Expenses</Text>
      {expense ? (
        <Text style={styles.expenseDisplay}>Ksh{expense.expenseAmount}.00</Text>
      ) : (
        <Text>Loading expenses..</Text>
      )}
      <Text style={{ fontSize: 20 }}>
        <Text style={{fontWeight:'bold'}}>Date:</Text> {expense.dateAdded}
      </Text>
    </View>
  );
};

export default ShowExpense;

const styles = StyleSheet.create({
  expenseContainer: {
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: 350,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "crimson",
    marginTop: 10,
  },
  expenseDisplay: {
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 28,
    backgroundColor: "crimson",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 150,
    borderRadius: 10,
  },
});
