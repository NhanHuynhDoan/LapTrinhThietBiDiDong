import React, { memo, useCallback, useMemo, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductItemProps = {
  item: Product;
  onSelect: (product: Product) => void;
};

const ProductItem = memo(function ProductItem({
  item,
  onSelect,
}: ProductItemProps) {
  return (
    <Button
      title={`${item.name} - ${item.price.toLocaleString("vi-VN")}đ`}
      onPress={() => onSelect(item)}
    />
  );
});

export default function ProductScreen() {
  const [keyword, setKeyword] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const products = useMemo<Product[]>(
    () => [
      { id: "1", name: "Điện thoại", price: 12000000 },
      { id: "2", name: "Máy tính bảng", price: 9000000 },
      { id: "3", name: "Tai nghe", price: 1500000 },
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedKeyword),
    );
  }, [keyword, products]);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedName(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm"
        style={styles.input}
      />

      <Text>Sản phẩm đã chọn: {selectedName || "Chưa chọn"}</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelectProduct} />
        )}
        ListEmptyComponent={<Text>Không tìm thấy sản phẩm</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 12,
    padding: 24,
  },
  input: {
    borderColor: "#999999",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  listContent: {
    gap: 12,
  },
});
