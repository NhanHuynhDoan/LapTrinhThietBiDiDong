import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

type FormValues = {
  name: string;
  id: string;
  email: string;
  summary: string;
};

const MAX_SUMMARY = 200;

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  // Name: no empty or spaces-only
  if (!values.name || values.name.trim().length === 0) {
    errors.name = "Name can't be empty or only spaces.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // ID: expect 8 digits (example rule)
  if (!/^[0-9]{8}$/.test(values.id)) {
    if (!values.id) errors.id = "Student ID is required.";
    else if (/[^0-9]/.test(values.id))
      errors.id = "ID must contain only digits (0-9).";
    else errors.id = "ID must be 8 digits long.";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) errors.email = "Email is required.";
  else if (!emailRegex.test(values.email))
    errors.email = "Enter a valid email (example: name@example.com).";

  // Summary
  if (values.summary && values.summary.length > MAX_SUMMARY) {
    errors.summary = `Summary must be ${MAX_SUMMARY} characters or fewer. You have ${values.summary.length}.`;
  }

  return errors;
}

export default function ValidationForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    id: "",
    email: "",
    summary: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const handleChange = (key: keyof FormValues, text: string) => {
    setValues((s) => ({ ...s, [key]: text }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleBlur = (key: keyof FormValues) => {
    const res = validate(values);
    setErrors(res);
  };

  const handleSubmit = () => {
    const res = validate(values);
    setErrors(res);
    if (Object.keys(res).length === 0) {
      Alert.alert("Success", "Form submitted");
    } else {
      // focus first error or show toast
      const first = Object.keys(res)[0] as keyof FormValues;
      Alert.alert("Fix errors", res[first] || "Please fix the errors");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validation demo</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        value={values.name}
        onChangeText={(t) => handleChange("name", t)}
        onBlur={() => handleBlur("name")}
        placeholder="Full name"
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <Text style={styles.label}>Student ID</Text>
      <TextInput
        style={[styles.input, errors.id && styles.inputError]}
        value={values.id}
        onChangeText={(t) => handleChange("id", t)}
        onBlur={() => handleBlur("id")}
        placeholder="8-digit ID"
        keyboardType="number-pad"
      />
      {errors.id ? <Text style={styles.error}>{errors.id}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        value={values.email}
        onChangeText={(t) => handleChange("email", t)}
        onBlur={() => handleBlur("email")}
        placeholder="name@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <Text style={styles.label}>Summary</Text>
      <TextInput
        style={[
          styles.input,
          styles.multiline,
          errors.summary && styles.inputError,
        ]}
        value={values.summary}
        onChangeText={(t) => handleChange("summary", t)}
        onBlur={() => handleBlur("summary")}
        placeholder="Short summary (optional)"
        multiline
        numberOfLines={4}
      />
      <Text style={styles.hint}>
        {values.summary.length}/{MAX_SUMMARY}
      </Text>
      {errors.summary ? (
        <Text style={styles.error}>{errors.summary}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        accessibilityRole="button"
        accessibilityLabel="Submit form"
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    marginTop: 12,
  },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#0F172A" },
  label: { fontSize: 12, color: "#64748B", marginTop: 8, marginBottom: 6 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
  },
  multiline: { height: 100, textAlignVertical: "top" },
  inputError: { borderColor: "#EF4444" },
  error: { color: "#EF4444", marginTop: 6 },
  hint: { color: "#94A3B8", fontSize: 12, marginTop: 4 },
  button: {
    marginTop: 12,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "700" },
});
