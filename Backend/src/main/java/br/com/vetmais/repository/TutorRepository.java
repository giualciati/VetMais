package br.com.vetmais.repository;

import java.util.Optional; //Verifica se o Tutor existe pelo email

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vetmais.model.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, Long> {
    Optional<Tutor> findByEmail(String email);
}
