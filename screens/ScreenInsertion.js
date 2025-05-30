import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScreenInsertion({ navigation }) {
  const [humidity, setHumidity] = useState('');
  const [inclination, setInclination] = useState('');

  const saveData = async () => {
    const data = {
      humidity: parseFloat(humidity),
      inclination: parseFloat(inclination),
      timestamp: new Date().toISOString(),
    };

    try {
      const existingData = await AsyncStorage.getItem('monitoringData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      parsedData.push(data);
      await AsyncStorage.setItem('monitoringData', JSON.stringify(parsedData));
      Alert.alert('Sucesso', 'Dados salvos com sucesso');
      navigation.navigate('Riscos');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Inserir Dados Ambientais</Text>
      <Text>Umidade do Solo (%)</Text>
      <TextInput
        keyboardType="numeric"
        value={humidity}
        onChangeText={setHumidity}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Text>Inclinação (graus)</Text>
      <TextInput
        keyboardType="numeric"
        value={inclination}
        onChangeText={setInclination}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Salvar e Ver Riscos" onPress={saveData} />
    </ScrollView>
  );
}
