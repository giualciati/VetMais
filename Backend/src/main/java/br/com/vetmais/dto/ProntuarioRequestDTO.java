package br.com.vetmais.dto;

import java.util.Date;

import lombok.Data;




@Data
public class ProntuarioRequestDTO {

    private Date dtAtendimento;
    private String dsSintomas;
    private String dsDiagnostico;
    private String dsTratamento;
    private String dsObservacoes;

    private Long veterinarioId;
    private Long hospitalId;
    private Long animalId;
}
