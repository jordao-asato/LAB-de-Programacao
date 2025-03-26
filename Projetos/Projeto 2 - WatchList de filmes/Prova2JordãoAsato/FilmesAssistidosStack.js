import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa a tela que será exibida na pilha
import FilmesAssistidosScreen from '../screens/WatchedScreen';

// Cria a pilha de navegação
const Stack = createStackNavigator();

// Define o componente que gerencia a navegação dentro da aba "Filmes Assistidos"
const FilmesAssistidosStack = () => (
  <Stack.Navigator>
    {/* Adiciona a tela "Filmes Assistidos" à pilha */}
    <Stack.Screen
      name="FilmesAssistidos" // Nome da tela na navegação
      component={FilmesAssistidosScreen} // Componente que será renderizado
      options={{ title: 'Filmes Assistidos', headerShown: false }} // Configurações da tela
    />
  </Stack.Navigator>
);

// Exporta o stack navigator para ser usado no BottomTabNavigator
export default FilmesAssistidosStack;
