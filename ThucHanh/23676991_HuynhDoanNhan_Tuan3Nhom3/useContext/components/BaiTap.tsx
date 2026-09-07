import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Image } from "react-native";
import { UserProvider, useUser } from "../context/UserContext";

function ProfileScreen() {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <View style={styles.profileContainer}>
        <Text style={styles.loggedOutText}>Bạn đã đăng xuất</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <Image source={user.avatar} style={styles.avatar} />
      <Text style={styles.welcomeText}>Xin chào, {user.name}</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Đăng xuất" onPress={logout} />
    </View>
  );
}

export default function BaiTap() {
  const [inputName, setInputName] = useState("");

  return (
    <UserProvider>
      <View style={styles.container}>
        <ProfileScreen />

        <NameEditor inputName={inputName} setInputName={setInputName} />
      </View>
    </UserProvider>
  );
}

interface NameEditorProps {
  inputName: string;
  setInputName: (name: string) => void;
}

function NameEditor({ inputName, setInputName }: NameEditorProps) {
  const { user, updateUserName } = useUser();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputName}
        onChangeText={setInputName}
        placeholder="Nhập tên mới..."
      />
      <Button
        title="Đổi tên"
        onPress={() => {
          if (inputName.trim() !== "") {
            updateUserName(inputName.trim());
            setInputName("");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  profileContainer: {
    padding: 20,
    backgroundColor: "#f0f4f8",
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a365d",
    textAlign: "center",
  },
  emailText: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    color: "#4a5568",
  },
  loggedOutText: {
    fontSize: 18,
    color: "#4a5568",
  },
  inputContainer: {
    width: "100%",
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});
