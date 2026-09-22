import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const dummyItems = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.screenTitle}>Danh sách sản phẩm</Text>
          {dummyItems.map((item) => (
            <View key={item} style={styles.contentBox}>
              <Text style={styles.contentTitle}>Sản phẩm {item}</Text>
              <Text style={styles.contentDesc}>Mô tả thông tin chi tiết của sản phẩm...</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={styles.floatingButton}>
          <Ionicons name="cart" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Giỏ hàng</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>4</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  contentBox: {
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  contentDesc: {
    fontSize: 14,
    color: '#94A3B8',
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  badge: {
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
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
