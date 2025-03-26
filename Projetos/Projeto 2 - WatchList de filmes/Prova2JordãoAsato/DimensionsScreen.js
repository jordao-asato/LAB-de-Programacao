// Importa o React e os hooks necessários para gerenciar o estado e detectar mudanças
import React, { useState, useEffect } from 'react';

// Importa os componentes do React Native para exibição e estilos
import { View, Text, Dimensions, StyleSheet } from 'react-native';

// Define o componente que exibe as dimensões da tela
export default function DimensionsScreen() {
  // Estado para armazenar as dimensões atuais da tela
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  // Efeito colateral para monitorar mudanças no tamanho da tela
  useEffect(() => {
    // Função que atualiza o estado quando a tela muda de tamanho
    const updateDimensions = () => setDimensions(Dimensions.get('window'));

    // Adiciona um listener para detectar mudanças no tamanho da tela
    Dimensions.addEventListener('change', updateDimensions);

    // Remove o listener quando o componente é desmontado para evitar vazamento de memória
    return () => Dimensions.removeEventListener('change', updateDimensions);
  }, []); // Executa apenas uma vez quando o componente é montado

  return (
    // Contêiner que centraliza o texto na tela
    <View style={styles.container}>
      {/* Exibe a largura da tela */}
      <Text style={styles.text}>Largura: {dimensions.width}</Text>

      {/* Exibe a altura da tela */}
      <Text style={styles.text}>Altura: {dimensions.height}</Text>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  text: {
    fontSize: 18, // Define o tamanho da fonte do texto
  },
});
