import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { firebase } from '../config';

const ShowBalance = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

    useEffect(() => {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;

      const docRef = db.collection("income_collection").doc(user.uid);

      docRef.get().then((doc) => {
        if (doc.exists) {
          const income = doc.data();
          setIncome(income);
        }
      });
    }, []);
    
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

    const balance = income.incomeAmount - expense.expenseAmount

  return (
    <View style={styles.balanceContainer}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Your Wallet Balance</Text>
      <Text style={styles.balanceDisplay}>Ksh {balance}.00</Text>
    </View>
  )
}

export default ShowBalance;

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems:'center',
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
  balanceDisplay: {
    fontSize: 20,
    fontWeight:'bold',
    // marginLeft: 28,
    backgroundColor: 'crimson',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 180,
    borderRadius:10
  }
});
