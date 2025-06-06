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


      if (latest && latest.risk === 'Alto') {
        Alert.alert(
          '⚠️ Alerta de Risco',
          'Risco alto de deslizamento detectado! \nFique longe do local.',
          [{ text: 'OK' }]
        );
      }
    };
    fetchData();
  }, []);

  if (!lastEntry) return <Text style={{ padding: 20 }}>Carregando dados...</Text>;

  const { humidity, inclination, city, risk } = lastEntry;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Nível de Risco Atual</Text>
      <Text>Umidade: {humidity}%</Text>
      <Text>Inclinação: {inclination}°</Text>
      <Text>Cidade: {city}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Risco: {risk}</Text>

      {risk === 'Alto' && (
        <View style={{
          backgroundColor: '#FFCCCC',
          padding: 10,
          borderRadius: 8,
          marginVertical: 15,
          borderWidth: 1,
          borderColor: '#FF0000'
        }}>
          <Text style={{ color: '#B00000', fontWeight: 'bold', textAlign: 'center' }}>
            ⚠️ Atenção: Risco alto de deslizamento! Tome precauções imediatas.
          </Text>
        </View>
      )}

      <Button title="Ver Histórico" onPress={() => navigation.navigate('Histórico')} />
    </View>
  );
}

