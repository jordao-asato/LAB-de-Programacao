import React, { useState, useEffect } from 'react';

// Importa os componentes do React Native para construção da interface
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Importa a API do TMDB para buscar filmes
import tmdbApi from '../api/tmdbApi';

// Importa o hook de navegação para permitir troca de telas
import { useNavigation } from '@react-navigation/native';

// Define o componente HomeScreen
const HomeScreen = () => {
  // Estado para armazenar o termo de busca digitado pelo usuário
  const [query, setQuery] = useState('');

  // Estado para armazenar os filmes retornados pela busca
  const [movies, setMovies] = useState([]);

  // Estado para armazenar os filmes populares obtidos da API
  const [popularMovies, setPopularMovies] = useState([]);

  // Obtém o objeto de navegação para permitir troca de telas
  const navigation = useNavigation();

  // Efeito colateral para buscar os filmes populares quando a tela é carregada
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const results = await tmdbApi.getPopularMovies(); // Busca os filmes populares
      setPopularMovies(results); // Atualiza o estado com os filmes populares
    };
    fetchPopularMovies();
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para buscar filmes pelo nome digitado no campo de entrada
  const searchMovies = async () => {
    const results = await tmdbApi.searchMovies(query); // Faz a busca na API
    setMovies(results); // Atualiza o estado com os filmes encontrados
  };

  // Renderiza cada item da lista de filmes
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('Detalhes', { id: item.id })} // Navega para a tela de detalhes ao clicar no filme
    >
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    // Contêiner principal da tela
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.headerText}>Buscar Filmes</Text>

      {/* Campo de entrada para busca */}
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme"
        value={query} // Controla o estado do input
        onChangeText={setQuery} // Atualiza o estado sempre que o usuário digita
      />

      {/* Botão para iniciar a busca */}
      <Button title="Buscar" onPress={searchMovies} />

      {/* Lista de resultados da busca, exibida apenas se houver resultados */}
      {movies.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Resultados da Busca:</Text>
          <FlatList
            data={movies} // Dados da busca
            keyExtractor={(item) => item.id.toString()} // Define o identificador único de cada item
            renderItem={renderMovieItem} // Define como os itens da lista são exibidos
            style={styles.list}
          />
        </>
      )}

      {/* Lista de filmes populares */}
      <Text style={styles.sectionTitle}>Filmes Populares</Text>
      <FlatList
        data={popularMovies} // Dados dos filmes populares
        keyExtractor={(item) => item.id.toString()} // Define o identificador único de cada item
        renderItem={renderMovieItem} // Define como os itens da lista são exibidos
        style={styles.list}
      />
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#1a1a1a', // Fundo escuro
    paddingTop: 20, // Espaço no topo
    paddingHorizontal: 15 // Espaço nas laterais
  },
  headerText: {
    fontSize: 24, // Tamanho grande do texto
    fontWeight: 'bold', // Negrito
    color: '#fff', // Texto branco
    marginBottom: 20 // Espaçamento abaixo do título
  },
  input: {
    height: 40, // Altura do campo de entrada
    borderColor: '#444', // Cor da borda
    borderWidth: 1, // Espessura da borda
    borderRadius: 5, // Arredonda os cantos
    paddingHorizontal: 10, // Espaçamento interno
    color: '#fff', // Texto branco
    marginBottom: 15, // Espaço abaixo do input
    backgroundColor: '#333' // Fundo do input
  },
  sectionTitle: {
    fontSize: 18, // Tamanho do texto
    fontWeight: 'bold', // Negrito
    color: '#fff', // Texto branco
    marginTop: 20, // Espaço acima
    marginBottom: 10 // Espaço abaixo
  },
  list: {
    marginTop: 10 // Espaçamento superior
  },
  movieItem: {
    backgroundColor: '#444', // Fundo do item de filme
    padding: 15, // Espaçamento interno
    marginBottom: 10, // Espaçamento entre os filmes
    borderRadius: 5, // Arredondamento das bordas
    borderWidth: 1, // Borda do item
    borderColor: '#333' // Cor da borda
  },
  movieTitle: {
    fontSize: 16, // Tamanho do texto do título
    color: '#fff', // Texto branco
    fontWeight: '500' // Peso da fonte
  }
});

// Exporta o componente para ser usado no app
export default HomeScreen;
