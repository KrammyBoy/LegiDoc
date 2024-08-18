import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';



export default function App() {
  
  return <Redirect href="/home"/>

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <SafeAreaView>
        <Text className='text-3xl font-iblack'>Hello World!</Text>
        <Link href="/home" style={{ color: 'blue'}}>Go to Home</Link>
      </SafeAreaView>
    </View>
  );
}
