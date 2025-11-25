package br.com.vetmais.repository;

import br.com.vetmais.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface TutorRepository extends JpaRepository<Tutor, Long> {
    UserDetails findByEmail(String email);
}