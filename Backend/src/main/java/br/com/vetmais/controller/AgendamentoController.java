
package br.com.vetmais.controller;
import br.com.vetmais.dto.AgendamentoStatusUpdateDTO;

import br.com.vetmais.dto.AgendamentoDetalhesDTO;
import br.com.vetmais.dto.AgendamentoRequestDTO;
import br.com.vetmais.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id, @RequestBody AgendamentoStatusUpdateDTO dto) {
        agendamentoService.alterarStatus(id, dto.getStatusAgendamento());
        return ResponseEntity.noContent().build();
    }

    @Autowired
    private AgendamentoService agendamentoService;

    // Novo endpoint para listar todos os agendamentos com detalhes completos
    @GetMapping
    public ResponseEntity<List<AgendamentoDetalhesDTO>> listarTodos() {
        return ResponseEntity.ok(agendamentoService.listarTodosDetalhes());
    }

    @PostMapping("/novo")
    public ResponseEntity<?> criar(@RequestBody AgendamentoRequestDTO dados) {
        try {
            agendamentoService.criarAgendamento(dados);
            return ResponseEntity.ok("Agendamento realizado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoDetalhesDTO> getDetalhes(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.buscarDetalhes(id));
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelar(@PathVariable Long id) {
        agendamentoService.cancelarAgendamento(id);
        return ResponseEntity.noContent().build();
    }
}