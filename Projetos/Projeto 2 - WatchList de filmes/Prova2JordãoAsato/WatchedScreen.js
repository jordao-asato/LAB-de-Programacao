// Importa o React e os hooks necessários para acessar o contexto global
import React, { useContext } from 'react';

// Importa os componentes do React Native para exibição e interação
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Importa o contexto global, que armazena a lista de filmes assistidos
import { GlobalContext } from '../context/GlobalContext';

// Define o componente WatchedScreen
const WatchedScreen = () => {
  // Obtém os filmes assistidos e a função para removê-los do contexto global
  const { watched, removeFromWatched } = useContext(GlobalContext);

  return (
    // Contêiner principal da tela
    <View style={styles.container}>
      {/* Título da seção */}
      <Text style={styles.title}>Filmes Assistidos</Text>

      {/* Se a lista de filmes estiver vazia, exibe uma mensagem */}
      {watched.length === 0 ? (
        <Text style={styles.noMoviesText}>Nenhum filme assistido ainda.</Text>
      ) : (
        // Exibe a lista de filmes usando FlatList para renderização eficiente
        <FlatList
          data={watched} // Passa a lista de filmes como fonte de dados
          keyExtractor={(item) => item.id.toString()} // Define um identificador único para cada item
          renderItem={({ item }) => ( // Define como cada item será renderizado
            <View style={styles.movieItem}>
              {/* Exibe o título do filme */}
              <Text style={styles.movieTitle}>{item.title}</Text>

              {/* Botão para remover o filme da lista */}
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => removeFromWatched(item.id)} // Chama a função de remoção ao clicar
              >
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#1a1a1a', // Define um fundo escuro
    padding: 20, // Adiciona um espaçamento interno
  },
  title: {
    fontSize: 24, // Define o tamanho da fonte
    fontWeight: 'bold', // Texto em negrito
    color: '#fff', // Cor do texto branca
    marginBottom: 20, // Espaçamento abaixo do título
  },
  noMoviesText: {
    fontSize: 16, // Tamanho do texto
    color: '#fff', // Texto branco
    textAlign: 'center', // Centraliza o texto na tela
    marginTop: 20, // Espaço acima do texto
  },
  movieItem: {
    marginBottom: 15, // Espaço entre os itens da lista
    padding: 10, // Espaçamento interno
    backgroundColor: '#333', // Fundo do item de filme
    borderRadius: 5, // Borda arredondada
    flexDirection: 'row', // Alinha os elementos na horizontal
    justifyContent: 'space-between', // Espaça os elementos dentro do item
    alignItems: 'center', // Alinha os elementos verticalmente ao centro
  },
  movieTitle: {
    fontSize: 18, // Define o tamanho do texto
    color: '#fff', // Texto branco
  },
  deleteButton: {
    backgroundColor: 'red', // Cor de fundo do botão de remoção
    padding: 10, // Espaçamento interno
    borderRadius: 5, // Bordas arredondadas
  },
  buttonText: {
    color: '#fff', // Cor do texto branco
    fontSize: 14, // Tamanho do texto
  },
});

// Exporta o componente para ser usado em outras partes do aplicativo
export default WatchedScreen;
