import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function LongForm({ lastRef }: { lastRef: React.RefObject<TextInput | null> }) {
  return (
    <View>
      {Array.from({ length: 8 }).map((_, i) => (
        <View key={i} style={styles.fieldRow}>
          <Text style={styles.label}>Field {i + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter value ${i + 1}`}
          />
        </View>
      ))}

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Last field</Text>
        <TextInput
          ref={lastRef}
          style={styles.input}
          placeholder="This field can be hidden by the keyboard"
        />
      </View>
    </View>
  );
}

export default function KeyboardFormDemo() {
  const lastRefUnsafe = useRef<TextInput>(null);
  const lastRefSafe = useRef<TextInput>(null);
  const [safe, setSafe] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Keyboard form demo</Text>
          <TouchableOpacity
            onPress={() => setSafe((s) => !s)}
            accessibilityRole="button"
            accessibilityLabel="Toggle keyboard safety"
          >
            <Text style={styles.toggle}>{safe ? "Safe" : "Unsafe"}</Text>
          </TouchableOpacity>
        </View>

        {safe ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <LongForm lastRef={lastRefSafe} />
              <TouchableOpacity
                style={styles.focusButton}
                onPress={() => lastRefSafe.current?.focus()}
                accessibilityRole="button"
                accessibilityLabel="Focus last field (safe)"
              >
                <Text style={styles.focusText}>Focus last field (safe)</Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        ) : (
          <ScrollView
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <LongForm lastRef={lastRefUnsafe} />
            <TouchableOpacity
              style={styles.focusButton}
              onPress={() => lastRefUnsafe.current?.focus()}
              accessibilityRole="button"
              accessibilityLabel="Focus last field (unsafe)"
            >
              <Text style={styles.focusText}>Focus last field (unsafe)</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        <Text style={styles.note}>
          Reproduce: toggle to Unsafe, press the button to focus last field —
          keyboard will likely cover it. Toggle back to Safe to see
          scrolling/avoidance fix.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  flex: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  toggle: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
  },
  formContainer: {
    paddingBottom: 100,
  },
  fieldRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
    fontSize: 14,
    color: "#0F172A",
  },
  focusButton: {
    marginTop: 12,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  focusText: { color: "#FFF", fontWeight: "700", fontSize: 14 },
  note: {
    marginVertical: 8,
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 16,
  },
});
