import { StyleSheet, Text, TextInput, View } from "react-native";

type SearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export function SearchField({
  value,
  onChangeText,
  onClear,
}: SearchFieldProps) {
  return (
    <View style={styles.searchRow}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm theo họ tên, mã sinh viên hoặc lớp"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <Text style={styles.clearButton} onPress={onClear}>
          Xóa
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 12,
    paddingTop: 17,
    borderRadius: 14,
    backgroundColor: "#3157A4",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
