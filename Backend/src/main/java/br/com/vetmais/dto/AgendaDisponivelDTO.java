package br.com.vetmais.dto;

import java.time.LocalDateTime; // Use LocalDateTime, é muito melhor que Date
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AgendaDisponivelDTO {

    //  CAMPOS PARA RECEBER DADOS DO FRONT
    private Long idVeterinario;
    private Long idServico;
    private Integer quantidade; 

    //CAMPOS PARA MOSTRAR DADOS AO TUTOR 
    private Long idAgenda;
    private String nomeVeterinario;
    private String nomeServico;
    private String cidade; 
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm") 
    private LocalDateTime dataHora;

    //  CONSTRUTOR ESPECÍFICO PARA O REPOSITORY 
    public AgendaDisponivelDTO(Long idAgenda, String nomeVeterinario, String nomeServico, LocalDateTime dataHora, String cidade) {
        this.idAgenda = idAgenda;
        this.nomeVeterinario = nomeVeterinario;
        this.nomeServico = nomeServico;
        this.dataHora = dataHora;
        this.cidade = cidade;
    }
}