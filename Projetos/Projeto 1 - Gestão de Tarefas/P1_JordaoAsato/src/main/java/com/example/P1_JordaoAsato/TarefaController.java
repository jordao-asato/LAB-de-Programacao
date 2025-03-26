package com.example.P1_JordaoAsato;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
public class TarefaController {

    @Autowired
    TarefaRepository tarefaRepository;
    private static final String SESSION_CONCLUIDAS =
            "sessionConcluidas";

    @GetMapping("/nova-tarefa")
    public String mostrarFormNovaTarefa(Tarefa tarefa) {
        return "nova-tarefa";
    }

    @GetMapping(value = {"/index", "/"})
    public String mostrarListaTarefas(Model model) {
        model.addAttribute("tarefas", tarefaRepository.findAll());
        return "index";
    }

    @PostMapping("/adicionar-tarefa")
    public String adicionarTarefa(@Valid Tarefa tarefa,
                                  BindingResult result) {
        if (result.hasErrors()) {
            return "/nova-tarefa";
        }

        tarefaRepository.save(tarefa);
        return "redirect:/index";
    }

    @GetMapping("/remover/{id}")
    public String removerTarefa(@PathVariable("id") int id, HttpServletRequest request) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("O id da tarefa é inválido:" + id));
        tarefaRepository.delete(tarefa);

        List<Tarefa> sessionConcluidas =
                (List<Tarefa>) request.getSession().getAttribute(SESSION_CONCLUIDAS);

        sessionConcluidas.remove(tarefa);

        request.getSession().setAttribute(SESSION_CONCLUIDAS, sessionConcluidas);

        return "redirect:/index";
    }

    @GetMapping("/concluir/{id}")
    public String concluirTarefa(@PathVariable("id") int id, HttpServletRequest request) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("O id da tarefa é inválido: " + id));

        List<Tarefa> concluidas =
                (List<Tarefa>) request.getSession().getAttribute(SESSION_CONCLUIDAS);

        if (CollectionUtils.isEmpty(concluidas)) {
            concluidas = new ArrayList<>();
        }

        if (!concluidas.contains(tarefa)) {
            concluidas.add(tarefa);
        }

        tarefa.setConcluida(true);
        request.getSession().setAttribute(SESSION_CONCLUIDAS, concluidas);

        return "redirect:/concluidas";
    }

    @GetMapping("/concluidas")
    public String mostrarConcluidas(Model model, HttpServletRequest request) {
        List<Tarefa> concluidas =
                (List<Tarefa>) request.getSession().getAttribute(SESSION_CONCLUIDAS);
        model.addAttribute("sessionConcluidas",
                !CollectionUtils.isEmpty(concluidas) ? concluidas : new ArrayList<>());

        return "concluidas";
    }

    @GetMapping("/concluidas/remover/{id}")
    public String removerConcluida(@PathVariable("id") int id, HttpServletRequest request) {

        List<Tarefa> sessionConcluidas =
                (List<Tarefa>) request.getSession().getAttribute(SESSION_CONCLUIDAS);

        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "O id da tarefa é inválido: " + id));

        sessionConcluidas.remove(tarefa);
        tarefa.setConcluida(false);

        request.getSession().setAttribute(SESSION_CONCLUIDAS, sessionConcluidas);

        return "redirect:/concluidas";
    }

    @GetMapping("/filtrar")
    public String aplicarFiltros(HttpServletRequest request, Model model,
                                 @RequestParam(required = false) String palavraChave,
                                 @RequestParam(required = false) Boolean status,
                                 @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate prazo) {

        // aqui armazena os critérios na sessão
        if (palavraChave != null) {
            request.getSession().setAttribute("filtroPalavraChave", palavraChave);
        }
        if (status != null) {
            request.getSession().setAttribute("filtroStatus", status);
        }
        if (prazo != null) {
            request.getSession().setAttribute("filtroPrazo", prazo);
        }

        // e aplica os filtros
        List<Tarefa> tarefas = (List<Tarefa>) tarefaRepository.findAll();
        String filtroPalavraChave = (String) request.getSession().getAttribute("filtroPalavraChave");
        Boolean filtroStatus = (Boolean) request.getSession().getAttribute("filtroStatus");
        LocalDate filtroPrazo = (LocalDate) request.getSession().getAttribute("filtroPrazo");

        if (filtroPalavraChave != null) {
            tarefas = tarefas.stream()
                    .filter(t -> t.getTitulo().contains(filtroPalavraChave) ||
                            (t.getDescricao() != null && t.getDescricao().contains(filtroPalavraChave)))
                    .toList();
        }
        if (filtroStatus != null) {
            tarefas = tarefas.stream().filter(t -> t.getConcluida() == filtroStatus).toList();
        }
        if (filtroPrazo != null) {
            tarefas = tarefas.stream()
                    .filter(t -> t.getPrazoConclusao().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate().isEqual(filtroPrazo))
                    .toList();
        }

        model.addAttribute("tarefas", tarefas);
        return "index";
    }

    @GetMapping("/limpar-filtros")
    public String limparFiltros(HttpServletRequest request) {
        request.getSession().removeAttribute("filtroPalavraChave");
        request.getSession().removeAttribute("filtroStatus");
        request.getSession().removeAttribute("filtroPrazo");
        return "redirect:/index";
    }

}
