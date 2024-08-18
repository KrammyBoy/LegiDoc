import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../../constants/'
import { ToastAndroid } from 'react-native'
import * as Clipboard from 'expo-clipboard';



const Modal = ({image, date, prediction}: any) => {
    const handleClipboard = async () => {
        ToastAndroid.show("Predicted text copied to clipboard!",ToastAndroid.SHORT)
        copyToClipboard()
    }
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(prediction);
    }
  
    return (
    <View style={{
        backgroundColor: '#9fafca',
        width: '75%',
        borderRadius: 25,
        height: '90%',
        padding: 10,
        flexDirection: 'column',
        marginBottom: 0,
        alignSelf: 'center',
    }}>
        <View
            style={{
                backgroundColor: "rgba(51, 54, 52, 0.3)",
                width: '90%',
                borderRadius: 20,
                height: 250,
                justifyContent: 'center',
                alignSelf: 'center'
            }}
        >
            <Image
                    source={{uri: image}}
                    resizeMode='stretch'
                    style={{
                        borderRadius: 20,
                        height: 250,
                        width: '100%',
                        alignSelf: 'center'
                    }}
            />         
        </View>
        <Text style={{
            alignSelf: 'center',
            fontFamily: 'Inter-SemiBold',  
        }}
        >Date Created: {date}</Text>
        <ScrollView style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 10,
                height: 200,
                width: '90%',
                padding: 10
            }}>
                <Text>{prediction}</Text>
        </ScrollView>
        <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    height: 50,
                    width: 100,
                    padding: 3,
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                    borderRadius: 10,
                    left: 170
                }}
                onPress={handleClipboard}
            >
                <Image
                    source={icons.clipboard}
                    resizeMode='contain'
                    style={{
                        tintColor: 'white',
                        height: 25,
                        width: 25,
                        alignSelf: 'center',
                        marginRight: 10,
                    }}
                />
                <Text style={{
                    fontSize: 12,
                    fontFamily: "Inter-Thin",
                    alignSelf: 'center',
                    color: 'white'
                }}>
                      COPY
                </Text>
            </TouchableOpacity>           

    </View>
  )
}

export default Modal

const styles = StyleSheet.create({})