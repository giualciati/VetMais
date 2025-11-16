//package br.com.vetmais.repository;

//public class ProntuarioRepository {}    

package br.com.vetmais.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vetmais.model.Prontuario;

public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {
    
}
