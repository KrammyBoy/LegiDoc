import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderRow from "../../components/project/header";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import SavingImage from "../../components/project/saving";
import axios from "axios";
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system'
import {icons} from '../../constants/'


const Home = () => {

  //const db = SQLite.openDatabaseSync(DBConfig.DATABASE_NAME);
  const db = SQLite.openDatabaseSync('newlySaved.db');

  const [picture, setPicture] = useState("");
  const [date, setDate] = useState("");
  const [prediction, setPrediction] = useState("");
  const [imageX, setImageX] = useState(""); //base64

  {/* Settings Uploaded */}
  const [ipAddress, setIpAddress] = useState('');
  const [portNumber, setPortNumber] = useState('');

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const [wifiSetting, setWifiSetting] = useState(false);
  const [isPredicting, setIsPredictin] = useState(false);
  const [haveResult, setHaveResult] = useState(false);
  const [currentIndex, setCurrentTextIndex] = useState(0);
  const listOfText = [
    "Setting up the database",
    "Connecting to the web server",
    "Setting up vehicle",
    "Ready the transport",
    "Successful connection",
    "Preparing the Image",
    "Detecting spaces",
    "Forming up bound boxes",
    "Preprocessing",
    "Predicting...",
  ];

  const updateTextIndex = () => {
    setCurrentTextIndex((prevIndex) =>
      prevIndex < listOfText.length - 1 ? prevIndex + 1 : prevIndex,
    );
  };

  const cancelHandle = () => {
    setHaveResult(false);
    setIsPredictin(false);
  };

  useEffect(() => {
    if (isPredicting) {
      const timer = setInterval(
        updateTextIndex,
        Math.floor(Math.random() * 501) + 1500,
      ); 
      return () => clearInterval(timer); 
    }
  }, [isPredicting]);
  useEffect(()=> {
    const test = db.execSync('CREATE TABLE IF NOT EXISTS savedData(id integer primary key autoincrement, date text, thumbnail text, prediction text)')
    db.closeSync();
  },[])
  {
    /* File Picker */
  }
  const filePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
      setImageX(result.assets[0].base64!);
    }
  };
  {
    /** Camera */
  }
  const cameraPicker = async () => {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
      setImageX(result.assets[0].base64!);
    }
  };

  const getCurrentDateAsFileName = () => {
    const currentDate = new Date();

    // Get date components
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    // Get time components
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format Name
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    const formattedTime = `${hours < 10 ? "0" + hours : hours}-${minutes < 10 ? "0" + minutes : minutes}-${seconds < 10 ? "0" + seconds : seconds}`;

    return formattedDate.concat('-' + formattedTime);
  };

  {
    /** Handle Prediction */
  }
  const handlePrediction = async () => {
    let name = getCurrentDateAsFileName();
    setCurrentTextIndex(0);
    setDate(name);

    if (picture !== "") {
      try {
        setIsPredictin(true);
        const prediction = await predictImage(imageX);
        setPrediction(prediction);
      } catch (error) {
        console.error("Prediction error:", error);
        Alert.alert("Prediction Error", `Error: ${error}`);
      } finally {
        setIsPredictin(false);
        setHaveResult(true);
      }
    } else {
      Alert.alert("Error", "No Picture Selected");
    }
  };

  const predictImage = async (imageData: string) => {

    //"http://192.168.13.24:4321/prediction"
    let url = `http://${ipAddress}:${portNumber}/prediction`
    console.log(url);
    
    try {
      const data = {
        image: imageData,
        type: "Image",
      };
      const response = await axios.post(
        url,
        data,
      );
      return response.data.recognized_text;
    } catch (error) {
      alert(error);
    }
  };

  const saveHandle = async () => {
    try {
      const filepath = await saveToFile();
      await saveToDatabase(filepath);

      setHaveResult(false);
      setIsPredictin(false);
      ToastAndroid.showWithGravity("Saved to gallery", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    } catch (e) {
      ToastAndroid.showWithGravity("Error in the database", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      console.log(e);
    }
  };

  const saveToFile = async () => {
    const directory = `${FileSystem.documentDirectory}images`;
    const filePath = `${directory}/${date}.jpg`;

    try {
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      await FileSystem.writeAsStringAsync(filePath, imageX, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("File saved to:", filePath);

      return filePath
    } catch (error) {
      console.log("Error saving file:", error);
      throw error;
    }
  };

  const saveToDatabase = async (filepath: string) => {
    try {
      const result = db.runSync('INSERT INTO savedData(date, thumbnail, prediction) VALUES (?,?,?)', date, filepath, prediction);
      db.closeSync();
    } catch (error) {
      console.log("Error saving to database:", error);
      throw error;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <HeaderRow />
      <GestureHandlerRootView>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#D9D9D9",
              marginTop: 20,
              width: "90%",
              height: 300,
              borderRadius: 10,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={
                picture !== ""
                  ? { uri: picture }
                  : require("../../assets/images/cover.jpg")
              }
              onError={(e) => console.log(e)}
              resizeMode="stretch"
              style={{
                height: 290,
                width: "95%",
                alignSelf: "center",
                borderRadius: 10,
              }}
            ></Image>
          </View>
          {!isPredicting && !haveResult ? (
            <View>
              <TouchableOpacity style={styles.buttons} onPress={cameraPicker}>
                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={filePicker}>
                <Text style={styles.buttonText}>Files</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={handlePrediction}
              >
                <Text style={styles.buttonText}>Predict</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setWifiSetting(true)}
                style={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                }}
              >
                <Image
                  source={icons.wifi}
                  resizeMode="contain"
                  style={{
                    tintColor: '#143d7d',
                    width: 45,
                    height: 45,
                  }}
                />
              </TouchableOpacity>
              {/* Settings Modal */}
              {wifiSetting ? (
              <View style={{
                width: 250,
                height: 265,
                position: 'absolute',
                borderRadius: 20,
                right: 70,
                padding: 10,
                backgroundColor: '#143d7d'
              }}>
                <Text style={{
                  fontFamily: 'Inter-Bold',
                  alignSelf: 'center',
                  fontSize: 16, color: 'white',
                  marginBottom: 10,
                }}>Connection Settings</Text>
                <TextInput
                  placeholder="IP Address"
                  placeholderTextColor={"#9fafca"}
                  value={ipAddress}
                  onChangeText={(text) => setIpAddress(text)}
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    width: '85%',
                    fontFamily: 'Inter-Regular',
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderRadius: 10,
                    color: 'white',
                    borderColor: 'white',
                  }}
                />
                <TextInput
                  placeholder="Port Number"
                  placeholderTextColor={"#9fafca"}
                  value={portNumber}
                  onChangeText={(text) => setPortNumber(text)}
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    width: '85%',
                    fontFamily: 'Inter-Regular',
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderRadius: 10,
                    color: 'white',
                    borderColor: 'white',
                  }}
                />
                <TouchableOpacity style={{
                  padding: 10,
                  width: '85%',
                  borderWidth: 1,
                  borderColor: 'green',
                  borderRadius: 10,
                  alignSelf: 'center',
                  backgroundColor: 'green',
                }}
                  onPress={() => setWifiSetting(false)}
                >
                  <Text style={{
                    color: '#55f007',
                    alignSelf: 'center',
                    fontFamily: 'Inter-Bold',
                  }}>OKAY</Text>
                </TouchableOpacity>                
              </View>

              ) : (
                null
              )}
        
              
            </View>
          ) : null}
          {isPredicting && !haveResult ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                size={"large"}
                style={{
                  marginTop: 10,
                  borderColor: "green",
                }}
              />
              <Text style={{ marginTop: 10 }}>{listOfText[currentIndex]}</Text>
            </View>
          ) : null}
          {haveResult ? (
            <>
            <SavingImage uri={picture} date={date} prediction={prediction}/>
              <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <TouchableOpacity style={styles.buttonStyle}
              onPress={saveHandle}>
                <Text style={[styles.buttonText, { color: "green" }]}>
                  Save to Gallery!
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={cancelHandle}
              >
                <Text style={[styles.buttonText, { color: "red" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            </>
          ) : null}
        </ScrollView>
        <StatusBar hidden={true} />
      </GestureHandlerRootView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    padding: 20,
    alignSelf: "center",
    borderWidth: 1,
    width: "60%",
    backgroundColor: "#9FAFCA",
    borderColor: "#143d7d",
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  buttonStyle: {
    padding: 10,
    width: "40%",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "#9fafca",
    borderColor: "white",
  },
});
