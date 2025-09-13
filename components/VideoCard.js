// components/VideoCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VideoCard({ video = {}, onPress = () => {} }) {
  const thumbnail = video.thumbnail || video.thumbnailUrl || 'https://via.placeholder.com/800x450';
  const title = video.title || 'Untitled video';
  const channel = video.channel || video.uploader || 'Unknown channel';
  const meta = `${video.views ?? '0 views'} • ${video.time ?? ''}`;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      <View style={styles.row}>
        <Ionicons name="person-circle-outline" size={42} color="white" />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.meta}>{channel} • {meta}</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={18} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  thumbnail: { width: '100%', height: 200, backgroundColor: '#222' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  info: { flex: 1, marginLeft: 10 },
  title: { color: 'white', fontSize: 16, fontWeight: '500' },
  meta: { color: 'gray', fontSize: 13, marginTop: 4 },
});
