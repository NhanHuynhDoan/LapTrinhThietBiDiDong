import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from "../data/students";

type StudentRowProps = {
  student: Student;
  rowStyle?: object;
};

export function StudentRow({ student, rowStyle }: StudentRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.studentRow,
        rowStyle,
        pressed && styles.studentRowPressed,
      ]}
      onPress={() =>
        Alert.alert(
          student.fullName,
          `MSSV: ${student.studentId}\nLớp: ${student.className}\nTrạng thái: ${student.status}`,
        )
      }
    >
      <Text style={styles.studentName}>{student.fullName}</Text>
      <Text style={styles.studentInfo}>
        MSSV: {student.studentId} | Lớp: {student.className}
      </Text>
      <Text style={styles.studentStatus}>{student.status}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  studentRow: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E5EC",
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
});
