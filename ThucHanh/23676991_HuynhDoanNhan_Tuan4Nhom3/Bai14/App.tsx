import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

export default function App() {
  const [paginatedResponse, setPaginatedResponse] =
    useState<ApiResponse<Product> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPaginatedProducts = async (
    keyword: string = "phone",
    limit: number = 3,
    page: number = 1,
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&limit=${limit}`,
      );
      const rawData = await response.json();

      const formattedResponse: ApiResponse<Product> = {
        data: rawData.products.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
        })),
        total: rawData.total,
        page: page,
      };

      setPaginatedResponse(formattedResponse);
    } catch (error) {
      console.error("Lỗi khi fetch API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedProducts("phone", 3, 1);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0052cc" />
        <Text style={{ marginTop: 10 }}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pagination Response</Text>

      <Text style={styles.subtitle}>Page: {paginatedResponse?.page}</Text>
      <Text style={styles.subtitle}>
        Total Items: {paginatedResponse?.total}
      </Text>
      <Text style={styles.subtitle}>
        Items on this page: {paginatedResponse?.data.length}
      </Text>

      <Text style={styles.subtitle}>Products:</Text>
      {paginatedResponse?.data.map((product) => (
        <View key={product.id} style={styles.itemContainer}>
          <Text style={styles.itemName}>{product.title}</Text>
          <Text style={styles.itemPrice}>${product.price}</Text>
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  center: {
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    width: "100%",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemPrice: {
    fontSize: 12,
    color: "#666",
  },
});
