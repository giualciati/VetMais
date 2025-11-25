package br.com.vetmais.dto;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDTO {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6)
    private String senha;

    @NotBlank
    private String nome; // Para salvar na tabela Pessoa
    
    private Date dt_nasc_pessoa;

    @Column(length = 14)
    private String rg_pessoa;

    @Column(length = 14)
    private String cpf_pessoa;

    private String tel_pessoa;
    
}