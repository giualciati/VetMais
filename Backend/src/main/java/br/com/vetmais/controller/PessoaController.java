package br.com.vetmais.controller;

import br.com.vetmais.model.Pessoa;
import br.com.vetmais.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {
    @Autowired
    private PessoaService  pessoaService;

    @GetMapping
    public List<Pessoa> findAll(){
        return pessoaService.getAllPessoas();
    }

    @PostMapping
    public Pessoa createPessoa(@RequestBody Pessoa pessoa){
        return pessoaService.createPessoa(pessoa);
    }
}
