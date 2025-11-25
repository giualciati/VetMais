package br.com.vetmais.controller;

import br.com.vetmais.model.MeusPets;
import br.com.vetmais.service.MeusPetsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
//@CrossOrigin(origins = "*")
public class MeusPetsController {

    private final MeusPetsService service;

    public MeusPetsController(MeusPetsService service) {
        this.service = service;
    }

    @GetMapping
    public List<MeusPets> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public MeusPets buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public MeusPets criar(@RequestBody MeusPets pet) {
        return service.salvar(pet);
    }

    @PutMapping("/{id}")
    public MeusPets editar(@PathVariable Long id, @RequestBody MeusPets pet) {
        return service.atualizar(id, pet);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
