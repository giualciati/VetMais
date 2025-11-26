package br.com.vetmais.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "tb_animal")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_animal;

    @Column(length = 100)
    private String nm_animal;

    @Column(length = 100)
    private String especie_animal;

    @Column(length = 100)
    private String raca_animal;

    private String desc_animal;

    private Date dt_nasc_animal;

    @Column(length = 20)
    private String RGA_animal;

    @Column(length = 100)
    private String sexo_animal;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tutor", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Tutor tutor;
}
