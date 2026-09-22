import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300' }}
          style={styles.coverImage}
        />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              Đắc Nhân Tâm - Nghệ Thuật Thu Phục Lòng Người
            </Text>
            <Text style={styles.author}>Dale Carnegie</Text>
          </View>
          <Text style={styles.price}>86.000 đ</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  coverImage: {
    width: 80,
    height: 110,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  infoContainer: {
    flex: 1,
    height: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E11D48',
  },
});
