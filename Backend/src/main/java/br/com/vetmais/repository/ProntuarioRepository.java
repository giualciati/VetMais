//package br.com.vetmais.repository;

//public class ProntuarioRepository {}    

package br.com.vetmais.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.vetmais.dto.ProntuarioResumoDTO;
import br.com.vetmais.model.Prontuario;

public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {
    @Query("SELECT new br.com.vetmais.dto.ProntuarioResumoDTO(" +
           " p.id_prontuario, " +
           " a.nm_animal, " +
           " a.especie_animal, " +
           " a.sexo_animal) " +
           "FROM Prontuario p " +
           "JOIN p.animal a " +
           "JOIN a.tutor t " +
           "WHERE t.id_tutor = :idTutor")
    List<ProntuarioResumoDTO> buscarPorTutor(@Param("idTutor") Long idTutor);
}
