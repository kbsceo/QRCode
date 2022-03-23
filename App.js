import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScannedScreen from './ScannedScreen';
import HomeScreen from './HomeScreen';
import { StyleSheet } from 'react-native';

export default function App() {
  
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="스캔하기" component={HomeScreen} />
        <Tab.Screen name="스캔내역" component={ScannedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});



