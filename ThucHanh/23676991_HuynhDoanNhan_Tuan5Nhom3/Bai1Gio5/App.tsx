import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

interface TabItem {
  id: number;
  title: string;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const tabs: TabItem[] = [
  { id: 0, title: 'Trang chủ', activeIcon: 'home', inactiveIcon: 'home-outline' },
  { id: 1, title: 'Danh mục', activeIcon: 'grid', inactiveIcon: 'grid-outline' },
  { id: 2, title: 'Giỏ hàng', activeIcon: 'cart', inactiveIcon: 'cart-outline' },
  { id: 3, title: 'Tài khoản', activeIcon: 'person', inactiveIcon: 'person-outline' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const demoItems = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{tabs[activeTab].title}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Nội dung {tabs[activeTab].title}</Text>
        {demoItems.map((item) => (
          <View key={item} style={styles.card}>
            <Text style={styles.cardTitle}>Mục số {item}</Text>
            <Text style={styles.cardDesc}>Thông tin chi tiết hiển thị bên trong màn hình cuộn...</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.id)}
              style={styles.tabItem}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.inactiveIcon}
                size={22}
                color={isActive ? '#1E3A8A' : '#94A3B8'}
              />
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
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748B',
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
