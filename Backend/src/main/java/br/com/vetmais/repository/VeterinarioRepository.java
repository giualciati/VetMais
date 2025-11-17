package br.com.vetmais.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.vetmais.model.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {

}
