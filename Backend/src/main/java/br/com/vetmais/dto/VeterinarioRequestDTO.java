// src/main/java/br/com/vetmais/dto/VeterinarioRequestDTO.java

package br.com.vetmais.dto;

import lombok.Data;
import java.util.Date;

@Data
public class VeterinarioRequestDTO {
    
    private Long id_pessoa; 
    
    private String nome;
    private String telefone;
    private Date dataNascimento; 
    private String email;
    private String rg;
    private String senha;
    private String cpf;

    private String especialidade; 
    private String crm; 
    
    private Long hospitalId; 

}