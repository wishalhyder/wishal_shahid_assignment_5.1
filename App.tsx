import React from 'react';
import { useColorScheme, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './src/HomeScreen';
import DetailScreen from './src/DetailScreen';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import AddUserScreen from './src/AddUserScreen';
import AllUsersScreen from './src/AllUsersScreen';
import DashboardScreen from './src/DashboardScreen';
import SlideScreen from './src/SlideScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="AddUser" component={AddUserScreen} />
          <Stack.Screen name="AllUsers" component={AllUsersScreen} />
          <Stack.Screen name="Slide" component={SlideScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
