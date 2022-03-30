import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, {useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import { StyleSheet } from 'react-native';

export default function HomeScreen () {
    
    const [scanned, setScanned] = useState(false);
    const [qrCodeArray, setQrCodeArray] = useState([]);
    const [hasPermisson, setHasPermisson] = useState(null);
    const isFocused = useIsFocused();

    const load = () => {
        try { 
          return AsyncStorage.getItem("serial");
        } catch (err) {
          alert(err)
        }
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

    const handleBarCodeScanned = ({type, data}) => {
      setScanned(true);
      setQrCodeArray([...qrCodeArray, data]);
      ToastAndroid.show (
        data + "\t 인식 성공",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
      
    }
    const save = async () => {
      try{
        await AsyncStorage.setItem("serial", JSON.stringify(qrCodeArray));

        ToastAndroid.show (
          qrCodeArray.length + "개 저장 완료",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      } catch(err) {
        alert(err)
      }
    };
  
    const remove = async() => {
      try {
        await AsyncStorage.removeItem("serial");
        setQrCodeArray([]);
        ToastAndroid.show (
          "모든 QR코드가 삭제 되었습니다. \n다시 스캔해주세요",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      }
      catch(err) {
        Alert.alert("경고", err);
      } finally {
      }
    };

    const check = () => {

     try {
       if(qrCodeArray != null) {
         Alert.alert("QR코드 확인", qrCodeArray.join("\n"));
       } else {
        Alert.alert("QR코드 확인", "인식된 QR코드가 없습니다.")
       }    
      } catch(err) {
       alert(err);
     }
    }

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
          
          {scanned && <Button style={styles.scannedButton}title={'스캔하기'} onPress={( ) => setScanned(false)} />}
          <TouchableOpacity style={styles.button} onPress={() => save()}>
            <Text>저장하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => remove()}>
            <Text>지우기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => check()}>
            <Text>QR 확인하기</Text>
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
        bottom :20,
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
