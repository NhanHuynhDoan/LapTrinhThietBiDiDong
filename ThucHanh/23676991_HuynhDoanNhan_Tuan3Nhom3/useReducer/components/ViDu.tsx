import React, { useReducer } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const initialState = {
  quantity: 0,
};

type CartAction = { type: "ADD" } | { type: "REMOVE" } | { type: "RESET" };

function cartReducer(
  state: typeof initialState,
  action: CartAction,
): typeof initialState {
  switch (action.type) {
    case "ADD":
      return { ...state, quantity: state.quantity + 1 };
    case "REMOVE":
      return { ...state, quantity: Math.max(0, state.quantity - 1) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function CartScreen() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Số sản phẩm: {state.quantity}</Text>

      <Button title="Thêm sản phẩm" onPress={() => dispatch({ type: "ADD" })} />

      <Button
        title="Bớt sản phẩm"
        onPress={() => dispatch({ type: "REMOVE" })}
      />

      <Button
        title="Xóa giỏ hàng"
        onPress={() => dispatch({ type: "RESET" })}
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
    fontSize: 22,
    textAlign: "center",
  },
});
