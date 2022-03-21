import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useCallback } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, SafeAreaView, ScrollView} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';






const HeaderButtonComponent = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={23}
    color="#FFF"
    {...props}
  />
);
  

const HomeScreen = () => {
  const [hasPermisson, setHasPermisson] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrCodeArray, setQrCodeArray] = useState([]);


  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    //setText(text);
    setQrCodeArray([...qrCodeArray, data]);
    console.log([qrCodeArray]);
  }

  

  useEffect(() => {
    load();
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermisson(status === 'granted');
    })();
  }, []);

  if (hasPermisson === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permisson</Text>
        <StatusBar style="auto" />
      </View>
    )
    
  }
  if(hasPermisson === false) {
    return (
      <View style={styles.container}>
        <Text>No acess to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermisson()}/>
      </View>
    )
  }


  const save = async () => {
    try{
      await AsyncStorage.setItem("serial", JSON.stringify(qrCodeArray));
    
      
    } catch(err) {
      alert(err)
    }
  };

  const remove = async() => {
    try {
      await AsyncStorage.removeItem("serial");
      setQrCodeArray([]);
    }
    catch(err) {
      alert(err);
    } finally {
    }
  };

 

  return (
    <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style = {{ height:400, width:400}} />
        </View>
        <ScrollView style={styles.listViewContainer1}>
          <Text style={styles.maintext}> {JSON.stringify(qrCodeArray).replace(/\"/gi, "").replace(/\]/gi,"").replace(/\[/gi,"").replaceAll("\,","\n")}</Text>
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

const ScannedScreen = () => {

  const [qrData, setqrData] = useState([]);

  const copyToClipboard  = () => {

    Clipboard.setString(JSON.stringify(qrData).replaceAll("\]", "").replaceAll("\"","").replaceAll("\[","").replaceAll("\,","\n"), null, 2);
  };
  
   useFocusEffect(
    useCallback(() => {
      (async () => {
        const loadQrData =  await load()
        setqrData(JSON.parse(loadQrData))
       })();
    })
   )
  return (

    <View style={styles.scannedScreenContainer}>
      
      <ScrollView style={styles.listViewContainer}>
      
        {qrData && qrData.map((qr,index) => { // map () array 모든 원소에 대해 특정 변형 작업 후 리턴해주는 함수
          return(
          
            <View style={styles.container1} key={index}>
              <Text>{qr}</Text>
            </View>
          );
        })}
      
      </ScrollView>
      <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard()}>
          <Text>복사</Text>
        </TouchableOpacity>
      
    </View>
  );
}

const load = () => {
  try { 
    return AsyncStorage.getItem("serial");
  } catch (err) {
    alert(err)
  }
}

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
  },
  container1 : {
    
    paddingTop: 22

  },
  scannedScreenContainer : {

    flex :1,
    flexDirection : 'column'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  

  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width:300,
    overflow:'hidden',
    borderRadius:30,
    backgroundColor:'tomato'
  },

  maintext: {
    fontSize :16,
    margin:20

  },

  button : {
    backgroundColor : "#575DD9",
    alignItems : "center",
    justifyContent : "center",
    alignSelf : "stretch",
    paddingVertical : 12,
    paddingHorizontal : 32,
    marginTop : 32,
    marginHorizontal :32,
    borderRadius : 6

  },
  copyButton : {
    backgroundColor : "#575DD9",
    marginTop : 32,
    height :40,
    borderRadius : 6,
    paddingVertical :12,
    justifyContent : 'center',
    alignItems :"center"
  }, 
  listViewContainer : {
    flex :1, // 남는 공간 내가 다 먹을거임
    flexDirection : "column",
    marginHorizontal : 20
  },
  listViewContainer1 : {
    flex :1, // 남는 공간 내가 다 먹을거임
    flexDirection : "column",
    marginHorizontal : 50
  }

});
