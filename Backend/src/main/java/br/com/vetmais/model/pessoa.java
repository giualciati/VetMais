package br.com.vetmais.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name = "tb_pessoa")
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pessoa;

    @Column(length = 100)
    private String nm_pessoa;

    private Date dt_nasc_pessoa;

    @Column(length = 14)
    private String rg_pessoa;

    @Column(length = 14)
    private String cpf_pessoa;

    private String tel_pessoa;

    @Column(length = 200)
    private String email_pessoa;

    @Column(length = 40)
    private String senha_pessoa;
}
