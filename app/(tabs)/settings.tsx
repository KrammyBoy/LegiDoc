import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

const Settings = ({ navigation }: any) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const handleExit = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => Updates.reloadAsync() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.label}>Theme</Text>
        <Picker
          selectedValue={theme}
          onValueChange={(itemValue: any) => setTheme(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Language</Text>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>App Version</Text>
        <Text style={styles.value}>v1.0</Text>
      </View>

      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  exitButton: {
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  exitButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Settings;
