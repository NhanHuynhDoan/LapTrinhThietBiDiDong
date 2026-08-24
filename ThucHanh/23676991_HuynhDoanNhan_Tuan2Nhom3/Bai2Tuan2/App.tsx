import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Student, studentSections } from "./src/data/students";
import { SearchField } from "./src/components/SearchField";
import { SectionHeader } from "./src/components/SectionHeader";
import { StudentRow } from "./src/components/StudentRow";

const students = studentSections.flatMap((section) => section.data);
const sectionsByNameInitial = Object.entries(
  students.reduce<Record<string, Student[]>>((groups, student) => {
    const nameParts = student.fullName.trim().split(/\s+/);
    const nameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

    groups[nameInitial] = groups[nameInitial] ?? [];
    groups[nameInitial].push(student);
    return groups;
  }, {}),
)
  .sort(([firstInitial], [secondInitial]) =>
    firstInitial.localeCompare(secondInitial, "vi"),
  )
  .map(([title, data]) => ({ title, data }));

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    Student["status"] | "Tất cả"
  >("Tất cả");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );
  const normalizedSearchText = searchText.trim().toLowerCase();
  const filteredSections = sectionsByNameInitial
    .map((section) => ({
      ...section,
      data: section.data
        .filter((student) => {
          const matchesSearch = [
            student.fullName,
            student.studentId,
            student.className,
          ].some((value) => value.toLowerCase().includes(normalizedSearchText));
          const matchesStatus =
            selectedStatus === "Tất cả" || student.status === selectedStatus;

          return matchesSearch && matchesStatus;
        })
        .sort((firstStudent, secondStudent) =>
          firstStudent.fullName.localeCompare(secondStudent.fullName, "vi"),
        ),
    }))
    .filter((section) => section.data.length > 0);
  const visibleSections = filteredSections.map((section) => ({
    ...section,
    studentCount: section.data.length,
    data: expandedSections.has(section.title) ? section.data : [],
  }));
  const filteredStudentCount = filteredSections.reduce(
    (total, section) => total + section.data.length,
    0,
  );
  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((currentSections) => {
      const nextSections = new Set(currentSections);

      if (nextSections.has(sectionTitle)) {
        nextSections.delete(sectionTitle);
      } else {
        nextSections.add(sectionTitle);
      }

      return nextSections;
    });
  };
  const handleRefresh = () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      <SearchField
        value={searchText}
        onChangeText={setSearchText}
        onClear={() => setSearchText("")}
      />
      <Text style={styles.resultText}>
        {filteredStudentCount} sinh viên tìm được
      </Text>
      {refreshing && (
        <View style={styles.refreshStatus}>
          <ActivityIndicator size="small" color="#3157A4" />
          <Text style={styles.refreshStatusText}>
            Đang tải lại danh sách...
          </Text>
        </View>
      )}
      <Modal
        visible={isStatusDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsStatusDropdownOpen(false)}
      >
        <Pressable
          style={styles.statusDropdownOverlay}
          onPress={() => setIsStatusDropdownOpen(false)}
        >
          <View style={styles.statusDropdownMenu}>
            {(["Tất cả", "Đang học", "Bảo lưu"] as const).map((status) => (
              <Pressable
                key={status}
                style={styles.statusDropdownOption}
                onPress={() => {
                  setSelectedStatus(status);
                  setIsStatusDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.statusDropdownOptionText,
                    selectedStatus === status &&
                      styles.statusDropdownOptionTextSelected,
                  ]}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      <Pressable
        style={styles.statusDropdown}
        onPress={() => setIsStatusDropdownOpen(true)}
        accessibilityLabel="Chọn trạng thái sinh viên"
      >
        <Text style={styles.statusDropdownText}>
          Trạng thái: {selectedStatus}
        </Text>
        <Text style={styles.statusDropdownArrow}>v</Text>
      </Pressable>
      <SectionList
        sections={visibleSections}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderSectionHeader={({ section: { title, studentCount } }) => (
          <SectionHeader
            title={title}
            studentCount={studentCount}
            expanded={expandedSections.has(title)}
            onPress={() => toggleSection(title)}
            headerStyle={headerStyleBySection(title)}
          />
        )}
        renderSectionFooter={() => <View style={styles.sectionFooter} />}
        renderItem={({ item, section }) => (
          <StudentRow
            student={item}
            rowStyle={titleStyleBySection(section.title)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Không tìm thấy sinh viên</Text>
            <Text style={styles.emptyText}>
              Hãy thử tìm kiếm với họ tên, mã sinh viên hoặc lớp khác.
            </Text>
          </View>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

function titleStyleBySection(title: string) {
  const variant = title.charCodeAt(0) % 3;

  if (variant === 0) {
    return styles.studentRowBlue;
  }

  if (variant === 1) {
    return styles.studentRowGreen;
  }

  return styles.studentRowOrange;
}

function headerStyleBySection(title: string) {
  const variant = title.charCodeAt(0) % 3;

  if (variant === 0) {
    return styles.sectionHeaderBlue;
  }

  if (variant === 1) {
    return styles.sectionHeaderGreen;
  }

  return styles.sectionHeaderOrange;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  searchInput: {
    flex: 1,
    minHeight: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#DDE1E8",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    color: "#182035",
    fontSize: 15,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
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
  resultText: {
    color: "#4E5665",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  refreshStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  refreshStatusText: {
    color: "#3157A4",
    fontSize: 13,
    fontWeight: "600",
  },
  statusDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#DDE1E8",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  statusDropdownText: {
    color: "#596171",
    fontSize: 15,
    fontWeight: "600",
  },
  statusDropdownArrow: {
    color: "#3157A4",
    fontSize: 16,
    fontWeight: "800",
  },
  statusDropdownOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(24, 32, 53, 0.35)",
  },
  statusDropdownMenu: {
    overflow: "hidden",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  statusDropdownOption: {
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E5EC",
  },
  statusDropdownOptionText: {
    color: "#182035",
    fontSize: 15,
  },
  statusDropdownOptionTextSelected: {
    color: "#3157A4",
    fontWeight: "700",
  },
  statusFilters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  statusButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDE1E8",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  statusButtonSelected: {
    borderColor: "#3157A4",
    backgroundColor: "#E8F0FF",
  },
  statusButtonText: {
    color: "#596171",
    fontSize: 13,
    fontWeight: "600",
  },
  statusButtonTextSelected: {
    color: "#3157A4",
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#182035",
    backgroundColor: "#E8F0FF",
    padding: 12,
    marginTop: 12,
  },
  sectionHeaderBlue: {
    backgroundColor: "#E8F0FF",
  },
  sectionHeaderGreen: {
    backgroundColor: "#E7F6EF",
  },
  sectionHeaderOrange: {
    backgroundColor: "#FFF0DF",
  },
  sectionHeaderText: {
    color: "#182035",
    fontSize: 20,
    fontWeight: "700",
  },
  sectionStudentCount: {
    color: "#596171",
    fontSize: 13,
    marginTop: 4,
  },
  sectionHeaderArrow: {
    color: "#3157A4",
    fontSize: 24,
    fontWeight: "700",
  },
  sectionFooter: {
    height: 12,
    backgroundColor: "#F4F6FA",
  },
  studentRow: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E5EC",
  },
  studentRowBlue: {
    borderLeftWidth: 4,
    borderLeftColor: "#3157A4",
  },
  studentRowGreen: {
    borderLeftWidth: 4,
    borderLeftColor: "#2F8F62",
  },
  studentRowOrange: {
    borderLeftWidth: 4,
    borderLeftColor: "#D97724",
  },
  studentRowPressed: {
    opacity: 0.7,
  },
  studentName: {
    color: "#182035",
    fontSize: 16,
    fontWeight: "700",
  },
  studentInfo: {
    color: "#697080",
    fontSize: 14,
    marginTop: 6,
  },
  studentStatus: {
    color: "#3157A4",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
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
