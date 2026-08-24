import { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Course, courses } from "./src/data/courses";

const PAGE_SIZE = 3;

function CourseRow({ course }: { course: Course }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.courseCard,
        pressed && styles.courseCardPressed,
      ]}
      onPress={() =>
        Alert.alert(
          course.title,
          `Giảng viên: ${course.instructor}\nDanh mục: ${course.category}\nSố học viên: ${course.students}`,
        )
      }
    >
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructor}>Giảng viên: {course.instructor}</Text>
      <View style={styles.courseFooter}>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.studentCount}>{course.students} học viên</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc" | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleCourseCount, setVisibleCourseCount] = useState(PAGE_SIZE);
  const normalizedSearchText = searchText.trim().toLowerCase();
  const categories = [
    "Tất cả",
    ...new Set(courses.map((course) => course.category)),
  ];
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = [
        course.title,
        course.instructor,
        course.category,
      ].some((value) => value.toLowerCase().includes(normalizedSearchText));
      const matchesCategory =
        selectedCategory === "Tất cả" || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [normalizedSearchText, selectedCategory]);
  const sortedCourses =
    sortOrder === null
      ? filteredCourses
      : [...filteredCourses].sort((firstCourse, secondCourse) =>
          sortOrder === "desc"
            ? secondCourse.students - firstCourse.students
            : firstCourse.students - secondCourse.students,
        );
  const visibleCourses = sortedCourses.slice(0, visibleCourseCount);
  const handleRefresh = () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);
    setIsLoadingMore(false);
    setTimeout(() => {
      setVisibleCourseCount(sortedCourses.length);
      setRefreshing(false);
    }, 800);
  };
  const handleLoadMore = () => {
    if (isLoadingMore || visibleCourseCount >= sortedCourses.length) {
      return;
    }

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCourseCount((currentCount) =>
        Math.min(currentCount + PAGE_SIZE, sortedCourses.length),
      );
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isCategoryDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCategoryDropdownOpen(false)}
      >
        <Pressable
          style={styles.dropdownOverlay}
          onPress={() => setIsCategoryDropdownOpen(false)}
        >
          <View style={styles.dropdownMenu}>
            {categories.map((category) => (
              <Pressable
                key={category}
                style={styles.dropdownOption}
                onPress={() => {
                  setSelectedCategory(category);
                  setIsCategoryDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    selectedCategory === category &&
                      styles.dropdownOptionTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      <FlatList
        data={refreshing ? [] : visibleCourses}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <View style={styles.loadingContainer}>
            {(refreshing || isLoadingMore) && (
              <ActivityIndicator size="small" color="#3157A4" />
            )}
            <Text style={styles.loadingText}>
              {refreshing
                ? "Đang tải khóa học..."
                : isLoadingMore
                  ? "Đang tải thêm khóa học..."
                  : visibleCourseCount < sortedCourses.length
                    ? "Kéo xuống để tải thêm"
                    : "Đã hiển thị tất cả khóa học"}
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Danh sách khóa học</Text>
            <View style={styles.searchRow}>
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm khóa học"
                value={searchText}
                onChangeText={setSearchText}
              />
              {searchText.length > 0 && (
                <Pressable
                  style={styles.clearButton}
                  onPress={() => setSearchText("")}
                  accessibilityLabel="Xóa nội dung tìm kiếm"
                >
                  <Text style={styles.clearButtonText}>Xóa</Text>
                </Pressable>
              )}
            </View>
            <Pressable
              style={styles.categoryDropdown}
              onPress={() => setIsCategoryDropdownOpen(true)}
              accessibilityLabel="Chọn danh mục khóa học"
            >
              <Text style={styles.categoryDropdownText}>
                Danh mục: {selectedCategory}
              </Text>
              <Text style={styles.categoryDropdownArrow}>v</Text>
            </Pressable>
            <View style={styles.sortOptions}>
              <Pressable
                style={[
                  styles.sortButton,
                  sortOrder === "asc" && styles.sortButtonSelected,
                ]}
                onPress={() =>
                  setSortOrder((currentOrder) =>
                    currentOrder === "asc" ? null : "asc",
                  )
                }
                accessibilityLabel="Sắp xếp số sinh viên tăng dần"
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOrder === "asc" && styles.sortButtonTextSelected,
                  ]}
                >
                  Tăng dần
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.sortButton,
                  sortOrder === "desc" && styles.sortButtonSelected,
                ]}
                onPress={() =>
                  setSortOrder((currentOrder) =>
                    currentOrder === "desc" ? null : "desc",
                  )
                }
                accessibilityLabel="Sắp xếp số sinh viên giảm dần"
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOrder === "desc" && styles.sortButtonTextSelected,
                  ]}
                >
                  Giảm dần
                </Text>
              </Pressable>
            </View>
            <Text style={styles.resultText}>
              {sortedCourses.length} kết quả tìm được
            </Text>
          </View>
        }
        ListEmptyComponent={
          !refreshing ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Không tìm thấy khóa học</Text>
              <Text style={styles.emptyText}>
                Hãy thử tìm kiếm với từ khóa khác.
              </Text>
            </View>
          ) : null
        }
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <CourseRow course={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  screenTitle: {
    color: "#182035",
    fontSize: 32,
    fontWeight: "800",
  },
  subtitle: {
    color: "#697080",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    minHeight: 52,
    color: "#182035",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE1E8",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  clearButton: {
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#3157A4",
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  categoryDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#DDE1E8",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  categoryDropdownText: {
    color: "#596171",
    fontSize: 15,
    fontWeight: "600",
  },
  categoryDropdownArrow: {
    color: "#3157A4",
    fontSize: 16,
    fontWeight: "800",
  },
  sortOptions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  sortButton: {
    flex: 1,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDE1E8",
    backgroundColor: "#FFFFFF",
  },
  sortButtonSelected: {
    borderColor: "#3157A4",
    backgroundColor: "#E8F0FF",
  },
  sortButtonText: {
    color: "#596171",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  sortButtonTextSelected: {
    color: "#3157A4",
  },
  dropdownOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(24, 32, 53, 0.35)",
  },
  dropdownMenu: {
    overflow: "hidden",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  dropdownOption: {
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E5EC",
  },
  dropdownOptionText: {
    color: "#182035",
    fontSize: 15,
  },
  dropdownOptionTextSelected: {
    color: "#3157A4",
    fontWeight: "700",
  },
  resultText: {
    color: "#4E5665",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
  },
  columnWrapper: {
    gap: 12,
  },
  loadingText: {
    color: "#697080",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 16,
  },
  loadingContainer: {
    alignItems: "center",
  },
  courseCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E1E5EC",
  },
  courseCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },
  courseTitle: {
    color: "#182035",
    fontSize: 18,
    fontWeight: "700",
  },
  instructor: {
    color: "#686F7D",
    fontSize: 14,
    marginTop: 7,
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  category: {
    flexShrink: 1,
    maxWidth: "62%",
    overflow: "hidden",
    color: "#3157A4",
    fontSize: 12,
    fontWeight: "700",
    backgroundColor: "#E8F0FF",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  studentCount: {
    flexShrink: 1,
    maxWidth: "38%",
    marginLeft: 6,
    color: "#596171",
    fontSize: 13,
    textAlign: "right",
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 250,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: "#182035",
    fontSize: 19,
    fontWeight: "700",
  },
  emptyText: {
    color: "#747B88",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
