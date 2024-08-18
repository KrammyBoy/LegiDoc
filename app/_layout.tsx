import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SplashScreen } from 'expo-router'
import React, { useState } from 'react'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { Link, Stack } from 'expo-router'
import Slot from "expo-router";
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import * as dbConfig from '../components/project/config';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite'


SplashScreen.preventAutoHideAsync();

const loadDatabase = async () => {
  const dbName = "mySQLite.db";
  const dbAsset = require("../assets/database/mySQLite.db")
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists){
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true}
    );
  }
  await FileSystem.downloadAsync(dbUri, dbFilePath)
}

const RootLayer = () => {
  const [fontsLoaded, error] = useFonts({
    "Inter-Thin": require("../assets/fonts/Inter-Thin.ttf"),
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),

  })
  const [dbLoaded, setDbLoaded] = useState(true)

  useEffect(() => {
    if(error) throw error
    if(fontsLoaded) SplashScreen.hideAsync();
    
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;
  if(!dbLoaded) return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={"large"}/>
      <Text style={{fontSize: 16}}>Setting up the database...
      </Text>
    </View>  
  );
  return (
    <>
      <React.Suspense
        fallback={
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={"large"}/>
          <Text style={{fontSize: 16}}>Setting up the database...
          </Text>
        </View>  
        }
      >
      <SQLiteProvider databaseName={dbConfig.DATABASE_NAME} useSuspense>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false}}/>
          <Stack.Screen name='(tabs)' options={{ headerShown: false}}/>
        </Stack>
      </SQLiteProvider>
      </React.Suspense>
    </>
  )
}

export default RootLayer

const styles = StyleSheet.create({})