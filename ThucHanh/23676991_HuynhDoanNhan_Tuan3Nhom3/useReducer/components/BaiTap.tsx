import React, { useReducer } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const initialState = {
  email: "",
  password: "",
  error: "",
  isSubmitting: false,
};

type FormAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" }
  | { type: "RESET" };

function formReducer(
  state: typeof initialState,
  action: FormAction,
): typeof initialState {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
        error: "",
        isSubmitting: false,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        error: "",
        isSubmitting: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SUBMIT_START":
      return { ...state, error: "", isSubmitting: true };
    case "SUBMIT_END":
      return { ...state, isSubmitting: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function LoginFormScreen() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({
        type: "SET_ERROR",
        payload: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }

    if (!state.email.includes("@")) {
      dispatch({
        type: "SET_ERROR",
        payload: "Email phải chứa ký tự @",
      });
      return;
    }

    if (state.password.length < 6) {
      dispatch({
        type: "SET_ERROR",
        payload: "Mật khẩu phải có ít nhất 6 ký tự",
      });
      return;
    }

    dispatch({ type: "SUBMIT_START" });
    setTimeout(() => dispatch({ type: "SUBMIT_END" }), 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!state.isSubmitting}
      />

      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={(text) =>
          dispatch({ type: "SET_PASSWORD", payload: text })
        }
        placeholder="Mật khẩu"
        secureTextEntry
        editable={!state.isSubmitting}
      />

      {state.error ? <Text style={styles.error}>{state.error}</Text> : null}

      {state.isSubmitting ? (
        <Text style={styles.submitting}>Đang đăng nhập...</Text>
      ) : null}

      <Button
        title={state.isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
        onPress={handleLogin}
        disabled={state.isSubmitting}
      />
      <Button
        title="Đặt lại"
        onPress={() => dispatch({ type: "RESET" })}
        disabled={state.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  error: {
    color: "#d9534f",
    textAlign: "center",
  },
  submitting: {
    color: "#555",
    textAlign: "center",
  },
});
