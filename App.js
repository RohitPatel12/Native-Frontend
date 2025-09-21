// App.js
import React, { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider, UserContext } from "./context/UserContext";
// import StarterScreen from "./screens/StarterScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileSetupScreen from "./screens/ProfileSetupScreen"; // ✅ make sure this exists

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "./screens/ProductScreen";

const Stack = createStackNavigator();

function MainNavigator() {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          {/* <Stack.Screen name="Starter" component={StarterScreen} /> */}
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          {/* <Stack.Screen name="Register" component={RegisterScreen} />  */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </>
      ) : (
        <>
          
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
