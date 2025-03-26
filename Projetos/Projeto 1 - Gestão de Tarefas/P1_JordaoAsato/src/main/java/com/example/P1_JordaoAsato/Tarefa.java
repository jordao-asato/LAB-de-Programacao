package com.example.P1_JordaoAsato;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Tarefa implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "O título é obrigatório")
    private String titulo;
    private String descricao;

    @NotNull(message = "O prazo de conclusão é obrigatório")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private java.util.Date prazoConclusao;

    public boolean getConcluida() {
        return concluida;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    private boolean concluida = false; //padrão = não concluída

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getPrazoConclusao() {
        return prazoConclusao;
    }

    public void setPrazoConclusao(Date prazoConclusao) {
        this.prazoConclusao = prazoConclusao;
    }

    @Override
    public boolean equals(Object o){
        if (o == null || this.getClass() != o.getClass()) {
            return false;
        }
        return ((Tarefa)o).id == (this.id);
    }

    @Override
    public int hashCode() {
        return id * 12345;
    }
}
