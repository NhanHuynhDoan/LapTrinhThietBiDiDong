import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export function ActionButton({
  label,
  onPress,
  disabled = false,
  variant = "primary",
}) {
  const [isPressed, setIsPressed] = useState(false);

  const isDisabled = disabled;
  const state = isDisabled ? "disabled" : isPressed ? "pressed" : "normal";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[`button_${variant}`],
        pressed && !isDisabled && styles[`button_${variant}_pressed`],
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
      ]}
      onPress={onPress}
      onPressIn={() => !isDisabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={isDisabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{
        disabled: isDisabled,
        pressed: isPressed && !isDisabled,
      }}
      accessibilityHint={isDisabled ? "Nút này hiện không khả dụng" : undefined}
      hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
    >
      <Text
        style={[
          styles.buttonText,
          styles[`buttonText_${variant}`],
          isPressed && !isDisabled && styles[`buttonText_${variant}_pressed`],
          isDisabled && styles.buttonTextDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    shadowOpacity: 0.25,
  },
  button_primary: {
    backgroundColor: "#1e66ff",
  },
  button_primary_pressed: {
    backgroundColor: "#0a3aa8",
  },
  button_secondary: {
    backgroundColor: "#e8ecf1",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button_secondary_pressed: {
    backgroundColor: "#d0d8e1",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonText_primary: {
    color: "#fff",
  },
  buttonText_primary_pressed: {
    color: "#f0f4ff",
  },
  buttonText_secondary: {
    color: "#333",
  },
  buttonText_secondary_pressed: {
    color: "#000",
  },
  buttonTextDisabled: {
    color: "#999",
  },
});
