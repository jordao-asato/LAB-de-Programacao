import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa a tela que será exibida na pilha
import WatchListScreen from '../screens/WatchListScreen';

// Cria a pilha de navegação
const Stack = createStackNavigator();

// Define o componente que gerencia a navegação dentro da aba "Watch List"
const WatchListStack = () => (
  <Stack.Navigator>
    {/* Adiciona a tela "Watch List" à pilha */}
    <Stack.Screen
      name="WatchList" // Nome da tela na navegação
      component={WatchListScreen} // Componente que será renderizado
      options={{ title: 'Watch List', headerShown: false }} // Configurações da tela
    />
  </Stack.Navigator>
);

// Exporta o stack navigator para ser usado no BottomTabNavigator
export default WatchListStack;
