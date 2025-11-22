package br.com.vetmais.dto;

import lombok.Data;
import java.util.Date;

@Data
public class ProntuarioDetalhesDTO {
    // Cabeçalho (Dados do Protocolo)
    private Long protocolo; // id_prontuario
    
    // Dados do Animal
    private String nomeAnimal;
    private String sexo;
    private Date dataNascimento;
    private String especie;
    private String raca;
    private String rga; // RA na imagem
    private String descricaoAnimal;

    // Dados do Tutor
    private String nomeTutor;

    // Dados da Consulta
    private String nomeVeterinario;
    private Date dataAtendimento; 
    private String nomeHospital;

    // Dados Médicos
    private String sintomas;
    private String diagnostico;
    private String tratamento;
    private String observacoes;
}