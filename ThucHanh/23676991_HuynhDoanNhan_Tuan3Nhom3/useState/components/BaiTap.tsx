import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function GreetingScreen() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const numericAge = parseInt(age, 10);
  const isUnder18 = !isNaN(numericAge) && numericAge < 18;

  const handleClear = () => {
    setFullName('');
    setAge('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {fullName ? `Xin chào, ${fullName}!` : 'Vui lòng nhập họ tên'}
      </Text>

      {isUnder18 && (
        <Text style={styles.warning}>Cảnh báo: Bạn chưa đủ 18 tuổi!</Text>
      )}

      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ tên"
      />

      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Nhập tuổi"
        keyboardType="numeric"
      />

      <Button title="Xóa toàn bộ" onPress={handleClear} color="#d9534f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 16,
    justifyContent: 'center',
    padding: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  warning: {
    fontSize: 15,
    color: '#d9534f',
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});
