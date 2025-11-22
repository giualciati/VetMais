package br.com.vetmais.service;

import br.com.vetmais.model.MeusPets;
import br.com.vetmais.repository.MeusPetsRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeusPetsService {

    private final MeusPetsRepositorio repository;

    public MeusPetsService(MeusPetsRepositorio repository) {
        this.repository = repository;
    }

    public List<MeusPets> listarTodos() {
        return repository.findAll();
    }

    public MeusPets salvar(MeusPets pet) {
        return repository.save(pet);
    }

    public MeusPets buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public MeusPets atualizar(Long id, MeusPets dados) {
        MeusPets pet = buscarPorId(id);
        if (pet == null) return null;

        pet.setNome(dados.getNome());
        pet.setDataNascimento(dados.getDataNascimento());
        pet.setRga(dados.getRga());
        pet.setRaca(dados.getRaca());
        pet.setEspecie(dados.getEspecie());
        pet.setGenero(dados.getGenero());

        return repository.save(pet);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
