import React, { useState, ReactNode } from "react";
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";

interface Props {
  children: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  size?: number;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export default function IconButton({
  children,
  onPress,
  size = 40,
  loading = false,
  disabled = false,
  style,
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
        { width: size, height: size, borderRadius: size / 2 },
        pressed && styles.pressed,
        focused && styles.focused,
        effectiveDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: effectiveDisabled }}
    >
      {loading ? <ActivityIndicator color="#0F172A" /> : children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  pressed: {
    backgroundColor: "rgba(15,23,42,0.06)",
  },
  focused: {
    borderWidth: 2,
    borderColor: "#93C5FD",
  },
  disabled: {
    opacity: 0.5,
  },
});
