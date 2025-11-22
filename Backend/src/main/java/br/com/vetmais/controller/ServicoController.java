package br.com.vetmais.controller;

import br.com.vetmais.dto.ServicoDTO;
import br.com.vetmais.model.Servico;
import br.com.vetmais.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicos")
public class ServicoController {
    
    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public ResponseEntity<List<Servico>> listarTodos() {
        List<Servico> servicos = servicoService.buscarTodos();
        return ResponseEntity.ok(servicos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(@PathVariable Long id) {
        return servicoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Servico> criar(@RequestBody ServicoDTO servicoDTO) {
        Servico servico = new Servico();
        servico.setNm_servico(servicoDTO.getNm_servico());
        servico.setDs_servico(servicoDTO.getDs_servico());
        
        Servico novoServico = servicoService.criar(servico);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoServico);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizar(@PathVariable Long id, @RequestBody ServicoDTO servicoDTO) {
        try {
            Servico servicoDetalhes = new Servico();
            servicoDetalhes.setNm_servico(servicoDTO.getNm_servico());
            servicoDetalhes.setDs_servico(servicoDTO.getDs_servico());
            
            Servico servicoAtualizado = servicoService.atualizar(id, servicoDetalhes);
            return ResponseEntity.ok(servicoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            servicoService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
