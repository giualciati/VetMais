package br.com.vetmais.service;

import br.com.vetmais.dto.AgendamentoDetalhesDTO;
import br.com.vetmais.dto.AgendamentoRequestDTO;
import br.com.vetmais.model.*;
import br.com.vetmais.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;
    @Autowired
    private AgendaRepository agendaRepository;
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private SituacaoAgendamentoRepository situacaoAgendamentoRepository;
    @Autowired
    private StatusAgendaRepository statusAgendaRepository;

    @Transactional 
    public void criarAgendamento(AgendamentoRequestDTO dto) {
        
        Agenda agendaSlot = agendaRepository.findById(dto.getIdAgenda())
                .orElseThrow(() -> new RuntimeException("Horário de agenda não encontrado."));

        if (agendaSlot.getStatusAgenda().getId_status_agenda() != 1L) {
            throw new RuntimeException("Este horário já foi reservado por outra pessoa!"); 
        }

        Tutor tutor = tutorRepository.findById(dto.getIdTutor())
                .orElseThrow(() -> new RuntimeException("Tutor não encontrado."));

        Animal pet = animalRepository.findById(dto.getIdAnimal())
                .orElseThrow(() -> new RuntimeException("Pet não encontrado."));

        StatusAgenda statusAgendado = statusAgendaRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Status Agendado (ID 2) não configurado no banco."));
            
        agendaSlot.setStatusAgenda(statusAgendado);
        agendaRepository.save(agendaSlot); 
        
        Agendamento novoAgendamento = new Agendamento();
    
        novoAgendamento.setTutor(tutor);
        novoAgendamento.setAnimal(pet);
        novoAgendamento.setAgenda(agendaSlot); // VÍNCULO ESSENCIAL
        

        Situacao_agendamento situacaoInicial = situacaoAgendamentoRepository.findById(1L).get();
        novoAgendamento.setSituacao_agendamento(situacaoInicial);
        
        agendamentoRepository.save(novoAgendamento);
    }

    
    public List<AgendamentoDetalhesDTO> listarTodosDetalhes() {
        return agendamentoRepository.findAll().stream()
                .map(this::convertToDetalhesDTO)
                .collect(Collectors.toList());
    }

    // Método para alterar status
    @Transactional
public void alterarStatus(Long idAgendamento, String novoStatus) {
    Agendamento agendamento = agendamentoRepository.findById(idAgendamento)
            .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

    Long idSituacao = switch (novoStatus.toUpperCase()) {
        case "AGENDADO" -> 2L; 
        case "ATENDIDO" -> 4L; 
        case "CONCLUÍDO" -> 3L; 
        case "CANCELADO" -> 5L; 
        default -> throw new RuntimeException("Status '" + novoStatus + "' inválido para alteração.");
    };

    Situacao_agendamento situacao = situacaoAgendamentoRepository.findById(idSituacao)
        .orElseThrow(() -> new RuntimeException("Situação não configurada no banco (ID " + idSituacao + ")."));

    agendamento.setSituacao_agendamento(situacao);
    agendamentoRepository.save(agendamento);
}

    public AgendamentoDetalhesDTO buscarDetalhes(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        return convertToDetalhesDTO(agendamento);
    }

    private AgendamentoDetalhesDTO convertToDetalhesDTO(Agendamento agendamento) {
        AgendamentoDetalhesDTO dto = new AgendamentoDetalhesDTO();

        dto.setIdAgendamento(agendamento.getId_agendamento());
        dto.setProtocolo(String.format("%04d", agendamento.getId_agendamento()));
        dto.setStatusAgendamento(agendamento.getSituacao_agendamento().getNm_situacao());

        // Animal e Tutor
        dto.setNomeAnimal(agendamento.getAnimal().getNm_animal());
        dto.setEspecie(agendamento.getAnimal().getEspecie_animal());
        dto.setRaca(agendamento.getAnimal().getRaca_animal());
        dto.setSexo(agendamento.getAnimal().getSexo_animal());
        dto.setDataNascimento(agendamento.getAnimal().getDt_nasc_animal());
        dto.setRga(agendamento.getAnimal().getRga_animal());
        dto.setDescricaoAnimal(agendamento.getAnimal().getDesc_animal());
        dto.setNomeTutor(agendamento.getTutor().getPessoa().getNm_pessoa());

        // Agenda (Consulta)
        Agenda agendaSlot = agendamento.getAgenda();
        if (agendaSlot != null) {
            dto.setNomeVeterinario(agendaSlot.getVeterinario().getPessoa().getNm_pessoa());
            dto.setNomeHospital(agendaSlot.getHospital().getNm_hospital());
            dto.setEspecialidade(agendaSlot.getServico().getNm_servico());
            dto.setDataHora(agendaSlot.getDataHora());
        }

        return dto;
    }

    @Transactional
    public void cancelarAgendamento(Long idAgendamento) {
        Agendamento agendamento = agendamentoRepository.findById(idAgendamento)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        Situacao_agendamento cancelado = situacaoAgendamentoRepository.findById(3L)
                .orElseThrow(() -> new RuntimeException("Status Cancelado não existe"));
        agendamento.setSituacao_agendamento(cancelado);
        agendamentoRepository.save(agendamento);


        Agenda agenda = agendaRepository.buscarPorIdAgendamento(idAgendamento);
        if (agenda != null) {
            StatusAgenda disponivel = new StatusAgenda();
            disponivel.setId_status_agenda(1L);
            agenda.setStatusAgenda(disponivel);
            agendaRepository.save(agenda);
        }
    }
}
