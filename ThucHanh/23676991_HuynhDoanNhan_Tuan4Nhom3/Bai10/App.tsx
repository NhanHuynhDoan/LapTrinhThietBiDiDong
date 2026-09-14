import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: Geo;
}

export interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) {
        throw new Error(`Lỗi kết nối: ${response.status}`);
      }

      const data = (await response.json()) as User;
      setUser(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã xảy ra lỗi khi tải dữ liệu người dùng');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />


      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bài Tập 10: Chi Tiết Người Dùng</Text>
        <Text style={styles.headerSubtitle}>User Profile Detail</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Đang tải dữ liệu từ API...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerBox}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={fetchUser}>
              <Text style={styles.primaryBtnText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        ) : user === null ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Màn hình trống</Text>
            <Text style={styles.emptySubtitle}>
              Chưa có dữ liệu người dùng (user = null).
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </Text>
              </View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userUsername}>@{user?.username}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>ID:</Text>
                <Text style={styles.value}>#{user?.id}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Họ và tên:</Text>
                <Text style={styles.valueHighlight}>{user?.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>{user?.phone}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Website:</Text>
                <Text style={styles.valueLink}>{user?.website}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Công ty:</Text>
                <Text style={styles.value}>{user?.company?.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Khẩu hiệu:</Text>
                <Text style={styles.valueItalic}>"{user?.company?.catchPhrase}"</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.value}>
                  {user?.address?.street}, {user?.address?.suite},{'\n'}
                  {user?.address?.city} ({user?.address?.zipcode})
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footerBar}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.fetchBtn]}
          onPress={fetchUser}
          disabled={loading}
        >
          <Text style={styles.fetchBtnText}>Tải lại dữ liệu (Fetch API)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  userUsername: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 14,
  },
  infoSection: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    width: '35%',
  },
  value: {
    fontSize: 14,
    color: '#1e293b',
    width: '65%',
    textAlign: 'right',
  },
  valueHighlight: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563eb',
    width: '65%',
    textAlign: 'right',
  },
  valueLink: {
    fontSize: 14,
    color: '#0284c7',
    fontWeight: '500',
    width: '65%',
    textAlign: 'right',
  },
  valueItalic: {
    fontSize: 13,
    color: '#475569',
    fontStyle: 'italic',
    width: '65%',
    textAlign: 'right',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 300,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 350,
  },
  emptyIcon: {
    fontSize: 54,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerBar: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 10,
  },
  actionBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fetchBtn: {
    backgroundColor: '#2563eb',
  },
  fetchBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
