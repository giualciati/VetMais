package br.com.vetmais.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vetmais.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
    
}
