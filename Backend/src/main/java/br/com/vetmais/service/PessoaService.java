package br.com.vetmais.service;

import br.com.vetmais.model.Pessoa;
import br.com.vetmais.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;

    public List<Pessoa> getAllPessoas(){
        return pessoaRepository.findAll();
    }

    public Pessoa createPessoa(Pessoa pessoa){
        return pessoaRepository.save(pessoa);
    }

    public java.util.Optional<Pessoa> getPessoaById(Long id) {
        return pessoaRepository.findById(id);
    }
}
