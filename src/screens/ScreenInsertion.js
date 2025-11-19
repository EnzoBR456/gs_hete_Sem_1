import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function ScreenInsertion({ navigation }) {
  const [city, setCity] = useState('');
  const [communication, setCommunication] = useState('');
  const [collaboration, setCollaboration] = useState('');

  const getClimateStatus = (communication, collaboration) => {
    if (communication >= 70 && collaboration >= 70) return 'Favorável';
    if (communication >= 40 || collaboration >= 40) return 'Instável';
    return 'Crítico';
  };

  const saveData = async () => {
    if (!communication || !collaboration || !city) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const parsedCommunication = parseFloat(communication);
    const parsedCollaboration = parseFloat(collaboration);
    const climate = getClimateStatus(parsedCommunication, parsedCollaboration);

    const data = {
      communication: parsedCommunication,
      collaboration: parsedCollaboration,
      city,
      timestamp: new Date().toISOString(),
      climate,
    };

    try {
      const existingData = await AsyncStorage.getItem('monitoringData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      parsedData.push(data);
      await AsyncStorage.setItem('monitoringData', JSON.stringify(parsedData));
      Alert.alert('Sucesso', 'Dados salvos com sucesso');
      navigation.navigate('Clima');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Inserir Indicadores de Clima Organizacional</Text>

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

      <Text>Qualidade da Comunicação (%)</Text>
      <TextInput
        keyboardType="numeric"
        value={communication}
        onChangeText={setCommunication}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />

      <Text>Nível de Colaboração da Equipe (%)</Text>
      <TextInput
        keyboardType="numeric"
        value={collaboration}
        onChangeText={setCollaboration}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />

      <Button title="Salvar e Ver Clima" onPress={saveData} />
    </ScrollView>
  );
}
