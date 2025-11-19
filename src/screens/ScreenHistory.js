import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScreenHistory({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await AsyncStorage.getItem('monitoringData');
      const parsed = data ? JSON.parse(data) : [];
      setHistory(parsed);
    };
    fetchHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Histórico do Clima Organizacional</Text>

      {history.map((item, index) => (
        <View key={index} style={{ borderBottomWidth: 1, paddingBottom: 5, marginBottom: 10 }}>
          <Text>{new Date(item.timestamp).toLocaleString()}</Text>
          <Text>Cidade: {item.city}</Text>
          <Text>Comunicação: {item.communication}%</Text>
          <Text>Colaboração: {item.collaboration}%</Text>
          <Text>Clima: {item.climate}</Text>
        </View>
      ))}

      <Button title="Ver Ações de Melhoria" onPress={() => navigation.navigate('Ações')} />
    </ScrollView>
  );
}

