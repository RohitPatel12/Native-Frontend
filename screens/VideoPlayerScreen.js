// screens/VideoPlayerScreen.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Video from 'react-native-video';

export default function VideoPlayerScreen({ route }) {
  const { video } = route.params;

  // Determine correct backend URL for emulator/simulator
  const baseURL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8081' // Android emulator
      : 'http://192.168.1.3:8081'; // Replace with your machine IP for iOS simulator / physical device

  const videoURL = video.url.startsWith('http') ? video.url : `${baseURL}${video.url}`;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoURL }}
        style={styles.video}
        controls={true}        // Show native player controls
        resizeMode="contain"
        paused={true}          // start paused
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  video: { width: '100%', height: 300 },
});
