import React from 'react'; // Importa o React para criar componentes
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'; // Importa componentes do React Native

// Componente MovieItem: exibe um item de filme com título e botão de remover
export default function MovieItem({ title, onRemove, onPress }) {
  return (
    // TouchableOpacity: torna o item clicável
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {/* Text: exibe o título do filme */}
      <Text style={styles.text}>{title}</Text>
      {/* Button: botão para remover o filme da lista */}
      <Button title="Remover" onPress={onRemove} />
    </TouchableOpacity>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  item: {
    padding: 10, // Espaçamento interno
    marginVertical: 5, // Margem vertical entre os itens
    backgroundColor: '#ddd', // Cor de fundo do item
    flexDirection: 'row', // Alinha os elementos em linha (horizontal)
    justifyContent: 'space-between', // Espaço entre o título e o botão
    alignItems: 'center', // Centraliza os elementos verticalmente
  },
  text: {
    fontSize: 16, // Tamanho da fonte do título
  },
});
