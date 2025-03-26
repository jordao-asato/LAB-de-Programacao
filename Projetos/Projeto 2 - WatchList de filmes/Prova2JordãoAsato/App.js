import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import { GlobalProvider } from './src/context/GlobalContext';
import WatchedScreen from './src/screens/WatchedScreen';  // Importando a tela de filmes assistidos

const RootStack = createStackNavigator();

const App = () => (
  <GlobalProvider>
    <NavigationContainer>
      <RootStack.Navigator>
        {/* Tela principal com Bottom Tab Navigator */}
        <RootStack.Screen 
          name="Main" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }} 
        />
        {/* Tela de detalhes do filme */}
        <RootStack.Screen 
          name="Detalhes" 
          component={MovieDetailsScreen} 
          options={{ title: 'Detalhes do Filme' }} 
        />
        {/* Tela de filmes assistidos */}
        <RootStack.Screen 
          name="Filmes Assistidos" 
          component={WatchedScreen} 
          options={{ title: 'Filmes Assistidos' }} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </GlobalProvider>
);

export default App;
