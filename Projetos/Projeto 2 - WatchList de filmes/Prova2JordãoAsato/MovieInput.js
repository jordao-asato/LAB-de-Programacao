import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

// componente MovieInput, recebe a função 'onAddMovie' como prop
export default function MovieInput({ onAddMovie }) {
  // Define um estado 'movie' para armazenar o texto digitado no campo de entrada
  const [movie, setMovie] = useState('');

  return (
    // contêiner View 
    <View style={styles.inputContainer}>
      
      {/* Componente de entrada de texto para digitar o nome do filme */}
      <TextInput 
        style={styles.input}
        placeholder="Adicionar Filme"
        value={movie} 
        onChangeText={setMovie} // Atualiza o estado 'movie' sempre que o usuário digita
      />

      {/* Botão para adicionar o filme digitado à lista */}
      <Button 
        title="Adicionar" 
        onPress={() => { // Função acionada quando o botão é pressionado
          if (movie.trim()) { // se o campo não está vazio ou com espaços em branco;
            onAddMovie(movie); // chama onAddMovie e passa o nome do filme
            setMovie(''); // limpa o campo de entrada após a adição do filme
          }
        }} 
      />
    </View>
  );
}

// estilos para o componente
const styles = StyleSheet.create({
  // Estilo do contêiner que organiza o input e o botão lado a lado
  inputContainer: {
    flexDirection: 'row', // Alinha os elementos na horizontal
    marginBottom: 10, // Adiciona um espaço abaixo do componente
  },
  // Estilo do campo de entrada de texto
  input: {
    flex: 1, // Ocupa o espaço disponível dentro do contêiner
    borderBottomWidth: 1, // Adiciona uma linha na parte inferior do campo de entrada
    marginRight: 10, // Adiciona um espaço entre o campo de entrada e o botão
  },
});
