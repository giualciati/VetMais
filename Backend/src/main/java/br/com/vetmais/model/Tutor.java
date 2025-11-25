package br.com.vetmais.model;

// --- Seus Imports Originais (Mantidos) ---
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column; // <--- Adicionei este para configurar as colunas novas
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// --- Imports de Segurança (Mantidos) ---
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Table(name = "tb_tutor")
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Tutor implements UserDetails { // <--- OBRIGATÓRIO: implements UserDetails

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_tutor;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_pessoa", nullable = false)
    private Pessoa pessoa;

    
    // --- NOVOS CAMPOS (Essenciais para o Login funcionar) ---
    @Column(unique = true)
    private String email;
    private String senha;

    // --- Métodos de Segurança (UserDetails) ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() { return this.senha; }

    @Override
    public String getUsername() { return this.email; }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}