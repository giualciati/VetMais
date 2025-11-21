package br.com.vetmais.service;

import br.com.vetmais.dto.AgendamentoRequestDTO;
import br.com.vetmais.model.*;
import br.com.vetmais.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgendamentoService {

    @Autowired private AgendamentoRepository agendamentoRepository;
    @Autowired private AgendaRepository agendaRepository;
    @Autowired private AnimalRepository animalRepository;
    @Autowired private TutorRepository tutorRepository;
    @Autowired private SituacaoAgendamentoRepository situacaoRepository; 

    @Transactional // Garante que ou salva tudo ou não salva nada
    public Agendamento criarAgendamento(AgendamentoRequestDTO dados) {
        
        Agenda agenda = agendaRepository.findById(dados.getIdAgenda())
                .orElseThrow(() -> new RuntimeException("Horário não encontrado!"));
        
        Animal animal = animalRepository.findById(dados.getIdAnimal())
                .orElseThrow(() -> new RuntimeException("Animal não encontrado!"));

        Tutor tutor = tutorRepository.findById(dados.getIdTutor())
                .orElseThrow(() -> new RuntimeException("Tutor não encontrado!"));


        if (!"DISPONIVEL".equalsIgnoreCase(agenda.getStatusAgenda().getNm_status())) {
            throw new RuntimeException("Este horário já foi reservado por outra pessoa!");
        }

        // Definir a situação do agendagamento 
        Long idSituacaoInicial = 1L; 
        
        Situacao_agendamento situacao = situacaoRepository.findById(idSituacaoInicial)
                .orElseThrow(() -> new RuntimeException("Situação 'Agendado' não encontrada no banco (ID 1)"));

        Agendamento novoAgendamento = new Agendamento();
        novoAgendamento.setAnimal(animal);
        novoAgendamento.setTutor(tutor);
        novoAgendamento.setSituacao_agendamento(situacao);
        
        agendamentoRepository.save(novoAgendamento);

        //  Atualizando o status da agenda
        StatusAgenda statusOcupado = new StatusAgenda(); 
        statusOcupado.setId_status_agenda(2L); 
        agenda.setStatusAgenda(statusOcupado);
        
        // Vincula o agendamento criado à agenda 
        agendaRepository.save(agenda);

        return novoAgendamento;
    }
}