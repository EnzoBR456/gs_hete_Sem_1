import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function ScreenInsertion({ navigation }) {
  const [city, setCity] = useState('');
  const [humidity, setHumidity] = useState('');
  const [inclination, setInclination] = useState('');

  const getRiskLevel = (humidity, inclination) => {
    if (humidity > 60 && inclination > 30) return 'Alto';
    if (humidity > 40 || inclination > 20) return 'Moderado';
    return 'Baixo';
  };

  const saveData = async () => {
    if (!humidity || !inclination || !city) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const parsedHumidity = parseFloat(humidity);
    const parsedInclination = parseFloat(inclination);
    const risk = getRiskLevel(parsedHumidity, parsedInclination);

    const data = {
      humidity: parsedHumidity,
      inclination: parsedInclination,
      city,
      timestamp: new Date().toISOString(),
      risk,
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

      <Text>Selecione sua Cidade</Text>
      <View style={{ borderWidth: 1, marginVertical: 10 }}>
        <Picker selectedValue={city} onValueChange={setCity}>
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Rio de Janeiro" value="Rio de Janeiro" />
          <Picker.Item label="São Paulo" value="São Paulo" />
          <Picker.Item label="Belo Horizonte" value="Belo Horizonte" />
          <Picker.Item label="Curitiba" value="Curitiba" />
          <Picker.Item label="Porto Alegre" value="Porto Alegre" />
        </Picker>
      </View>

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


