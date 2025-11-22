package br.com.vetmais.repository;

import br.com.vetmais.model.StatusAgenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusAgendaRepository extends JpaRepository<StatusAgenda, Long> {
}
