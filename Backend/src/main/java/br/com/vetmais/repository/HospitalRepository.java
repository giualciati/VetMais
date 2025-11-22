package br.com.vetmais.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.vetmais.model.Hospital;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

}
