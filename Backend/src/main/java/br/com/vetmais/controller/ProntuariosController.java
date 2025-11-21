package br.com.vetmais.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


import br.com.vetmais.model.Prontuario;
import br.com.vetmais.service.ProntuarioService;

@RestController
@RequestMapping("/prontuarios")
public class ProntuariosController {
    @Autowired

    private ProntuarioService prontuarioService;

    @GetMapping
    public List<Prontuario> findAll(){
        return prontuarioService.getAllProntuarios();
    }

    @PostMapping
    public Prontuario createProntuario(@RequestBody Prontuario prontuario){
        return prontuarioService.createProntuario(prontuario);
    }

     @PutMapping("/{id}")
    public Prontuario update(@PathVariable Long id, @RequestBody Prontuario prontuario) {
        return prontuarioService.updateProntuario(id, prontuario);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        prontuarioService.deleteProntuario(id);
    }    
}
