package br.com.vetmais.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProntuarioResumoDTO {
    private Long idProntuario;
    private String nomeAnimal;
    private String especie;
    private String sexo;
}