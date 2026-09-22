import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const categories = [
  'Tất cả',
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng',
  'Truyện tranh',
];

const books = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    price: '86.000 đ',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim',
    price: '79.000 đ',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ',
    price: '90.000 đ',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    title: 'Phương Đông',
    price: '115.000 đ',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    title: 'Tư Duy Nhanh',
    price: '168.000 đ',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    title: 'Sapiens',
    price: '190.000 đ',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Danh mục sách</Text>
        <View style={styles.chipContainer}>
          {categories.map((cat, idx) => (
            <TouchableOpacity key={idx} activeOpacity={0.7} style={[styles.chip, idx === 0 && styles.activeChip]}>
              <Text style={[styles.chipText, idx === 0 && styles.activeChipText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Lưới sách 3 cột</Text>
        <View style={styles.gridContainer}>
          {books.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.coverImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignContent: 'flex-start',
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4338CA',
    backgroundColor: '#EEF2FF',
  },
  activeChip: {
    backgroundColor: '#4338CA',
  },
  chipText: {
    fontSize: 12,
    color: '#4338CA',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  coverImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#E2E8F0',
  },
  infoContainer: {
    padding: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  price: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E11D48',
  },
});
