import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const ShowBudget = () => {
  const [budget, setBudget] = useState([]);

    useEffect(() => {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;

      const docRef = db.collection("budget_collection").doc(user.uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          const budget = doc.data();
          setBudget(budget);
        }
      });
    }, []);

  return (
    <View style={styles.budgetContainer}>
      {budget ? (
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            Your Budget
          </Text>
          <Text style={styles.budgetText}>Name: {budget.budgetName}</Text>
          <Text style={styles.budgetText}>Amount: {budget.budgetAmount}</Text>
          <Text style={styles.budgetText}>
            Duration: {budget.budgetDuration}
          </Text>
          <Text style={styles.budgetText}>Date: {budget.dateAdded}</Text>
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}
export default ShowBudget;

const styles = StyleSheet.create({
  budgetContainer: {
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
  budgetText: {
    fontSize:18
  }
})


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const budget = (
  //       await firebase
  //         .firestore()
  //         .collection("budget_collection")
  //         .doc(firebase.auth().currentUser.uid)
  //         .get()
  //     ).data();
  //     setBudget(budget);
  //   }
  //   fetchData();
  // }, []);

  // const currentDate = new Date();
  // const fullDate = currentDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  //   hour: "numeric",
  //   minute:'numeric'
  // });