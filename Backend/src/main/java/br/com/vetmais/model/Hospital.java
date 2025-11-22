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

@Entity
@Table(name = "tb_hospvet")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_hospvet;

    @Column(length = 100)
    private String nm_hospital;

    @Column(length = 50)
    private String cidade_hospital;

    @Column(length = 100)
    private String end_hospital;

    @Column(length = 20)
    private String tel_hospital;

    @Column(length = 20)
    private String email_hospital;




}
