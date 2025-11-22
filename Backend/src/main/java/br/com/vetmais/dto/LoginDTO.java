package br.com.vetmais.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String usuario; // No front está "usuario", mas usamos o email
    private String senha;
}