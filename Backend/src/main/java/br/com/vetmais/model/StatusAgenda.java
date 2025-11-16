package br.com.vetmais.model;

import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "tb_status_agenda")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class StatusAgenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_status_agenda;

    @Column(length = 50)
    private String nm_status;

    
}
