import { Pressable, StyleSheet, Text, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  studentCount: number;
  expanded: boolean;
  onPress: () => void;
  headerStyle?: object;
};

export function SectionHeader({
  title,
  studentCount,
  expanded,
  onPress,
  headerStyle,
}: SectionHeaderProps) {
  return (
    <Pressable
      style={[styles.sectionHeader, headerStyle]}
      onPress={onPress}
      accessibilityLabel={`${expanded ? "Thu gọn" : "Mở rộng"} nhóm chữ cái ${title}`}
    >
      <View>
        <Text style={styles.sectionHeaderText}>{title}</Text>
        <Text style={styles.sectionStudentCount}>{studentCount} sinh viên</Text>
      </View>
      <Text style={styles.sectionHeaderArrow}>{expanded ? "-" : "+"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8F0FF",
    padding: 12,
    marginTop: 12,
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
});
