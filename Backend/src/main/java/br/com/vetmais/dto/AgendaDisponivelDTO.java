package br.com.vetmais.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor // Cria construtor com TODOS os campos abaixo
@NoArgsConstructor
public class AgendaDisponivelDTO {
    private Long idAgenda;
    private String nomeVeterinario;
    private String nomeServico;
    private Date dataHora;
    private String cidade; 
}