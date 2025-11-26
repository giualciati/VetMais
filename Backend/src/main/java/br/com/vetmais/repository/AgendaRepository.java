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
            " a.dataHora, " +
            " h.cidade_hospital) " + 
            "FROM Agenda a " +
            "JOIN a.veterinario v " +
            "JOIN a.servico s " +
            "JOIN a.statusAgenda sa " +
            "JOIN a.hospital h " +
            "WHERE sa.nm_status = 'DISPONIVEL' " +
            "AND a.dataHora >= CURRENT_TIMESTAMP " +
            "AND (:termo IS NULL OR s.nm_servico = :termo OR v.especialidade_vet = :termo)")
    List<AgendaDisponivelDTO> buscarAgendasDisponiveis(@Param("termo") String termo);

    @Query("SELECT new br.com.vetmais.dto.AgendaDisponivelDTO(" +
       "  a.id, " +
       "  v.pessoa.nm_pessoa, " +
       "  s.nm_servico, " +
       "  a.dataHora, " +
       "  h.cidade_hospital) " + 
       "FROM Agenda a " +
       "JOIN a.veterinario v " +
       "JOIN a.servico s " +
       "JOIN a.statusAgenda sa " +
       "JOIN a.hospital h " +
       "WHERE a.dataHora >= CURRENT_TIMESTAMP " +
       "AND sa.id_status_agenda = 1 " +
 
       "AND (:especialidade IS NULL OR s.nm_servico LIKE %:especialidade%) " +
       "AND (:cidade IS NULL OR h.cidade_hospital LIKE %:cidade%)")
List<AgendaDisponivelDTO> buscarAgendasDisponiveis(
    @Param("especialidade") String especialidade,
    @Param("cidade") String cidade); // <--- NOVO PARÂMETRO

    @Query("SELECT a FROM Agenda a JOIN a.agendamento ag WHERE ag.id_agendamento = :idAgendamento")
    Agenda buscarPorIdAgendamento(@Param("idAgendamento") Long idAgendamento);
}