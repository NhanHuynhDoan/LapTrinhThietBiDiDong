import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm - Nghệ Thuật Thu Phục Lòng Người',
    price: 86000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim - Khám Phá Ước Mơ',
    price: 79000,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    price: 90000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '4',
    title: 'Hành Trình Về Phương Đông',
    price: 115000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=300',
  },
];

const tabs = [
  { id: 0, title: 'Trang chủ', icon: 'home-outline' as const },
  { id: 1, title: 'Danh mục', icon: 'grid-outline' as const },
  { id: 2, title: 'Giỏ hàng', icon: 'cart' as const },
  { id: 3, title: 'Tài khoản', icon: 'person-outline' as const },
];

export default function App() {
  const [cartItems] = useState<CartItem[]>(initialCart);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng ({cartItems.length})</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.itemQuantity}>SL: {item.quantity}</Text>
            </View>
            <View style={styles.itemPriceContainer}>
              <Text style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalValue}>{totalPrice.toLocaleString('vi-VN')} đ</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = tab.id === 2;
          return (
            <TouchableOpacity key={tab.id} activeOpacity={0.7} style={styles.tabItem}>
              <Ionicons name={tab.icon} size={22} color={isActive ? '#1E3A8A' : '#94A3B8'} />
              <Text style={[styles.tabLabel, isActive ? styles.activeTabLabel : styles.inactiveTabLabel]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  itemImage: {
    width: 60,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  itemDetails: {
    flex: 1,
    height: 80,
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 18,
  },
  itemQuantity: {
    fontSize: 13,
    color: '#64748B',
  },
  itemPriceContainer: {
    width: 85,
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E11D48',
  },
  checkoutBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  totalContainer: {
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E11D48',
  },
  checkoutButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
  },
  activeTabLabel: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  inactiveTabLabel: {
    color: '#94A3B8',
    fontWeight: '500',
  },
});
