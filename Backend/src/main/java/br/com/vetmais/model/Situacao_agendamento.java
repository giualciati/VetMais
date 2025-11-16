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

@Table(name = "tb_situacao_agendamento")
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Situacao_agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_situacao;

    @Column(length = 100)
    private String nm_situacao;
}
