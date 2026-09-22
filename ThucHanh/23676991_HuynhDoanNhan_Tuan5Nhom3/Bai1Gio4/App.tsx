import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  'Tất cả',
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
];

const books = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    price: '86.000 đ',
    badge: '-20%',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim',
    price: '79.000 đ',
    badge: 'Mới',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    price: '90.000 đ',
    badge: '-15%',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    title: 'Hành Trình Về Phương Đông',
    price: '115.000 đ',
    badge: '-10%',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    title: 'Tư Duy Nhanh Và Chậm',
    price: '168.000 đ',
    badge: 'Mới',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    title: 'Sapiens - Lược Sử Loài Người',
    price: '190.000 đ',
    badge: '-25%',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#1E3A8A" />

      <View style={styles.header}>
        <Text style={styles.logoText}>BookStore</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Danh mục</Text>
          <View style={styles.chipContainer}>
            {categories.map((cat, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                style={[styles.chip, idx === 0 && styles.activeChip]}
              >
                <Text style={[styles.chipText, idx === 0 && styles.activeChipText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Sách nổi bật</Text>
          <View style={styles.gridContainer}>
            {books.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.coverImage} />
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.bookTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.bookPrice}>{item.price}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={styles.floatingButton}>
          <Ionicons name="cart" size={24} color="#FFFFFF" />
          <Text style={styles.floatingButtonText}>Giỏ hàng</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>4</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 96,
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
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4338CA',
    backgroundColor: '#FFFFFF',
  },
  activeChip: {
    backgroundColor: '#4338CA',
  },
  chipText: {
    fontSize: 13,
    color: '#4338CA',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#E2E8F0',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 8,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  bookPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E11D48',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
