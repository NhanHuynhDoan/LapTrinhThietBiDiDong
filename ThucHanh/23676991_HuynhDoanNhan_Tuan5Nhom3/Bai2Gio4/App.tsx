import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.topSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600' }}
          style={styles.largeCoverImage}
        />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Đắc Nhân Tâm - How to Win Friends and Influence People</Text>
        <Text style={styles.author}>Tác giả: Dale Carnegie</Text>
        <Text style={styles.price}>86.000 đ</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Giới thiệu nội dung</Text>
        <Text style={styles.description}>
          Đắc Nhân Tâm của Dale Carnegie là cuốn sách nổi tiếng nhất, có tầm ảnh hưởng lớn nhất mọi thời đại về nghệ thuật giao tiếp và ứng xử. Tác phẩm đã được dịch ra hầu hết các ngôn ngữ trên thế giới và có mặt ở hàng trăm quốc gia.
        </Text>
        <Text style={styles.description}>
          Cuốn sách đưa ra những lời khuyên sâu sắc và thực tế về cách thấu hiểu con người, tạo thiện cảm, dẫn dắt và thuyết phục người khác mà không gây thù hằn hay bất mãn. Đây không chỉ là cuốn cẩm nang về giao tiếp mà còn là nghệ thuật sống, giúp mỗi người tự hoàn thiện bản thân và đạt được thành công bền vững trong sự nghiệp và cuộc sống.
        </Text>
        <Text style={styles.description}>
          Nội dung cốt lõi của tác phẩm bao gồm: nghệ thuật ứng xử căn bản, 6 cách tạo thiện cảm với người khác, 12 cách hướng người khác theo suy nghĩ của bạn, cùng những nguyên tắc vàng trong lãnh đạo và chuyển hóa con người.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalPrice}>86.000 đ</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.addToCartButton}>
          <Ionicons name="cart" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
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
  topSection: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  largeCoverImage: {
    alignSelf: 'center',
    width: '45%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },
  author: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E11D48',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
    marginBottom: 12,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  priceInfo: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E11D48',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
