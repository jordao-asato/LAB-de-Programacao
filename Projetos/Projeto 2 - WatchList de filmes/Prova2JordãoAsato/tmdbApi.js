import axios from 'axios'; // biblioteca axios para fazer requisições HTTP

// Chave da API do TMDB (The Movie Database)
const API_KEY = '734882a37e7447a0d41c11b27b3d56a0';

// URL base da API do TMDB
const BASE_URL = 'https://api.themoviedb.org/3';

// Objeto que contém as funções para interagir com a API do TMDB
const tmdbApi = {
    // Função para buscar filmes com base em uma consulta (query)
    searchMovies: async (query) => {
        try {
            // Faz uma requisição GET para a API, buscando filmes que correspondem à consulta
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    api_key: API_KEY, // Chave da API
                    query: query, // Termo de busca
                    language: 'pt-BR', // Idioma dos resultados (português do Brasil)
                },
            });
            // Retorna os resultados da busca (lista de filmes)
            return response.data.results;
        } catch (error) {
            // Em caso de erro, exibe uma mensagem no console e retorna uma lista vazia
            console.error('Erro ao buscar filmes:', error);
            return [];
        }
    },

    // Função para buscar os filmes populares
    getPopularMovies: async () => {
        try {
            // Faz uma requisição GET para a API, buscando filmes populares
            const response = await axios.get(`${BASE_URL}/movie/popular`, {
                params: {
                    api_key: API_KEY, // Chave da API
                    language: 'pt-BR', // Idioma dos resultados (português do Brasil)
                },
            });
            // Retorna os filmes populares
            return response.data.results;
        } catch (error) {
            // Em caso de erro, exibe uma mensagem no console e retorna uma lista vazia
            console.error('Erro ao buscar filmes populares:', error);
            return [];
        }
    },

    // Função para buscar detalhes de um filme específico pelo ID
    getMovieDetails: async (id) => {
        try {
            // Faz uma requisição GET para a API, buscando detalhes de um filme pelo ID
            const response = await axios.get(`${BASE_URL}/movie/${id}`, {
                params: {
                    api_key: API_KEY, // Chave da API
                    language: 'pt-BR', // Idioma dos resultados (português do Brasil)
                },
            });
            // Retorna os detalhes do filme
            return response.data;
        } catch (error) {
            // Em caso de erro, exibe uma mensagem no console e retorna null
            console.error('Erro ao buscar detalhes do filme:', error);
            return null;
        }
    }
};

export default tmdbApi;
