package br.com.vetmais.model;

import java.util.Date;
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

@Table(name = "tb_agenda")
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Agenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date data_hora;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_status_agenda", nullable = false)
    private StatusAgenda statusAgenda;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_veterinario", nullable = false)
    private Veterinario veterinario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_hospvet", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_servico", nullable = false)
    private Servico servico;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_agendamento", nullable = false)
    private Agenda agenda;
}
