package br.com.vetmais.service;

import br.com.vetmais.dto.AgendamentoDetalhesDTO;
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

    // Método para buscar os detalhes completos
    public AgendamentoDetalhesDTO buscarDetalhes(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        AgendamentoDetalhesDTO dto = new AgendamentoDetalhesDTO();
        
        // Mapeando dados (Manual ou use ModelMapper)
        dto.setIdAgendamento(agendamento.getId_agendamento());
        dto.setProtocolo(String.format("%04d", agendamento.getId_agendamento())); // Ex: 0001
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

        // Achar a Agenda vinculada (Precisamos buscar na tb_agenda onde o agendamento está na lista ou fazer query inversa)
        // Supondo que você consiga recuperar a Agenda a partir do Agendamento 
        // (Se não tiver mapeado bidirecional, precisará de uma query no Repository)
        // Vou assumir aqui uma Query simples no Repository: findAgendaByAgendamentoId
        Agenda agenda = agendaRepository.buscarPorIdAgendamento(id); 
        
        if(agenda != null) {
            dto.setNomeVeterinario(agenda.getVeterinario().getPessoa().getNm_pessoa());
            dto.setNomeHospital(agenda.getHospital().getNm_hospital());
            dto.setEspecialidade(agenda.getServico().getNm_servico());
            dto.setDataHora(agenda.getData_hora());
        }

        return dto;
    }

    

    // Método para Cancelar
    @Transactional
    public void cancelarAgendamento(Long idAgendamento) {
        Agendamento agendamento = agendamentoRepository.findById(idAgendamento)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        // 1. Muda situação do Agendamento para CANCELADO (ID 3)
        Situacao_agendamento cancelado = situacaoRepository.findById(3L)
                .orElseThrow(() -> new RuntimeException("Status Cancelado não existe"));
        agendamento.setSituacao_agendamento(cancelado);
        agendamentoRepository.save(agendamento);

        // 2. Libera a Agenda (Volta status para DISPONIVEL - ID 1)
        Agenda agenda = agendaRepository.buscarPorIdAgendamento(idAgendamento);
        if (agenda != null) {
             StatusAgenda disponivel = new StatusAgenda();
             disponivel.setId_status_agenda(1L); // ID 1 = Disponível
             agenda.setStatusAgenda(disponivel);
             agendaRepository.save(agenda);
        }
    }
}