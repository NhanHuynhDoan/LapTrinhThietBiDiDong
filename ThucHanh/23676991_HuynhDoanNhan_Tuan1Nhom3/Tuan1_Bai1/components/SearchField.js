import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export function SearchField({ placeholder, onChangeText, value }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessibilityRole="search"
        accessibilityLabel={placeholder}
        accessibilityHint="Nhập để tìm kiếm"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: "#f5f7fb",
    borderWidth: 1,
    borderColor: "#e8ecf1",
  },
  containerFocused: {
    borderColor: "#1e66ff",
    backgroundColor: "#fff",
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000",
  },
});
