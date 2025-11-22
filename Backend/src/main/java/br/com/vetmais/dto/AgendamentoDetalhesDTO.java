package br.com.vetmais.dto;

import lombok.Data;
import java.util.Date;

@Data
public class AgendamentoDetalhesDTO {
    // Dados do Agendamento
    private Long idAgendamento;
    private String protocolo;
    private String statusAgendamento; 

    // Dados do Animal
    private String nomeAnimal;
    private String especie;
    private String raca;
    private String sexo;
    private Date dataNascimento;
    private String rga;
    private String descricaoAnimal;

    // Dados do Tutor
    private String nomeTutor;

    // Dados da Consulta
    private String nomeVeterinario;
    private String nomeHospital;
    private String especialidade;
    private Date dataHora;
}