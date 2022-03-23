import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import scannedScreen from './scannedScreen';
import HomeScreen from './HomeScreen';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="스캔하기" component={HomeScreen} />
        <Tab.Screen name="스캔내역" component={scannedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  
  );
}



