import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const books = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm - Nghệ Thuật Thu Phục Lòng Người',
    author: 'Dale Carnegie',
    price: '86.000 đ',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim - Hành Trình Theo Đuổi Ước Mơ',
    author: 'Paulo Coelho',
    price: '79.000 đ',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: '90.000 đ',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '4',
    title: 'Hành Trình Về Phương Đông',
    author: 'Baird T. Spalding',
    price: '115.000 đ',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '5',
    title: 'Tư Duy Nhanh Và Chậm',
    author: 'Daniel Kahneman',
    price: '168.000 đ',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300',
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#1E3A8A" />

      <View style={styles.header}>
        <Text style={styles.logoText}>BookStore</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Tìm kiếm">
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Giỏ hàng">
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.card}>
            <Image source={{ uri: book.image }} style={styles.coverImage} />
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.title} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#1E3A8A',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: '#6B7280',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E11D48',
  },
});
