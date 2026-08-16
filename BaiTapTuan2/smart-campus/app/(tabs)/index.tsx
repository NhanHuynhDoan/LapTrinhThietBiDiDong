import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import Announcements from "@/components/ui/Announcements";
import CourseGrid from "@/components/ui/CourseGrid";
import ManualCourseGrid from "@/components/ui/ManualCourseGrid";
import KeyboardFormDemo from "@/components/ui/KeyboardFormDemo";
import ValidationForm from "@/components/ui/ValidationForm";

export default function CampusDashboard() {
  const [activeTab, setActiveTab] = useState("Home");

  const headerContent = (
    <>
      <View style={styles.header}>
        <View style={styles.headerAvatarContainer}>
          <Ionicons name="person" size={22} color="#2563EB" />
        </View>

        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={18}
            color="#94A3B8"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm môn học, phòng..."
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          accessibilityHint="Open notifications"
        >
          <Ionicons name="notifications-outline" size={22} color="#0F172A" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatarContainer}>
            <Ionicons name="person" size={28} color="#2563EB" />
          </View>
          <View style={styles.profileMainInfo}>
            <Text style={styles.studentName}>Huỳnh Đoàn Nhân</Text>
            <Text style={styles.studentMajor}>Kỹ thuật phần mềm</Text>
          </View>
          <View style={styles.gpaBadge}>
            <Text style={styles.gpaLabel}>GPA</Text>
            <Text style={styles.gpaValue}>3.8</Text>
          </View>
        </View>

        <View style={styles.profileDivider} />

        <View style={styles.profileFooter}>
          <View style={styles.profileMetaItem}>
            <Text style={styles.metaLabel}>Mã số sinh viên</Text>
            <Text style={styles.metaValue}>23676991</Text>
          </View>
          <View style={styles.profileMetaItem}>
            <Text style={styles.metaLabel}>Khóa học</Text>
            <Text style={styles.metaValue}>2023 - 2027</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.gridCard}
          accessibilityRole="button"
          accessibilityLabel="Lịch học"
        >
          <View style={[styles.gridIconBg, { backgroundColor: "#EFF6FF" }]}>
            <Ionicons name="calendar-outline" size={24} color="#2563EB" />
          </View>
          <Text style={styles.gridLabel}>Lịch học</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          accessibilityRole="button"
          accessibilityLabel="Xem điểm"
        >
          <View style={[styles.gridIconBg, { backgroundColor: "#F0FDF4" }]}>
            <Ionicons name="ribbon-outline" size={24} color="#16A34A" />
          </View>
          <Text style={styles.gridLabel}>Xem điểm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          accessibilityRole="button"
          accessibilityLabel="Thư viện"
        >
          <View style={[styles.gridIconBg, { backgroundColor: "#FEF3C7" }]}>
            <Ionicons name="book-outline" size={24} color="#D97706" />
          </View>
          <Text style={styles.gridLabel}>Thư viện</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          accessibilityRole="button"
          accessibilityLabel="Học phí"
        >
          <View style={[styles.gridIconBg, { backgroundColor: "#F3E8FF" }]}>
            <Ionicons name="wallet-outline" size={24} color="#9333EA" />
          </View>
          <Text style={styles.gridLabel}>Học phí</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Lịch học hôm nay</Text>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Xem tất cả lịch học"
        >
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleItem}>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>09:00</Text>
            <Text style={styles.timeSubtext}>11:30</Text>
          </View>
          <View style={styles.scheduleInfo}>
            <Text style={styles.subjectName}>Lập trình ứng dụng Mobile</Text>
            <Text style={styles.teacherName}>GV: Nguyễn Vũ Lâm</Text>
          </View>
          <View style={styles.roomBadge}>
            <Ionicons name="location-outline" size={14} color="#2563EB" />
            <Text style={styles.roomText}>X10.03</Text>
          </View>
        </View>

        <View style={styles.scheduleItem}>
          <View style={[styles.timeBadge, { backgroundColor: "#F1F5F9" }]}>
            <Text style={[styles.timeText, { color: "#475569" }]}>13:30</Text>
            <Text style={styles.timeSubtext}>16:00</Text>
          </View>
          <View style={styles.scheduleInfo}>
            <Text style={styles.subjectName}>Khai phá dữ liệu</Text>
            <Text style={styles.teacherName}>GV: Trần Văn B</Text>
          </View>
          <View style={styles.roomBadge}>
            <Ionicons name="location-outline" size={14} color="#2563EB" />
            <Text style={styles.roomText}>A3.02</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tin tức & Sự kiện</Text>
      </View>
    </>
  );

  const footerContent = (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Course card grid (flexBasis)</Text>
      </View>
      <CourseGrid />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Course card grid (manual arithmetic)
        </Text>
      </View>
      <ManualCourseGrid />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Keyboard failure reproduction</Text>
      </View>
      <KeyboardFormDemo />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Validation examples</Text>
      </View>
      <ValidationForm />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFC"
        translucent
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 56 : 0
        }
      >
        <Announcements
          listHeaderComponent={headerContent}
          listFooterComponent={footerContent}
        />
      </KeyboardAvoidingView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Home")}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === "Home" }}
          accessibilityLabel="Trang chủ"
        >
          <Ionicons
            name={activeTab === "Home" ? "home" : "home-outline"}
            size={22}
            color={activeTab === "Home" ? "#2563EB" : "#64748B"}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === "Home" && styles.navLabelActive,
            ]}
          >
            Trang chủ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Courses")}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === "Courses" }}
          accessibilityLabel="Học phần"
        >
          <Ionicons
            name={activeTab === "Courses" ? "book" : "book-outline"}
            size={22}
            color={activeTab === "Courses" ? "#2563EB" : "#64748B"}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === "Courses" && styles.navLabelActive,
            ]}
          >
            Học phần
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Calendar")}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === "Calendar" }}
          accessibilityLabel="Lịch biểu"
        >
          <Ionicons
            name={activeTab === "Calendar" ? "calendar" : "calendar-outline"}
            size={22}
            color={activeTab === "Calendar" ? "#2563EB" : "#64748B"}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === "Calendar" && styles.navLabelActive,
            ]}
          >
            Lịch biểu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab("Profile")}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === "Profile" }}
          accessibilityLabel="Cá nhân"
        >
          <Ionicons
            name={activeTab === "Profile" ? "person" : "person-outline"}
            size={22}
            color={activeTab === "Profile" ? "#2563EB" : "#64748B"}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === "Profile" && styles.navLabelActive,
            ]}
          >
            Cá nhân
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 1) - 50 : 8,
  },
  headerAvatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileMainInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  studentMajor: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  gpaBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  gpaLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#D97706",
  },
  gpaValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B45309",
  },
  profileDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },
  profileFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileMetaItem: {
    gap: 2,
  },
  metaLabel: {
    fontSize: 11,
    color: "#475569",
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  gridCard: {
    width: "22%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  gridIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },

  scheduleContainer: {
    gap: 10,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  timeBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  timeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },
  timeSubtext: {
    fontSize: 10,
    color: "#94A3B8",
  },
  scheduleInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  teacherName: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  roomBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  roomText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },

  newsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  newsImage: {
    width: "100%",
    height: 130,
  },
  newsContent: {
    padding: 14,
  },
  newsTag: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  newsTagText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#2563EB",
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  newsDesc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 18,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    minHeight: 48,
    paddingVertical: 6,
  },
  navLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  navLabelActive: {
    color: "#2563EB",
    fontWeight: "700",
  },
});
