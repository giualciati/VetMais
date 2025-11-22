package br.com.vetmais.model;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_agendamento")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_agendamento;

    // Referência direta à agenda para eliminar necessidade de query custom
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_agenda", nullable = false)
    private Agenda agenda;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tutor", nullable = false)
    private Tutor tutor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_animal", nullable = false)
    private Animal animal;

    // Agendamento -> Muitos para Um -> Situacao_agendamento
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_situacao", nullable = false)
    private Situacao_agendamento situacao_agendamento;

    // Opcional: timestamp de criação do agendamento
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date criado_em = new java.util.Date();
}

