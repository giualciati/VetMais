package br.com.vetmais.repository;

import br.com.vetmais.model.Agenda;
import br.com.vetmais.dto.AgendaDisponivelDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    @Query("SELECT new br.com.vetmais.dto.AgendaDisponivelDTO(" +
            " a.id, " +
            " v.pessoa.nm_pessoa, " +
            " s.nm_servico, " +
            " a.data_hora, " +
            " h.cidade_hospital) " + 
            "FROM Agenda a " +
            "JOIN a.veterinario v " +
            "JOIN a.servico s " +
            "JOIN a.statusAgenda sa " +
            "JOIN a.hospital h " +
            "WHERE sa.nm_status = 'DISPONIVEL' " +
            "AND a.data_hora >= CURRENT_TIMESTAMP " +
            "AND (:termo IS NULL OR s.nm_servico = :termo OR v.especialidade_vet = :termo)")
    List<AgendaDisponivelDTO> buscarAgendasDisponiveis(@Param("termo") String termo);
}