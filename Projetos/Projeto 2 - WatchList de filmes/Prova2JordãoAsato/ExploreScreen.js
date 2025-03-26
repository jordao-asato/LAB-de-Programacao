import React, { useEffect, useState } from 'react';

// Importa os componentes do React Native para exibição e estilos
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';

// Importa a função que busca os filmes populares da API do TMDB
import { getPopularMovies } from '../services/tmdbService';

// Define o componente ExploreScreen, responsável por exibir os filmes populares
const ExploreScreen = () => {
  // Estado para armazenar a lista de filmes populares
  const [movies, setMovies] = useState([]);

  // Estado para controlar o carregamento da requisição
  const [loading, setLoading] = useState(true);

  // Efeito colateral para buscar os filmes populares assim que a tela é carregada
  useEffect(() => {
    // Função assíncrona que busca os filmes da API e atualiza o estado
    const fetchMovies = async () => {
      const data = await getPopularMovies(); // Chama a função que busca os filmes populares
      setMovies(data); // Atualiza o estado com os filmes recebidos
      setLoading(false); // Define o carregamento como concluído
    };
    
    fetchMovies(); // Executa a função de busca
  }, []); // O efeito roda apenas uma vez quando o componente é montado

  return (
    // Contêiner principal da tela
    <View style={styles.container}>
      {/* Exibe um indicador de carregamento enquanto os filmes estão sendo buscados */}
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        // Exibe a lista de filmes populares quando os dados são carregados
        <FlatList
          data={movies} // Passa os filmes como fonte de dados
          keyExtractor={(item) => item.id.toString()} // Usa o ID do filme como chave única
          renderItem={({ item }) => ( // Define como cada item da lista será renderizado
            <View style={styles.movieItem}>
              {/* Exibe o pôster do filme */}
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
                style={styles.poster}
              />
              {/* Exibe o título do filme */}
              <Text style={styles.title}>{item.title}</Text>
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
    backgroundColor: '#121212', // Define um fundo escuro
    padding: 10, // Adiciona um espaçamento interno
  },
  movieItem: {
    marginBottom: 20, // Adiciona espaço entre os filmes
    alignItems: 'center', // Centraliza os itens
  },
  poster: {
    width: 150, // Largura do pôster
    height: 225, // Altura do pôster
    borderRadius: 10, // Arredonda as bordas do pôster
  },
  title: {
    marginTop: 10, // Adiciona um espaço acima do título
    color: '#FFF', // Define a cor do texto como branco
    fontSize: 16, // Define o tamanho da fonte
    fontWeight: 'bold', // Deixa o texto em negrito
    textAlign: 'center', // Centraliza o texto
  },
});

// Exporta o componente para ser usado em outras partes do aplicativo
export default ExploreScreen;
