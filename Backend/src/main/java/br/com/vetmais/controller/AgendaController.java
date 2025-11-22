// ...existing code...

// ...existing code...
// ...existing code...
package br.com.vetmais.controller;

import br.com.vetmais.dto.AgendaCriarDTO;
import br.com.vetmais.dto.AgendaDisponivelDTO;
import br.com.vetmais.dto.AgendaLoteDTO;
import br.com.vetmais.model.Agenda;
import br.com.vetmais.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendas") 
public class AgendaController {
    @PutMapping("/{id}")
    public ResponseEntity<Agenda> atualizarHorario(@PathVariable Long id, @RequestBody AgendaCriarDTO dto) {
        try {
            Agenda agenda = agendaService.atualizarHorario(id, dto);
            return ResponseEntity.ok(agenda);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Autowired
    private AgendaService agendaService;

    @GetMapping("/disponiveis")
    public ResponseEntity<List<AgendaDisponivelDTO>> listarDisponiveis(
            @RequestParam(value = "especialidade", required = false) String especialidade) {
        
        if (especialidade != null && especialidade.isEmpty()) {
            especialidade = null;
        }
        List<AgendaDisponivelDTO> agendas = agendaService.buscarAgendasDisponiveis(especialidade);
        return ResponseEntity.ok(agendas);
    }

    @GetMapping
    public ResponseEntity<List<Agenda>> listarTodas() {
        List<Agenda> agendas = agendaService.buscarTodasAgendas();
        return ResponseEntity.ok(agendas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agenda> buscarPorId(@PathVariable Long id) {
        return agendaService.buscarAgendaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/veterinario/{idVeterinario}")
    public ResponseEntity<List<Agenda>> buscarPorVeterinario(@PathVariable Long idVeterinario) {
        List<Agenda> agendas = agendaService.buscarPorVeterinario(idVeterinario);
        return ResponseEntity.ok(agendas);
    }

    @PostMapping
    public ResponseEntity<Agenda> criarHorarioDisponivel(@RequestBody AgendaCriarDTO dto) {
        try {
            Agenda agenda = agendaService.criarHorarioDisponivel(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(agenda);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/lote")
    public ResponseEntity<List<Agenda>> criarHorariosEmLote(@RequestBody AgendaLoteDTO dto) {
        try {
            List<Agenda> agendas = agendaService.criarHorariosEmLote(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(agendas);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Agenda> atualizarStatus(
            @PathVariable Long id, 
            @RequestParam Long idNovoStatus) {
        try {
            Agenda agenda = agendaService.atualizarStatus(id, idNovoStatus);
            return ResponseEntity.ok(agenda);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerHorario(@PathVariable Long id) {
        try {
            agendaService.removerHorario(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            String msg = e.getMessage();
            if (msg != null && (msg.contains("ConstraintViolationException") || msg.contains("foreign key") || msg.contains("violates foreign key"))) {
                return ResponseEntity.status(409).body(new java.util.HashMap<String, String>() {{
                    put("message", "Não é possível deletar o horário pois existem agendamentos vinculados a ele.");
                }});
            }
            return ResponseEntity.status(500).body(new java.util.HashMap<String, String>() {{
                put("message", "Erro ao deletar horário.");
            }});
        }
    }
}