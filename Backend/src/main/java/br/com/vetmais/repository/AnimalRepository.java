package br.com.vetmais.repository;

import br.com.vetmais.model.Animal;
import br.com.vetmais.dto.AnimalDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("SELECT new br.com.vetmais.dto.AnimalDTO(" +
           " a.id_animal, " +
           " a.nm_animal, " +
           " a.especie_animal, " +
           " a.raca_animal, " +
           " a.sexo_animal) " +
           "FROM Animal a " +
           "WHERE a.tutor.id_tutor = :idTutor")
    List<AnimalDTO> buscarPorTutor(@Param("idTutor") Long idTutor);
}