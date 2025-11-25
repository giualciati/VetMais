package br.com.vetmais.controller;

import br.com.vetmais.dto.LoginDTO;
import br.com.vetmais.infra.security.TokenService;
import br.com.vetmais.model.Tutor;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getUsuario(), data.getSenha());
        var auth = authenticationManager.authenticate(usernamePassword);

        // Gera token para o TUTOR
        var token = tokenService.generateToken((Tutor) auth.getPrincipal());

        return ResponseEntity.ok(token);
    }
    
}