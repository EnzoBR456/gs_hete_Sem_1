import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Gráficos
import { LineChart } from 'react-native-chart-kit';

export default function ScreenVisualization({ navigation }) {
  const [lastEntry, setLastEntry] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('monitoringData');
      const parsed = data ? JSON.parse(data) : [];

      setHistory(parsed);

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

  // ============
  // GRÁFICO: ajustes finais
  // ============

  const labels = history.map((item) => {
    const d = new Date(item.timestamp);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  });

  // Convertendo qualquer string para número
  const communicationData = history.map((item) =>
    Number(item.communication) || 0
  );

  const collaborationData = history.map((item) =>
    Number(item.collaboration) || 0
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
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

      {/* ========================== */}
      {/*  GRÁFICO DA COMUNICAÇÃO    */}
      {/* ========================== */}

      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
        Evolução da Comunicação
      </Text>

      {history.length > 1 ? (
        <LineChart
          data={{
            labels,
            datasets: [
              { data: communicationData }
            ],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#e3f0ff",
            backgroundGradientTo: "#bcdcff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 102, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>Aguardando mais dados para gerar o gráfico…</Text>
      )}

      {/* ========================== */}
      {/*  GRÁFICO DA COLABORAÇÃO   */}
      {/* ========================== */}

      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
        Evolução da Colaboração
      </Text>

      {history.length > 1 ? (
        <LineChart
          data={{
            labels,
            datasets: [
              { data: collaborationData, color: () => "red" }
            ],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#ffe6e6",
            backgroundGradientTo: "#ffcccc",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>Aguardando mais dados para gerar o gráfico…</Text>
      )}

      <Button
        title="Ver Histórico Completo"
        onPress={() => navigation.navigate('Histórico')}
      />
    </ScrollView>
  );
}


