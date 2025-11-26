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
    private SituacaoAgendamentoRepository situacaoRepository;

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
        novoAgendamento.setAgenda(agenda);

        agendamentoRepository.save(novoAgendamento);

        //  Atualizando o status da agenda
        StatusAgenda statusOcupado = new StatusAgenda();
        statusOcupado.setId_status_agenda(2L);
        agenda.setStatusAgenda(statusOcupado);

        // Vincula o agendamento criado à agenda 
        agendaRepository.save(agenda);

        return novoAgendamento;
    }

    // Novo método para listar todos os agendamentos com detalhes completos
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

        Situacao_agendamento situacao = situacaoRepository.findAll().stream()
                .filter(s -> s.getNm_situacao().equalsIgnoreCase(novoStatus))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Situação '" + novoStatus + "' não encontrada"));

        agendamento.setSituacao_agendamento(situacao);
        agendamentoRepository.save(agendamento);
    }

    public AgendamentoDetalhesDTO buscarDetalhes(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

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
        dto.setRga(agendamento.getAnimal().getRGA_animal());
        dto.setDescricaoAnimal(agendamento.getAnimal().getDesc_animal());
        dto.setNomeTutor(agendamento.getTutor().getPessoa().getNm_pessoa());

        Agenda agenda = agendaRepository.buscarPorIdAgendamento(id);

        if (agenda != null) {
            dto.setNomeVeterinario(agenda.getVeterinario().getPessoa().getNm_pessoa());
            dto.setNomeHospital(agenda.getHospital().getNm_hospital());
            dto.setEspecialidade(agenda.getServico().getNm_servico());
            dto.setDataHora(agenda.getDataHora());
        }

        return dto;
    }

    // Método auxiliar para converter Agendamento para DTO
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
        dto.setRga(agendamento.getAnimal().getRGA_animal());
        dto.setDescricaoAnimal(agendamento.getAnimal().getDesc_animal());
        dto.setNomeTutor(agendamento.getTutor().getPessoa().getNm_pessoa());

        // Agenda
        if (agendamento.getAgenda() != null) {
            dto.setNomeVeterinario(agendamento.getAgenda().getVeterinario().getPessoa().getNm_pessoa());
            dto.setNomeHospital(agendamento.getAgenda().getHospital().getNm_hospital());
            dto.setEspecialidade(agendamento.getAgenda().getServico().getNm_servico());
            dto.setDataHora(agendamento.getAgenda().getDataHora());
        }

        return dto;
    }

    @Transactional
    public void cancelarAgendamento(Long idAgendamento) {
        Agendamento agendamento = agendamentoRepository.findById(idAgendamento)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        Situacao_agendamento cancelado = situacaoRepository.findById(3L)
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
