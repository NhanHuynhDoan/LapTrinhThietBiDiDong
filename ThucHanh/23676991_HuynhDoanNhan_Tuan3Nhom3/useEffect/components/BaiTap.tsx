import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function ConnectionStatusScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Chưa kết nối');
  const [lastConnectedTime, setLastConnectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
      setLastConnectedTime(new Date().toLocaleTimeString('vi-VN'));
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Text style={[styles.statusText, { color: isConnected ? 'green' : 'red' }]}>
        {message}
      </Text>

      {lastConnectedTime && (
        <Text style={styles.timeText}>
          Thời điểm kết nối gần nhất: {lastConnectedTime}
        </Text>
      )}

      <Switch value={isConnected} onValueChange={setIsConnected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
