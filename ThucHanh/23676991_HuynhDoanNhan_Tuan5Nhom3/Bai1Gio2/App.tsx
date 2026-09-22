import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as RNStatusBar, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const categories = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
  'Khoa học',
  'Tâm lý học',
  'Công nghệ',
  'Tiểu thuyết',
  'Kinh doanh',
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Danh mục sách</Text>
        <View style={styles.chipContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.7} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignContent: 'flex-start',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4338CA',
    backgroundColor: '#EEF2FF',
  },
  chipText: {
    fontSize: 14,
    color: '#4338CA',
    fontWeight: '500',
  },
});
