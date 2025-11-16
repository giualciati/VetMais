package br.com.vetmais.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "tb_servico")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_servico;

    @Column(length = 100)
    private String nm_servico;

    @Column(length = 100)
    private String ds_servico;
    
}
