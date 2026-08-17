import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Text,
} from "react-native";
import { Header } from "./components/Header";
import { Avatar } from "./components/Avatar";
import { InfoRow } from "./components/InfoRow";
import { SearchField } from "./components/SearchField";
import { ActionButton } from "./components/ActionButton";
import { BottomTabBar } from "./components/BottomTabBar";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = () => {
    Alert.alert("Thành công", "Hồ sơ đã được lưu!");
  };

  const handleViewDetails = () => {
    Alert.alert("Chi tiết", "Xem thêm thông tin chi tiết hồ sơ sinh viên.");
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  const isSearchEmpty = searchQuery.trim() === "";

  const renderContent = () => {
    if (activeTab === "profile") {
      return (
        <>
          <Avatar initials="SV" name="Huỳnh Đoàn Nhân" studentId="23676991" />
          <SearchField
            placeholder="Tìm kiếm thông tin..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View style={styles.infoSection}>
            <InfoRow label="Email" value="doannhan@sv.edu.vn" icon="✉️" />
            <InfoRow label="Lớp" value="KTPM19A" icon="🎓" />
            <InfoRow label="Khoa" value="Công nghệ Thông tin" icon="🏢" />
          </View>

          <View style={styles.actionContainer}>
            <ActionButton
              label="LƯU HỒ SƠ"
              onPress={handleSaveProfile}
              variant="primary"
              disabled={isSearchEmpty}
            />
            <ActionButton
              label="XEM CHI TIẾT"
              onPress={handleViewDetails}
              variant="secondary"
            />
          </View>
          <View style={styles.additionalInfo}>
            <InfoRow label="Số điện thoại" value="0123456789" icon="📱" />
            <InfoRow label="Địa chỉ" value="TP. Hồ Chí Minh" icon="📍" />
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>⏳</Text>
          <Text style={styles.placeholderTitle}>
            Đang trong quá trình hoàn thành
          </Text>
          <Text style={styles.placeholderSubtext}>
            Tính năng này sẽ sớm được cập nhật
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
        >
          {renderContent()}
        </ScrollView>

        <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />

        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  infoSection: {
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e8ecf1",
    overflow: "hidden",
  },
  actionContainer: {
    marginHorizontal: 0,
    marginVertical: 16,
  },
  additionalInfo: {
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8ecf1",
    overflow: "hidden",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  placeholderText: {
    fontSize: 60,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
