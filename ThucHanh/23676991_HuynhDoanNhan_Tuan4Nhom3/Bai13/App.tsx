import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

interface Item {
  name: string;
  id?: number;
}

function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string,
): T[] {
  return items.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase()),
  );
}

export default function App() {
  const users: Item[] = [
    { name: "Alice", id: 1 },
    { name: "Bob", id: 2 },
    { name: "Charlie", id: 3 },
    { name: "David", id: 4 },
    { name: "Eve", id: 5 },
  ];

  const products = [
    { name: "Apple", id: 1 },
    { name: "Banana", id: 2 },
    { name: "Orange", id: 3 },
    { name: "Apricot", id: 4 },
  ];

  const filteredUsers = filterByName(users, "a");
  const filteredProducts = filterByName(products, "a");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Filtered List Generic</Text>

      <Text style={styles.subtitle}>Users containing 'a':</Text>
      {filteredUsers.map((user) => (
        <Text key={user.id} style={styles.item}>
          {user.name}
        </Text>
      ))}

      <Text style={styles.subtitle}>Products containing 'a':</Text>
      {filteredProducts.map((product) => (
        <Text key={product.id} style={styles.item}>
          {product.name}
        </Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    paddingVertical: 5,
  },
});
