package com.example.AT1_JordaoAsato;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class calculadoraController {

    @GetMapping("/calculadora")
    public String calculadora(@RequestParam(name="n1HTTP", required=false, defaultValue="0") double n1model,
                              @RequestParam(name="n2HTTP", required=false, defaultValue="0") double n2model,
                              @RequestParam(name="opHTTP", required=false, defaultValue="+") String opmodel,
                              Model model) {
        double resultado = 0;
        switch (opmodel) {
            case "+":
                resultado = n1model + n2model;
                break;
            case "-":
                resultado = n1model - n2model;
                break;
            case "*":
                resultado = n1model * n2model;
                break;
            case "/":
                if (n2model != 0) {
                    resultado = (double) n1model / n2model;
                } else {
                    model.addAttribute("error", "Erro: Divisão por zero!");
                }
                break;
            default:
                model.addAttribute("error", "Operação inválida!");
        }

        model.addAttribute("resultado", resultado);
        model.addAttribute("n1HTML", n1model);
        model.addAttribute("n2HTML", n2model);
        model.addAttribute("opHTML", opmodel);

        return "calculadora";
    }

}