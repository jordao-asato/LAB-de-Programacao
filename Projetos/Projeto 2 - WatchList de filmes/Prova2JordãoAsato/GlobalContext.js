// Importa React e os hooks necessários para gerenciar o estado e criar um contexto global
import React, { createContext, useState } from 'react';

// Cria o contexto global que será usado para armazenar as listas de filmes
export const GlobalContext = createContext();

// Componente que fornece o contexto para toda a aplicação
export const GlobalProvider = ({ children }) => {

  // Estado que armazena a lista de filmes assistidos
  const [watched, setWatched] = useState([]);

  // Estado que armazena a lista de filmes para assistir (Watch List)
  const [watchList, setWatchList] = useState([]);

  // Adiciona um filme à lista de assistidos
  const addToWatched = (movie) => {
    setWatched((prevWatched) => [...prevWatched, movie]); // Adiciona o novo filme mantendo os existentes
    console.log("Filme adicionado à lista de assistidos:", movie); // Exibe no console para depuração
  };

  // Adiciona um filme à Watch List
  const addToWatchList = (movie) => {
    setWatchList((prev) => [...prev, movie]); // Adiciona o filme mantendo os existentes
    console.log("Filme adicionado à watch list:", movie);
  };

  // Remove um filme da lista de assistidos
  const removeFromWatched = (movieId) => {
    setWatched((prevWatched) => {
      const newWatched = prevWatched.filter(movie => movie.id !== movieId); // Filtra e remove o filme pelo ID
      console.log("Filme removido da lista de assistidos:", movieId);
      return newWatched;
    });
  };

  // Remove um filme da Watch List
  const removeFromWatchList = (movieId) => {
    setWatchList((prevWatchList) => {
      const newWatchList = prevWatchList.filter(movie => movie.id !== movieId); // Filtra e remove o filme pelo ID
      console.log("Filme removido da watch list:", movieId);
      return newWatchList;
    });
  };

  return (
    // Fornece o contexto para os componentes filhos, permitindo acesso às listas e funções
    <GlobalContext.Provider value={{ 
      watched, watchList, 
      addToWatched, addToWatchList, 
      removeFromWatched, removeFromWatchList 
    }}>
      {children} {/* Renderiza os componentes filhos dentro do contexto */}
    </GlobalContext.Provider>
  );
};
