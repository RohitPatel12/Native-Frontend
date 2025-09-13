// components/ShortsSection.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const shorts = [
  { id: '1', thumbnail: 'https://via.placeholder.com/300x600', title: 'Funny Short' },
  { id: '2', thumbnail: 'https://via.placeholder.com/300x600', title: 'Workout Short' },
  { id: '3', thumbnail: 'https://via.placeholder.com/300x600', title: 'Gaming Short' },
];

export default function ShortsSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shorts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 10 }}>
        {shorts.map((s) => (
          <View key={s.id} style={styles.shortCard}>
            <Image source={{ uri: s.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title} numberOfLines={1}>{s.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 18, marginBottom: 30 },
  heading: { color: 'white', fontSize: 18, fontWeight: '600', marginLeft: 10, marginBottom: 8 },
  shortCard: { width: 120, marginRight: 12 },
  thumbnail: { width: '100%', height: 220, borderRadius: 10, backgroundColor: '#222' },
  title: { color: 'white', marginTop: 6 },
});
