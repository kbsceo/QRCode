import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TouchableOpacity, ScrollView} from 'react-native';
import { StyleSheet } from 'react-native';

export default function HomeScreen () {
    const [hasPermisson, setHasPermisson] = useState(null);
    const [scanned, setScanned] = useState(false);``
    const [qrCodeArray, setQrCodeArray] = useState([]);
    const isFocused = useIsFocused();
  
    const handleBarCodeScanned = ({type, data}) => {
      setScanned(true);
      setQrCodeArray([...qrCodeArray, data]);
      console.log([setQrCodeArray]);
      console.log('success');
    }
   
    useEffect(() => {
      App.load();
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
