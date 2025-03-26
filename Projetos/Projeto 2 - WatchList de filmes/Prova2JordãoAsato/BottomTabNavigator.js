import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importa as telas que serão exibidas nas abas
import HomeScreen from '../screens/HomeScreen';
import FilmesAssistidosStack from './FilmesAssistidosStack'; // Pilha de navegação para Filmes Assistidos
import WatchListStack from './WatchListStack'; // Pilha de navegação para Watch List

// Cria o navegador de abas
const Tab = createBottomTabNavigator();

// Define o componente responsável pela navegação entre as abas
const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // Define os ícones das abas com base no nome da rota
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home'; // Ícone para a aba Home
        else if (route.name === 'Filmes Assistidos') iconName = 'film'; // Ícone para Assistidos
        else if (route.name === 'Watch List') iconName = 'list'; // Ícone para Watch List
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      // Cor da aba ativa (selecionada)
      tabBarActiveTintColor: '#007AFF',
      // Cor da aba inativa (não selecionada)
      tabBarInactiveTintColor: 'gray',
    })}
  >
    {/* Define as telas que aparecerão na navegação por abas */}
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Filmes Assistidos" component={FilmesAssistidosStack} />
    <Tab.Screen name="Watch List" component={WatchListStack} />
  </Tab.Navigator>
);

// Exporta o navegador de abas para ser usado no App.js
export default BottomTabNavigator;
