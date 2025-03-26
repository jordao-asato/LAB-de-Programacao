import React, { useContext } from 'react'; // Importa React e useContext para acessar o contexto
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'; // Importa componentes do React Native
import { GlobalContext } from '../context/GlobalContext'; // Importa o contexto global

const WatchListScreen = () => {
  // Acessa a watchList (lista de filmes) e a função removeFromWatchList do contexto global
  const { watchList, removeFromWatchList } = useContext(GlobalContext);

  return (
    // Container principal da tela
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Watch List</Text>

      {/* Verifica se a watchList está vazia */}
      {watchList.length === 0 ? (
        // Se estiver vazia, exibe uma mensagem
        <Text style={styles.noMoviesText}>Nenhum filme na watch list ainda.</Text>
      ) : (
        // Se houver filmes, exibe uma FlatList
        <FlatList
          data={watchList} // Dados da lista (watchList)
          keyExtractor={(item) => item.id.toString()} // Extrai a chave única de cada item
          renderItem={({ item }) => ( // Renderiza cada item da lista
            <View style={styles.movieItem}>
              {/* Título do filme */}
              <Text style={styles.movieTitle}>{item.title}</Text>
              {/* Botão para remover o filme da lista */}
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => removeFromWatchList(item.id)} // Chama a função para remover o filme
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

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#1a1a1a', // Cor de fundo escura
    padding: 20, // Espaçamento interno
  },
  title: {
    fontSize: 24, // Tamanho da fonte
    fontWeight: 'bold', // Fonte em negrito
    color: '#fff', // Cor do texto (branco)
    marginBottom: 20, // Margem inferior
  },
  noMoviesText: {
    fontSize: 16, // Tamanho da fonte
    color: '#fff', // Cor do texto (branco)
    textAlign: 'center', // Centraliza o texto
    marginTop: 20, // Margem superior
  },
  movieItem: {
    marginBottom: 15, // Margem inferior entre os itens
    padding: 10, // Espaçamento interno
    backgroundColor: '#333', // Cor de fundo do item
    borderRadius: 5, // Borda arredondada
    flexDirection: 'row', // Alinha os elementos em linha
    justifyContent: 'space-between', // Espaço entre o título e o botão
    alignItems: 'center', // Centraliza os elementos verticalmente
  },
  movieTitle: {
    fontSize: 18, // Tamanho da fonte
    color: '#fff', // Cor do texto (branco)
  },
  deleteButton: {
    backgroundColor: 'red', // Cor de fundo do botão
    padding: 10, // Espaçamento interno
    borderRadius: 5, // Borda arredondada
  },
  buttonText: {
    color: '#fff', // Cor do texto (branco)
    fontSize: 14, // Tamanho da fonte
  },
});

export default WatchListScreen; // Exporta o componente para ser usado em outros lugares
