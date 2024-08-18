import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import HeaderRow from '../../components/project/header';
import * as SQLite from 'expo-sqlite';
import Modal from '../../components/project/modal';
import { icons } from '../../constants/index';
import { useFocusEffect } from "expo-router";

type GalleryProps = {
  navigation: any;
};

type SavedData = {
  id: number;
  thumbnail: string;
  date: string;
  prediction: string;
};

const Gallery: React.FC<GalleryProps> = ({ navigation }) => {
  const db = SQLite.openDatabaseSync('newlySaved.db');
  const [viewModal, setViewModal] = useState(false);

  const [currentDate, setCurrentDate] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [currentPrediction, setCurrentPrediction] = useState('');
  const [changeOfState, setChangeofState] = useState(0);

  const galleryModalHandle = (image: string, date: string, prediction: string) => {
    setViewModal(true);
    setCurrentDate(date);
    setCurrentImage(image);
    setCurrentPrediction(prediction);
  };

  const deleteAllHandler = () => {
    db.withTransactionSync(() => {
      db.execSync('DELETE FROM savedData');
    });
    setSavedData([]);
  };

  const [savedData, setSavedData] = useState<SavedData[]>([]);

  const getDataFromDB = async () => {
    const result: SavedData[] = await db.getAllSync('SELECT * from savedData');
    setSavedData(result);
  };

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getDataFromDB();
    });
  }, [changeOfState]);

  useFocusEffect(
    useCallback(() => {
      setChangeofState(prevState => prevState + 1);
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderRow />

      <FlatList
        data={savedData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => galleryModalHandle(item.thumbnail, item.date, item.prediction)}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.image}
              resizeMode="stretch"
            />
            <View style={styles.overlay} />
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAllHandler}>
        <Text style={styles.deleteButtonText}>DELETE ALL</Text>
      </TouchableOpacity>
      {viewModal && (
        <>
          <Modal image={currentImage} date={currentDate} prediction={currentPrediction} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setViewModal(false)}>
            <Image source={icons.exit} resizeMode="contain" style={styles.closeButtonIcon} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 150,
    width: 110,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 20,
    padding: 5,
    position: 'relative',
  },
  image: {
    height: 150,
    width: 100,
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: "rgba(51, 54, 52, 0.3)",
    height: 150,
    width: 110,
    borderRadius: 20,
    position: 'absolute',
  },
  dateText: {
    fontSize: 10,
    color: "white",
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  closeButton: {
    justifyContent: 'center',
    position: 'absolute',
    top: 80,
    right: 20,
  },
  closeButtonIcon: {
    width: 25,
    height: 25,
    tintColor: 'red',
  },
});

export default Gallery;
