import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


import  { icons } from '../../constants'

const TabIcon = ({ icon , color, name, focused} : any) => {
  return (
    <View
      style = {{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Image
        source = {icon}
        resizeMode='contain'
        tintColor={color}
        style={{
          height: 24,
          width: 24,
          
        }}
      />
      <Text
        style={{
          color: color,
          fontSize: 12,
          lineHeight: 20,
          fontFamily: focused ? 'Inter-SemiBold' : 'Inter-Regular'
        }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#9fafca',
          tabBarInactiveTintColor: '#FFFFFF',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#143d7d',
            borderTopWidth: 1,
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }
        }}
      >
        <Tabs.Screen
          name='gallery'
          options={{
            title: 'Gallery',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon = {icons.gallery}
                color = {color}
                name = "Gallery"
                focused = {focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon = {icons.home_2}
                color = {color}
                name = "Home"
                focused = {focused}
              />
            )
          }}
        />        
        <Tabs.Screen
          name='settings'
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon = {icons.settings}
                color = {color}
                name = "Settings"
                focused = {focused}
              />
            )
          }}
        />                
      </Tabs>
    </>
  )
}

export default TabLayout