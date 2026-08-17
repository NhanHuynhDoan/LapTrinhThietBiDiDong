import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

export function BottomTabBar({ activeTab, onTabPress }) {
  const tabs = [
    { id: "home", label: "Trang chủ", icon: "🏠" },
    { id: "schedule", label: "Lịch học", icon: "📅" },
    { id: "notify", label: "Thông báo", icon: "🔔" },
    { id: "profile", label: "Hồ sơ", icon: "👤" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          style={({ pressed }) => [
            styles.tabButton,
            activeTab === tab.id && styles.tabButtonActive,
            pressed && activeTab !== tab.id && styles.tabButtonPressed,
          ]}
          onPress={() => onTabPress(tab.id)}
          accessible={true}
          accessibilityRole="tab"
          accessibilityLabel={tab.label}
          accessibilityState={{ selected: activeTab === tab.id }}
          hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
        >
          <Text
            style={[
              styles.tabIcon,
              activeTab === tab.id && styles.tabIconActive,
            ]}
          >
            {tab.icon}
          </Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.tabLabelActive,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e8ecf1",
    paddingBottom: 8,
    paddingTop: 8,
    minHeight: 70,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderTopWidth: 4,
    borderTopColor: "transparent",
  },
  tabButtonActive: {
    borderTopWidth: 5,
    borderTopColor: "#1e66ff",
    backgroundColor: "#f0f4ff",
  },
  tabButtonPressed: {
    backgroundColor: "#f5f7fb",
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabIconActive: {
    fontSize: 26,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#1e66ff",
    fontWeight: "700",
    fontSize: 12,
  },
});
