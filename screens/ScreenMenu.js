import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

export default function ScreenMenu({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Menu Principal</Text>
      <Button title="Tela de Boas-vindas" onPress={() => navigation.navigate('Boas-vindas')} />
      <View style={{ height: 10 }} />
      <Button title="Inserção de Dados" onPress={() => navigation.navigate('Inserção')} />
      <View style={{ height: 10 }} />
      <Button title="Visualização de Riscos" onPress={() => navigation.navigate('Riscos')} />
      <View style={{ height: 10 }} />
      <Button title="Histórico de Monitoramento" onPress={() => navigation.navigate('Histórico')} />
      <View style={{ height: 10 }} />
      <Button title="Ações de Mitigação" onPress={() => navigation.navigate('Ações')} />
    </ScrollView>
  );
}

