package br.com.vetmais.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vetmais.model.StatusAgenda;

public interface StatusAgendaRepository extends JpaRepository<StatusAgenda, Long> {
    
}
