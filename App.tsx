import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das telas
import ScreenWelcome from './screens/ScreenWelcome';
import ScreenMenu from './screens/ScreenMenu';
import ScreenInsertion from './screens/ScreenInsertion';
import ScreenVisualization from './screens/ScreenVisualization';
import ScreenHistory from './screens/ScreenHistory';
import ScreenAction from './screens/ScreenAction';

export type RootStackParamList = {
  'Boas-vindas': undefined;
  'Menu': undefined;
  'Inserção': undefined;
  'Riscos': undefined;
  'Histórico': undefined;
  'Ações': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Boas-vindas">
        <Stack.Screen name="Boas-vindas" component={ScreenWelcome} />
        <Stack.Screen name="Menu" component={ScreenMenu} />
        <Stack.Screen name="Inserção" component={ScreenInsertion} />
        <Stack.Screen name="Riscos" component={ScreenVisualization} />
        <Stack.Screen name="Histórico" component={ScreenHistory} />
        <Stack.Screen name="Ações" component={ScreenAction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
