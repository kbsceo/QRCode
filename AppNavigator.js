import React, {useState, useEffect,useCallback } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


    export function HomeScreen() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.barcodebox}>
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style = {{ height:400, width:400}} />
            </View>
            <Text style={styles.maintext}> {JSON.stringify(qrCodeArray, null, 2)}</Text>
        
            {scanned && <Button title={'scan again?'} onPress={( ) => setScanned(false)} color='tomato'/>}
            <Text> {name} </Text>

            <TouchableOpacity style={styles.button} onPress={() => save()}>
            <Text>save it</Text>
            
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => remove()}>
            <Text>지워줘 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => copyToClipboard()}>
            <Text>복사해버렸</Text>
            </TouchableOpacity>
        </View>
        );
    }
    
    export function ScannedListView() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
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
      
        }
    });