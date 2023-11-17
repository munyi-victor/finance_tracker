import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import Wallet from './Wallet';
import Budget from './Budget';
import Income from './Income';
import Expense from './Expense';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

const Main = () => {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Wallet"
          component={Wallet}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Entypo
                    name="wallet"
                    size={24}
                    color={focused ? "crimson" : "#111"}
                  />
                  <Text
                    style={{ fontSize: 12, color: focused ? "crimson" : "#111" }}
                  >
                    WALLET
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Budget"
          component={Budget}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FontAwesome5
                    name="money-check"
                    size={24}
                    color={focused ? "crimson" : "#111"}
                  />
                  <Text
                    style={{ fontSize: 12, color: focused ? "crimson" : "#111" }}
                  >
                    BUDGET
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Income"
          component={Income}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "crimson",
                    width: 60,
                    height: 60,
                    top: -20,
                    borderRadius: 30,
                  }}
                >
                  <Entypo name="plus" size={28} color="#fff" />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Expense"
          component={Expense}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Entypo
                    name="shopping-cart"
                    size={24}
                    color={focused ? "crimson" : "#111"}
                  />
                  <Text
                    style={{ fontSize: 12, color: focused ? "crimson" : "#111" }}
                  >
                    EXPENSE
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="settings"
                    size={24}
                    color={focused ? "crimson" : "#111"}
                  />
                  <Text
                    style={{ fontSize: 12, color: focused ? "crimson" : "#111" }}
                  >
                    SETTINGS
                  </Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
  );
}

export default Main;