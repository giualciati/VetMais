package br.com.vetmais.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {
    @NotBlank
    private String usuario; // E-mail
    @NotBlank
    private String senha;
}