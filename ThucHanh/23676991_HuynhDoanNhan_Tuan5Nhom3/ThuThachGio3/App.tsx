import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const books = [
  {
    id: "1",
    title: "Đắc Nhân Tâm",
    price: "86.000 đ",
    discount: "-20%",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    title: "Nhà Giả Kim",
    price: "79.000 đ",
    discount: "-15%",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    title: "Tuổi Trẻ",
    price: "90.000 đ",
    discount: "-10%",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "4",
    title: "Phương Đông",
    price: "115.000 đ",
    discount: "-25%",
    image:
      "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "5",
    title: "Tư Duy Nhanh",
    price: "168.000 đ",
    discount: "-30%",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "6",
    title: "Sapiens",
    price: "190.000 đ",
    discount: "-18%",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headerTitle}>Lưới sách</Text>
          <View style={styles.gridContainer}>
            {books.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.coverImage}
                  />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.discount}</Text>
                  </View>
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={styles.floatingButton}>
          <Ionicons name="cart" size={25} color="#FFFFFF" />
          <Text style={styles.buttonText}>Giỏ hàng</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>4</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "31%",
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#EF4444",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  price: {
    fontSize: 11,
    fontWeight: "600",
    color: "#E11D48",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 3,
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 5,
    backgroundColor: "#EF4444",
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
