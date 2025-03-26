package com.example.P1_JordaoAsato;

import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface TarefaRepository extends CrudRepository<Tarefa,Integer> {
    List<Tarefa> findByConcluida(Boolean concluida);
}
