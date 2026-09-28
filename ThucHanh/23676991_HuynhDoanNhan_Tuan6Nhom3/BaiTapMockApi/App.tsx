import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Product = {
  id?: number | string;
  name?: string;
  description?: string;
  price?: number | string;
  image?: string;
};

const API_URL = "https://6aba0c8e5b549d818d61cefd.mockapi.io/products";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Không thể tải dữ liệu từ MockAPI.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>IMG</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name}>{item.name ?? "Tên sản phẩm"}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description ?? "Mô tả sản phẩm"}
        </Text>
        <Text style={styles.price}>
          {`$${Number(item.price ?? 0).toFixed(2)}`}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách sản phẩm</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2f6fed" />
      ) : error ? (
        <Text style={styles.errorText}>Lỗi: {error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) =>
            String(item.id ?? `${item.name ?? "product"}-${index}`)
          }
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không có dữ liệu sản phẩm.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#e5e7eb",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#dfe7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#4f46e5",
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f766e",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 24,
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 20,
  },
});
