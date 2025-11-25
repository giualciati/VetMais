package br.com.vetmais.controller;

import br.com.vetmais.dto.LoginDTO;
import br.com.vetmais.dto.RegisterDTO;
import br.com.vetmais.infra.security.TokenService;
import br.com.vetmais.model.Pessoa;
import br.com.vetmais.model.Tutor;
import br.com.vetmais.repository.TutorRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager; // Injetado da SecurityConfigurations

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TutorRepository tutorRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getUsuario(), data.getSenha());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Tutor) auth.getPrincipal());

        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if (this.tutorRepository.findByEmail(data.getEmail()) != null) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        }

        // 1. Criptografa a senha
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.getSenha());

        // 2. Prepara a Pessoa (obrigatória)
        Pessoa novaPessoa = new Pessoa();
        novaPessoa.setNm_pessoa(data.getNome());
        // Configure outros campos de Pessoa se necessário...

        // 3. Prepara o Tutor
        Tutor novoTutor = new Tutor();
        novoTutor.setEmail(data.getEmail());
        novoTutor.setSenha(encryptedPassword);
        novoTutor.setPessoa(novaPessoa); // Vincula a pessoa

        // 4. Salva (O CascadeType.ALL em Tutor salvará a Pessoa automaticamente)
        this.tutorRepository.save(novoTutor);

        return ResponseEntity.ok().build();
    }
}