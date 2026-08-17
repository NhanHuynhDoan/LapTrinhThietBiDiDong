import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Avatar({ initials, name, studentId }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.studentId}>Mã SV: {studentId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f5f7fb",
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1e66ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  initials: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  studentId: {
    fontSize: 13,
    color: "#666",
  },
});
