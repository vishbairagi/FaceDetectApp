import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/Screens/SplashScreen';
import QRScanner from './src/Screens/QRScanner';
import ShowUserScreen from './src/Screens/ShowUserScreen';
import CaptureImage from './src/Screens/CaptureImage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="QRScanner" component={QRScanner} />
        <Stack.Screen name="ShowUserScreen" component={ShowUserScreen} />
        <Stack.Screen name="CaptureImage" component={CaptureImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}