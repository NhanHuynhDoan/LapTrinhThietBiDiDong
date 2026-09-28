import React, { useState } from "react";
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
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

type CartItem = Book & {
  quantity: number;
};

type RootStackParamList = {
  MainTabs: undefined;
  BookDetail: { bookId: string };
};

type BottomTabParamList = {
  Home: undefined;
  Category: undefined;
  Cart: undefined;
  Account: undefined;
};

const categories = [
  "Tất cả",
  "Văn học",
  "Kinh tế",
  "Thiếu nhi",
  "Kỹ năng",
  "Truyện tranh",
];

const books: Book[] = [
  {
    id: "1",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 86000,
    category: "Kỹ năng",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=500",
    description:
      "Đắc Nhân Tâm là cuốn sách nổi tiếng về nghệ thuật giao tiếp, tạo thiện cảm và thuyết phục mọi người hiệu quả trong công việc lẫn cuộc sống.",
  },
  {
    id: "2",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 79000,
    category: "Văn học",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=500",
    description:
      "Hành trình theo đuổi ước mơ của chàng trai Santiago mở ra những bài học về niềm tin, bản lĩnh và sự can đảm trong cuộc đời.",
  },
  {
    id: "3",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    price: 90000,
    category: "Kinh tế",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=500",
    description:
      "Cuốn sách giúp bạn nhìn nhận giá trị của thời gian, định hướng nghề nghiệp và xây dựng cuộc sống ý nghĩa hơn từ góc nhìn hiện đại.",
  },
  {
    id: "4",
    title: "Hành Trình Về Phương Đông",
    author: "Baird T. Spalding",
    price: 115000,
    category: "Văn học",
    image:
      "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=500",
    description:
      "Một hành trình khám phá triết lý sống, sự trưởng thành và những trải nghiệm sâu sắc của con người khi đi tìm chân lý.",
  },
  {
    id: "5",
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    price: 168000,
    category: "Kỹ năng",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500",
    description:
      "Cuốn sách phân tích cách con người ra quyết định, những thiên hướng tư duy và cách kiểm soát cảm xúc trong các tình huống thực tế.",
  },
  {
    id: "6",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 190000,
    category: "Kinh tế",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500",
    description:
      "Sapiens là một cuộc hành trình khám phá lịch sử loài người, sự tiến hóa của văn minh và những yếu tố định hình xã hội hiện đại.",
  },
];

const initialCart: CartItem[] = [
  { ...books[0], quantity: 1 },
  { ...books[1], quantity: 2 },
  { ...books[2], quantity: 1 },
];

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabConfig: Record<
    string,
    {
      title: string;
      activeIcon: keyof typeof Ionicons.glyphMap;
      inactiveIcon: keyof typeof Ionicons.glyphMap;
    }
  > = {
    Home: {
      title: "Trang chủ",
      activeIcon: "home",
      inactiveIcon: "home-outline",
    },
    Category: {
      title: "Danh mục",
      activeIcon: "grid",
      inactiveIcon: "grid-outline",
    },
    Cart: {
      title: "Giỏ hàng",
      activeIcon: "cart",
      inactiveIcon: "cart-outline",
    },
    Account: {
      title: "Tài khoản",
      activeIcon: "person",
      inactiveIcon: "person-outline",
    },
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const config = tabConfig[route.name] || {
          title: route.name,
          activeIcon: "square",
          inactiveIcon: "square-outline",
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Ionicons
              name={isFocused ? config.activeIcon : config.inactiveIcon}
              size={22}
              color={isFocused ? "#1E3A8A" : "#94A3B8"}
            />
            <Text
              style={[
                styles.tabLabel,
                isFocused ? styles.activeTabLabel : styles.inactiveTabLabel,
              ]}
            >
              {config.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function HomeScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const visibleBooks =
    selectedCategory === "Tất cả"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerBar}>
        <Text style={styles.logoText}>BookStore</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
            <Ionicons name="search" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Cart")}
            style={styles.iconButton}
          >
            <Ionicons name="cart-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục sách</Text>
        <View style={styles.chipContainer}>
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(category)}
                style={[styles.chip, isActive && styles.activeChip]}
              >
                <Text
                  style={[styles.chipText, isActive && styles.activeChipText]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Lưới sách 3 cột</Text>
        <View style={styles.gridContainer}>
          {visibleBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("BookDetail", { bookId: book.id })
              }
              style={styles.card}
            >
              <Image source={{ uri: book.image }} style={styles.coverImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.price}>
                  {book.price.toLocaleString("vi-VN")} đ
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function CategoryScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const visibleBooks =
    selectedCategory === "Tất cả"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerBarAlt}>
        <Text style={styles.headerTitle}>Danh mục</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Bộ lọc</Text>
        <View style={styles.chipContainer}>
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(category)}
                style={[styles.chip, isActive && styles.activeChip]}
              >
                <Text
                  style={[styles.chipText, isActive && styles.activeChipText]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Sách trong danh mục</Text>
        <View style={styles.verticalList}>
          {visibleBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("BookDetail", { bookId: book.id })
              }
              style={styles.listCard}
            >
              <Image source={{ uri: book.image }} style={styles.listImage} />
              <View style={styles.listTextWrap}>
                <Text style={styles.listTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.listMeta}>{book.author}</Text>
                <Text style={styles.listPrice}>
                  {book.price.toLocaleString("vi-VN")} đ
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function BookDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "BookDetail">) {
  const { bookId } = route.params;
  const book = books.find((item) => item.id === bookId) || books[0];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerBarAlt}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.detailScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coverWrap}>
          <Image source={{ uri: book.image }} style={styles.detailCover} />
        </View>

        <Text style={styles.detailTitle}>{book.title}</Text>
        <Text style={styles.detailAuthor}>Tác giả: {book.author}</Text>
        <Text style={styles.detailPrice}>
          {book.price.toLocaleString("vi-VN")} đ
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Giới thiệu nội dung</Text>
        <Text style={styles.description}>{book.description}</Text>
        <Text style={styles.description}>
          Cuốn sách này mang đến góc nhìn thực tế, dễ hiểu và có tính ứng dụng
          cao trong cả học tập lẫn công việc, phù hợp với người đọc muốn cải
          thiện kỹ năng sống và cách tiếp cận thành công.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalPrice}>
            {book.price.toLocaleString("vi-VN")} đ
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate("MainTabs")}
          style={styles.addToCartButton}
        >
          <Ionicons name="cart" size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CartScreen({ navigation }: any) {
  const [cartItems] = useState<CartItem[]>(initialCart);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerBarAlt}>
        <Text style={styles.headerTitle}>Giỏ hàng ({cartItems.length})</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.cartScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartCard}>
            <Image source={{ uri: item.image }} style={styles.cartImage} />
            <View style={styles.cartInfo}>
              <Text style={styles.cartTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.cartQuantity}>SL: {item.quantity}</Text>
            </View>
            <View style={styles.cartPriceWrap}>
              <Text style={styles.cartPrice}>
                {(item.price * item.quantity).toLocaleString("vi-VN")} đ
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalValue}>
            {totalPrice.toLocaleString("vi-VN")} đ
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Home")}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerBarAlt}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.accountScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.accountCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>HN</Text>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Huỳnh Đoàn Nhan</Text>
            <Text style={styles.accountEmail}>nhan@example.com</Text>
          </View>
        </View>

        <View style={styles.accountStatContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Hài lòng</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#1E3A8A",
  },
  headerBarAlt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    position: "relative",
  },
  logoText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 12,
  },
  content: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#4338CA",
    backgroundColor: "#EEF2FF",
    marginRight: 8,
    marginBottom: 8,
  },
  activeChip: {
    backgroundColor: "#4338CA",
  },
  chipText: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "600",
  },
  activeChipText: {
    color: "#FFFFFF",
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
  coverImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: "#E2E8F0",
  },
  infoContainer: {
    padding: 8,
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
  verticalList: {
    marginBottom: 10,
  },
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  listImage: {
    width: 60,
    height: 80,
    borderRadius: 6,
    backgroundColor: "#E2E8F0",
  },
  listTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  listMeta: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },
  listPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E11D48",
  },
  detailScrollContent: {
    padding: 16,
    paddingBottom: 26,
  },
  coverWrap: {
    alignItems: "center",
    marginBottom: 18,
  },
  detailCover: {
    width: "50%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },
  detailAuthor: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E11D48",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#334155",
    marginBottom: 12,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  priceInfo: {
    flexDirection: "column",
  },
  priceLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E11D48",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  backButton: {
    position: "absolute",
    left: 16,
    padding: 6,
  },
  cartScrollContent: {
    padding: 16,
  },
  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cartImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
  },
  cartInfo: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "space-between",
    height: 80,
  },
  cartTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    lineHeight: 18,
  },
  cartQuantity: {
    fontSize: 13,
    color: "#64748B",
  },
  cartPriceWrap: {
    width: 90,
    alignItems: "flex-end",
  },
  cartPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E11D48",
  },
  checkoutBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  totalContainer: {
    flexDirection: "column",
  },
  totalLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#E11D48",
  },
  checkoutButton: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  accountScrollContent: {
    padding: 16,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  accountInfo: {
    marginLeft: 12,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  accountEmail: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
  accountStatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  inactiveTabLabel: {
    color: "#94A3B8",
    fontWeight: "500",
  },
});
