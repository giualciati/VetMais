package br.com.vetmais.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor; 

@Data 
@AllArgsConstructor
@NoArgsConstructor 
public class AgendaCompletaDTO {

    private Long id;
    private String tutor; 
    private String especialidade; 
    private LocalDateTime dataHora;
    private String status;
}