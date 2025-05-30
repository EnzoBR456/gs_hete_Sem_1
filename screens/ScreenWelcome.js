import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ScreenWelcome({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20 }}>
        Bem-vindo ao Alerta Deslizamento
      </Text>
      <Button title="Começar" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}
