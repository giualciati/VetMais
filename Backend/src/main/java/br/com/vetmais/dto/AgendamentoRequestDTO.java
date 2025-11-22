package br.com.vetmais.dto;

import lombok.Data;

@Data
public class AgendamentoRequestDTO {
    private Long idAgenda; 
    private Long idAnimal;  
    private Long idTutor;  
}