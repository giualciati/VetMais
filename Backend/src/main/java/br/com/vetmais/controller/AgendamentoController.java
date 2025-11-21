package br.com.vetmais.controller;

import br.com.vetmais.dto.AgendamentoRequestDTO;
import br.com.vetmais.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping("/novo")
    public ResponseEntity<?> criar(@RequestBody AgendamentoRequestDTO dados) {
        try {
            agendamentoService.criarAgendamento(dados);
            return ResponseEntity.ok("Agendamento realizado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}