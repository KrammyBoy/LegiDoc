import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { icons } from '../../constants'
import { ToastAndroid } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const Saving = ({uri, date, prediction }: any) => {

    let thumbnail = uri;

    const handleClipboard = async () => {
        ToastAndroid.show("Predicted text copied to clipboard!",ToastAndroid.SHORT)
        copyToClipboard()
    }
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(prediction);
    }

    return (
        <>
        <View
        style={{
          backgroundColor: "#D9D9D9",
          marginTop: 20,
          width: "90%",
          height: 300,
          borderRadius: 10,
          alignSelf: "center",
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 10,
        }}
        >
            <Text style={{
                color: '#5FAFCA',
                fontFamily: 'Inter-Medium'
            }}>   Prediction</Text>

            <ScrollView style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                width: '95%',
                borderRadius: 10,
                height: 200,
                padding: 10
            }}>
                <Text>{prediction}</Text>
            </ScrollView>
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: '#9fafca',
                    height: 50,
                    width: 100,
                    padding: 3,
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                    borderRadius: 10,
                    left: 200
                }}
                onPress={handleClipboard}
            >
                <Image
                    source={icons.clipboard}
                    resizeMode='contain'
                    style={{
                        tintColor: '#143d7d',
                        height: 25,
                        width: 25,
                        alignSelf: 'center'
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
        </>
    )
}

export default Saving

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        alignSelf: 'center',
    }
})