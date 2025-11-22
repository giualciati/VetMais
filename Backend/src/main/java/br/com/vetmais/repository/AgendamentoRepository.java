package br.com.vetmais.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.vetmais.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    
} 
