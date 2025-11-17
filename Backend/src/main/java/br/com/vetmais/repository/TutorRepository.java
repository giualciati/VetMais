package br.com.vetmais.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.vetmais.model.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, Long> {

}
