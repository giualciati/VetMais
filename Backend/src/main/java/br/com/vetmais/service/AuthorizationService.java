package br.com.vetmais.service;

import br.com.vetmais.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    TutorRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // O Spring passa o email digitado no login para a variável 'username'
        return repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Tutor não encontrado com este e-mail"));
    }
}