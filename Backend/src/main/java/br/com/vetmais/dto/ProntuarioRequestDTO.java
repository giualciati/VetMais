package br.com.vetmais.dto;

import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;




@Data
public class ProntuarioRequestDTO {

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime dtAtendimento;
    private String dsSintomas;
    private String dsDiagnostico;
    private String dsTratamento;
    private String dsObservacoes;

    private Long veterinarioId;
    private Long hospitalId;
    private Long animalId;
}
