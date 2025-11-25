package br.com.vetmais.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String usuario; // O Front envia o e-mail neste campo "usuario"
    private String senha;
}