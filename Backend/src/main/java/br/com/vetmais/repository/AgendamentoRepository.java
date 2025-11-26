package br.com.vetmais.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.vetmais.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    @Query("SELECT a FROM Agendamento a " +
           // Carrega dados do Animal e Tutor
           "JOIN FETCH a.animal an " +
           "JOIN FETCH a.tutor t " +
           "JOIN FETCH t.pessoa tp " +
           // Carrega dados do Slot de Agenda
           "JOIN FETCH a.agenda ag " +
           // Carrega os dados da Consulta
           "JOIN FETCH ag.veterinario v " +
           "JOIN FETCH ag.hospital h " +
           "JOIN FETCH ag.servico s " +
           "JOIN FETCH v.pessoa vp " +
           "WHERE a.id_agendamento = :id")
    Optional<Agendamento> findByIdWithDetails(@Param("id") Long id);
} 
