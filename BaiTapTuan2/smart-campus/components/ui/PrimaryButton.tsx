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

export default function PrimaryButton({
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
        <ActivityIndicator color="#FFFFFF" />
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
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    transform: [{ scale: 0.995 }],
    opacity: 0.95,
  },
  focused: {
    borderWidth: 2,
    borderColor: "#93C5FD",
  },
  disabled: {
    backgroundColor: "#E2E8F0",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
