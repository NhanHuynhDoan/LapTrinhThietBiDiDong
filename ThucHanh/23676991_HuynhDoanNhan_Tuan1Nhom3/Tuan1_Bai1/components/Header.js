import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartCampus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e66ff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
});
