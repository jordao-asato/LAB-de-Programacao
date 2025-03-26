// src/utils/storage.js - Persistência de dados
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getMovies() {
  const movies = await AsyncStorage.getItem('movies');
  return movies ? JSON.parse(movies) : [];
}

export async function saveMovies(movies) {
  await AsyncStorage.setItem('movies', JSON.stringify(movies));
}
