import { View, Text } from 'react-native'
import React from 'react';
import ShowBudget from '../components/ShowBudget';
import ShowBalance from '../components/ShowBalance';
import ShowExpense from '../components/ShowExpense';
import ShowIncome from '../components/ShowIncome';

const Wallet = () => {
  return (
    <View style={{ marginLeft: 10, alignItems:'center' }}>
      <View>
        <ShowBalance/>
      </View>

      <View>
        <ShowIncome/>
      </View>

      <View>
        <ShowExpense/>
      </View>

      <View style={{marginTop:40}}>
        <ShowBudget/>
      </View>
    </View>
  )
}

export default Wallet