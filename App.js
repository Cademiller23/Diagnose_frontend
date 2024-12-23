import React from 'react';
import { Text, View } from 'react-native';
import Home from './src/Home'
import Loading from './src/Loading'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './src/SignUp';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ presentation: 'modal', // Use modal style
        headerShown: false, // Hide header for seamless transitions
        animationEnabled: false, }}>
     
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
      </NavigationContainer>
  );
} 