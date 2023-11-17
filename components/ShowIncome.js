import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { firebase } from '../config';

const ShowIncome = () => {
    const [income, setIncome] = useState([]);

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

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const income = (
    //       await firebase
    //         .firestore()
    //         .collection("income_collection")
    //         .doc(firebase.auth().currentUser.uid)
    //         .get()
    //     ).data();
    //     setIncome(income);
    //   };
    //   fetchData();
    // }, []);

  return (
    <View style={styles.incomeContainer}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Your Income
      </Text>
      {income ?<Text style={styles.incomeDisplay}>Ksh {income.incomeAmount}.00</Text> : <Text>Loading income</Text>}
    </View>
  );
}

export default ShowIncome;

const styles = StyleSheet.create({
  incomeContainer: {
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
  incomeDisplay: {
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 28,
    backgroundColor: "crimson",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 180,
    borderRadius: 10,
  },
});