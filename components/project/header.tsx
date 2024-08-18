import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../../constants'
import { images } from '../../constants'


const HeaderRow = () => {
  return (
    <View
    style={{
      padding: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 60,
      backgroundColor: "#143D7D",
    }}
  >
    <Image
      source={images.legidoc}
      resizeMode="contain"
      style={{
        height: 45,
        width: 45,
        position: "absolute",
        left: 10,
        backgroundColor: "white",
        borderRadius: 40,
      }}
    />
    <Text
      style={{
        fontFamily: "Inter-SemiBold",
        color: "#9FAFCA",
        position: "absolute",
        left: 70,
      }}
    >
      LEGI DOC APP
    </Text>
    <TouchableOpacity
      style={{
        position: "absolute",
        height: 45,
        width: 45,
        right: 10,
        backgroundColor: "white",
        borderRadius: 30,
      }}
    >
      <Image
        source={icons.profile}
        resizeMode="contain"
        style={{
          height: 45,
          width: 45,
          backgroundColor: "white",
          borderRadius: 30,
          tintColor: "#9FAFCA",
        }}
      />
    </TouchableOpacity>
  </View>
  )
}

export default HeaderRow

const styles = StyleSheet.create({})

