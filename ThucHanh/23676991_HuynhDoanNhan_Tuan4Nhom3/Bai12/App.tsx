import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

interface CustomError {
  message: string;
  status?: number;
}

export default function App() {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/invalid-endpoint-12345",
      );

      if (!response.ok) {
        const errObj: CustomError = {
          message: `Gọi API thất bại với mã HTTP`,
          status: response.status,
        };
        throw errObj;
      }
    } catch (error: unknown) {
      let customError: CustomError;

      if (typeof error === "object" && error !== null && "message" in error) {
        customError = error as CustomError;
      } else {
        customError = { message: "Unknown error", status: 500 };
      }

      Alert.alert(
        "Lỗi API",
        `Mã lỗi: ${customError.status || "N/A"}\nThông điệp: ${customError.message}`,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Error Handling</Text>
      <Button title="Fetch Data" onPress={fetchData} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});
