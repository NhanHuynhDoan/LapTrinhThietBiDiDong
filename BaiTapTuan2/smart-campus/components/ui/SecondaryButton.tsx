import React, { useState } from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export default function SecondaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: Props) {
  const [focused, setFocused] = useState(false);
  const effectiveDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={effectiveDisabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [
        styles.base,
        pressed && styles.pressed,
        focused && styles.focused,
        effectiveDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: effectiveDisabled }}
    >
      {loading ? (
        <ActivityIndicator color="#2563EB" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  pressed: {
    backgroundColor: "rgba(37,99,235,0.06)",
  },
  focused: {
    borderColor: "#93C5FD",
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 14,
  },
});
