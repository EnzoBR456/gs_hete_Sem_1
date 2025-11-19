import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScreenVisualization({ navigation }) {
  const [lastEntry, setLastEntry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('monitoringData');
      const parsed = data ? JSON.parse(data) : [];
      const latest = parsed[parsed.length - 1];
      setLastEntry(latest);

      if (latest && latest.climate === 'Crítico') {
        Alert.alert(
          '⚠️ Clima Organizacional Crítico',
          'O ambiente de trabalho apresenta sinais preocupantes.',
          [{ text: 'OK' }]
        );
      }
    };
    fetchData();
  }, []);

  if (!lastEntry) return <Text style={{ padding: 20 }}>Carregando dados...</Text>;

  const { communication, collaboration, city, climate } = lastEntry;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Clima Organizacional Atual</Text>

      <Text>Comunicação: {communication}%</Text>
      <Text>Colaboração: {collaboration}%</Text>
      <Text>Cidade: {city}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Clima: {climate}</Text>

      {climate === 'Crítico' && (
        <View style={{
          backgroundColor: '#FFCCCC',
          padding: 10,
          borderRadius: 8,
          marginVertical: 15,
          borderWidth: 1,
          borderColor: '#FF0000'
        }}>
          <Text style={{ color: '#B00000', fontWeight: 'bold', textAlign: 'center' }}>
            ⚠️ Atenção: Clima crítico! Ações urgentes recomendadas.
          </Text>
        </View>
      )}

      <Button title="Ver Histórico" onPress={() => navigation.navigate('Histórico')} />
    </View>
  );
}
