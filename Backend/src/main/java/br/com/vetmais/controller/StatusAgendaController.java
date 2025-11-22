package br.com.vetmais.controller;

import br.com.vetmais.model.StatusAgenda;
import br.com.vetmais.service.StatusAgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/status-agenda")
public class StatusAgendaController {
    
    @Autowired
    private StatusAgendaService statusAgendaService;

    @GetMapping
    public ResponseEntity<List<StatusAgenda>> listarTodos() {
        List<StatusAgenda> statusList = statusAgendaService.buscarTodos();
        return ResponseEntity.ok(statusList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusAgenda> buscarPorId(@PathVariable Long id) {
        return statusAgendaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StatusAgenda> criar(@RequestBody StatusAgenda status) {
        StatusAgenda novoStatus = statusAgendaService.criar(status);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoStatus);
    }
}
