import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ScreenAction() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>AÇÕES DE MELHORIA</Text>

      <Text style={{ marginBottom: 10 }}>• Promover feedbacks rápidos e construtivos.</Text>
      <Text style={{ marginBottom: 10 }}>• Criar rituais semanais de alinhamento das equipes.</Text>
      <Text style={{ marginBottom: 10 }}>• Melhorar os canais de comunicação interna.</Text>
      <Text style={{ marginBottom: 10 }}>• Estimular colaboração entre áreas diferentes.</Text>
      <Text style={{ marginBottom: 10 }}>• Estabelecer metas claras e compartilhadas.</Text>

      <Button title="Voltar ao Menu" onPress={() => navigation.navigate('Menu')} />
    </ScrollView>
  );
}
