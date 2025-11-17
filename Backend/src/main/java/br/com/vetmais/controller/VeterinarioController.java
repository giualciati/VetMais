package br.com.vetmais.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vetmais.model.Veterinario;
import br.com.vetmais.service.VeterinarioService;

@RestController
@RequestMapping("/veterinarios")
public class VeterinarioController {
    
    @Autowired
    private VeterinarioService veterinarioService;

    @GetMapping
    public List<Veterinario> findAll(){
        return veterinarioService.getAllVeterinarios();
    }

    @PostMapping
    public Veterinario create(@RequestBody Veterinario veterinario){
        return veterinarioService.createVeterinario(veterinario);
    }

    @PutMapping("/{id}")
    public Veterinario update(@PathVariable Long id, @RequestBody Veterinario veterinario){
        return veterinarioService.updateVeterinario(id, veterinario);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        veterinarioService.deleteVeterinario(id);
    }

}
