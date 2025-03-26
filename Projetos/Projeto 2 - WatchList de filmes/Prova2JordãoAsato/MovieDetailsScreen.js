import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

// Importa a API do TMDB para buscar os detalhes do filme
import tmdbApi from '../api/tmdbApi';

// Importa o contexto global para gerenciar os filmes adicionados
import { GlobalContext } from '../context/GlobalContext';

// Obtém as dimensões da tela do dispositivo
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Declara o componente MovieDetailsScreen, que recebe os parâmetros da rota
const MovieDetailsScreen = ({ route }) => {
  // Obtém o ID do filme passado como parâmetro da navegação
  const { id } = route.params;

  // Define o estado para armazenar os detalhes do filme
  const [movieDetails, setMovieDetails] = useState(null);

  // Obtém as funções do contexto global para adicionar filmes às listas
  const { addToWatched, addToWatchList } = useContext(GlobalContext);

  // Efeito colateral para buscar os detalhes do filme assim que o componente é montado
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await tmdbApi.getMovieDetails(id); // Busca os detalhes do filme na API
      setMovieDetails(details); // Atualiza o estado com os detalhes obtidos
    };
    fetchMovieDetails();
  }, [id]); // Executa o efeito sempre que o ID do filme muda

  // Se os detalhes do filme ainda não foram carregados, exibe uma mensagem de carregamento
  if (!movieDetails) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  // Função chamada ao pressionar o botão "Adicionar aos Assistidos"
  const handleAddWatched = () => {
    addToWatched(movieDetails); // Adiciona o filme à lista de assistidos
  };

  // Função chamada ao pressionar o botão "Adicionar à Watch List"
  const handleAddWatchlist = () => {
    addToWatchList(movieDetails); // Adiciona o filme à watch list
  };

  return (
    // Envolve todo o conteúdo em um ScrollView para permitir rolagem se necessário
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* Exibe o pôster do filme */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }} // URL do pôster do filme
        style={styles.poster}
        resizeMode="contain"
      />

      {/* Exibe o título do filme */}
      <Text style={styles.title}>{movieDetails.title}</Text>

      {/* Exibe a sinopse do filme */}
      <Text style={styles.overview}>{movieDetails.overview}</Text>

      {/* Botão para adicionar o filme à lista de assistidos */}
      <TouchableHighlight onPress={handleAddWatched} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar aos Assistidos</Text>
      </TouchableHighlight>

      {/* Botão para adicionar o filme à watch list */}
      <TouchableHighlight onPress={handleAddWatchlist} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar à Watch List</Text>
      </TouchableHighlight>

    </ScrollView>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Permite que o ScrollView ocupe toda a altura disponível
    backgroundColor: '#1a1a1a', // Define o fundo escuro
    padding: 20,
    paddingBottom: 30, // Adiciona um espaço extra no final
  },
  poster: {
    width: SCREEN_WIDTH - 40,  // Define a largura do pôster com margem nas laterais
    height: SCREEN_HEIGHT * 0.4, // Define uma altura proporcional à tela
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center', // Centraliza a imagem
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texto branco
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff', // Cor azul para o botão
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto branco para melhor contraste
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

// Exporta o componente para ser usado em outras partes do aplicativo
export default MovieDetailsScreen;
