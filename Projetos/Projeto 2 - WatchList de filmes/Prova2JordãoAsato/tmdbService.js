import axios from 'axios';

const API_KEY = '7ba65826413fa41afa233461af642a14';
const BASE_URL = 'https://api.themoviedb.org/3';

// Função para buscar filmes populares
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR', // Muda para português
        page: 1,
      },
    });
    return response.data.results; // Retorna os filmes
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};
