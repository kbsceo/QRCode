import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import scannedScreen from './scannedScreen';
import HomeScreen from './HomeScreen';

export default function App() {

  const load = () => {
    try { 
        return AsyncStorage.getItem("serial");
    } catch (err) {
        alert(err)
    }
}


 const Tab = createBottomTabNavigator();
  return (
    if(!isFocused) {
      return <View></View>
    } else {  
    return (
      <View style={styles.container}>
          <View style={styles.barcodebox}>
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style = {{ height:400, width:400}} />
          </View>
          <ScrollView style={styles.listViewContainer1}>
            <Text style={styles.maintext}> {qrCodeArray.join("\n")}</Text>
          </ScrollView>
          {scanned && <Button title={'scan again?'} onPress={( ) => setScanned(false)} color='tomato'/>}
          <TouchableOpacity style={styles.button} onPress={() => save()}>
            <Text>저장하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => remove()}>
            <Text>지우기</Text>
          </TouchableOpacity>
  
          
        </View>
    );
    
    }
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="스캔하기" component={HomeScreen} />
        <Tab.Screen name="스캔내역" component={scannedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  
  );
}



