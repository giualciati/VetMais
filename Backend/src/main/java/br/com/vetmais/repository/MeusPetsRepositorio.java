package br.com.vetmais.repository;

import br.com.vetmais.model.MeusPets;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeusPetsRepositorio extends JpaRepository<MeusPets, Long> {
}
