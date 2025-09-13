// screens/UploadScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { API } from '../config/api';
import { useNavigation } from '@react-navigation/native';

export default function UploadScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  // Pick video from device
  const pickVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
    });

    if (!result.canceled) {
      setFile(result);
    } else {
      Alert.alert('Cancelled', 'No file selected');
    }
  };

const uploadVideo = async () => {
  if (!title || !description || !file) {
    Alert.alert("Validation", "Please fill all fields and select a video");
    return;
  }

  const formData = new FormData();

  // Attach metadata as JSON string
  formData.append("metadata", JSON.stringify({
    title,
    description,
  }));

  // Attach video file
  formData.append("file", {
    uri: file.uri,
    name: file.name || "upload.mp4",
    type: file.mimeType || "video/mp4",
  });

  try {
    const res = await API.post("/videos/upload", formData, {
      // ❌ remove manual Content-Type
      headers: {
        Accept: "application/json",  // ✅ only this is needed
      },
    });

    Alert.alert("Success", "Video uploaded successfully!");
    setTitle("");
    setDescription("");
    setFile(null);
    navigation.navigate("Home");
  } catch (err) {
    console.log("Upload error:", err.response?.data || err.message);
    Alert.alert("Error", "Failed to upload video");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter video title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter video description"
      />

      <TouchableOpacity style={styles.fileBtn} onPress={pickVideo}>
        <Text style={styles.fileText}>
          {file ? file.name : 'Select Video'}
        </Text>
      </TouchableOpacity>

      <Button title="Upload Video" onPress={uploadVideo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
  },
  fileBtn: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
  },
  fileText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});
