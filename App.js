import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Header from "./components/Header";
import Main from "./screens/Main";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="Finance Help" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: "crimson",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="Finance Help" />,
            headerStyle: {
              height: 100,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: "crimson",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: () => <Header name="Finance Help" />,
          headerStyle: {
            height: 100,
            borderBottomLeftRadius:20,
            borderBottomRightRadius: 20,
            backgroundColor: "crimson",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
