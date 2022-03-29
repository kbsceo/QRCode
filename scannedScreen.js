import * as Clipboard from 'expo-clipboard';
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, {useState,useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScannedScreen() {
    const [qrData, setqrData] = useState([]);

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
  
    const copyToClipboard  = () => {

      try {
        Clipboard.setString(qrData.join("\n"));
        alert(qrData.length + '개 복사완료');
      } catch(err) {
        alert(err);
      }
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
  