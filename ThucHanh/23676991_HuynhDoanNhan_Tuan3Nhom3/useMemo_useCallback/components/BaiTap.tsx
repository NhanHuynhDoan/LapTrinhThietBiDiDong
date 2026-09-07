import React, { useCallback, useMemo, useState } from "react";
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

type SortOrder = "asc" | "desc";

const products: Product[] = [
  { id: "1", name: "Áo thun", price: 200000 },
  { id: "2", name: "Quần jean", price: 450000 },
  { id: "3", name: "Giày thể thao", price: 800000 },
];

type ProductItemProps = {
  item: Product;
  onSelect: (product: Product) => void;
};

const ProductItem = React.memo(function ProductItem({
  item,
  onSelect,
}: ProductItemProps) {
  console.count("ProductItem render");

  return (
    <Button
      title={`${item.name} - ${item.price.toLocaleString("vi-VN")}đ`}
      onPress={() => onSelect(item)}
    />
  );
});

export default function ProductSearchScreen() {
  const [keyword, setKeyword] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedName, setSelectedName] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const parsedMaxPrice = Number(maxPrice);
    const hasMaxPrice = maxPrice.trim() !== "" && !Number.isNaN(parsedMaxPrice);

    return products
      .filter((product) => {
        const matchesKeyword = product.name
          .toLowerCase()
          .includes(normalizedKeyword);
        const matchesMaxPrice = !hasMaxPrice || product.price < parsedMaxPrice;

        return matchesKeyword && matchesMaxPrice;
      })
      .sort((firstProduct, secondProduct) =>
        sortOrder === "asc"
          ? firstProduct.price - secondProduct.price
          : secondProduct.price - firstProduct.price,
      );
  }, [keyword, maxPrice, sortOrder]);

  const totalPrice = useMemo(
    () => filteredProducts.reduce((total, product) => total + product.price, 0),
    [filteredProducts],
  );

  const handleSelect = useCallback((product: Product) => {
    console.log("Đã chọn:", product.name);
    setSelectedName(product.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm sản phẩm</Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm theo tên sản phẩm"
        style={styles.input}
      />

      <TextInput
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="Giá tối đa (đ)"
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.sortControls}>
        <Button
          title="Giá tăng dần"
          onPress={() => setSortOrder("asc")}
          color={sortOrder === "asc" ? "#1976d2" : "#999999"}
        />
        <Button
          title="Giá giảm dần"
          onPress={() => setSortOrder("desc")}
          color={sortOrder === "desc" ? "#1976d2" : "#999999"}
        />
      </View>

      <Text style={styles.total}>
        Tổng giá: {totalPrice.toLocaleString("vi-VN")}đ
      </Text>

      <Text>Sản phẩm đã chọn: {selectedName || "Chưa chọn"}</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelect} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text>Không tìm thấy sản phẩm</Text>}
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
  separator: {
    height: 12,
  },
  sortControls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  total: {
    fontSize: 18,
    fontWeight: "600",
  },
});
