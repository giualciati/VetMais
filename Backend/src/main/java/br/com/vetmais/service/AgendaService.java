package br.com.vetmais.service;

import br.com.vetmais.dto.AgendaCriarDTO;
import br.com.vetmais.dto.AgendaDisponivelDTO;

import br.com.vetmais.dto.AgendaLoteDTO;
import br.com.vetmais.model.Agenda;

import br.com.vetmais.model.Hospital;
import br.com.vetmais.model.Servico;

import br.com.vetmais.model.StatusAgenda;
import br.com.vetmais.model.Veterinario;

import br.com.vetmais.repository.AgendaRepository;
import br.com.vetmais.repository.HospitalRepository;

import br.com.vetmais.repository.VeterinarioRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;

import java.util.List;
import java.util.Optional;

@Service
public class AgendaService {
        @Transactional
        public Agenda atualizarHorario(Long id, AgendaCriarDTO dto) {
        Agenda agenda = agendaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agenda não encontrada"));
        Veterinario veterinario = veterinarioRepository.findById(dto.getIdVeterinario())
            .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));
        Hospital hospital = hospitalRepository.findById(dto.getIdHospital())
            .orElseThrow(() -> new RuntimeException("Hospital não encontrado"));
        Servico servico = servicoService.buscarPorId(dto.getIdServico())
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        agenda.setData_hora(dto.getDataHora());
        agenda.setVeterinario(veterinario);
        agenda.setHospital(hospital);
        agenda.setServico(servico);
        return agendaRepository.save(agenda);
        }
    @Autowired
    private AgendaRepository agendaRepository;
    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private ServicoService servicoService;
    @Autowired
    private StatusAgendaService statusAgendaService;

    public List<AgendaDisponivelDTO> buscarAgendasDisponiveis(String especialidade) {
        return agendaRepository.buscarAgendasDisponiveis(especialidade);

    }

    public List<Agenda> buscarTodasAgendas() {
        return agendaRepository.findAll();

    }

    public List<Agenda> buscarPorVeterinario(Long idVeterinario) {
        return agendaRepository.findAll().stream()
                .filter(a -> a.getVeterinario().getId_veterinario().equals(idVeterinario))
                .toList();
    }
        public Optional<Agenda> buscarAgendaPorId(Long id) {
        return agendaRepository.findById(id);
        }

        @Transactional
        public Agenda criarHorarioDisponivel(AgendaCriarDTO dto) {
        Veterinario veterinario = veterinarioRepository.findById(dto.getIdVeterinario())
            .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));
        Hospital hospital = hospitalRepository.findById(dto.getIdHospital())
            .orElseThrow(() -> new RuntimeException("Hospital não encontrado"));
        Servico servico = servicoService.buscarPorId(dto.getIdServico())
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        StatusAgenda statusDisponivel = statusAgendaService.buscarOuCriarDisponivel();
        Agenda agenda = new Agenda();
        agenda.setData_hora(dto.getDataHora());
        agenda.setVeterinario(veterinario);
        agenda.setHospital(hospital);
        agenda.setServico(servico);
        agenda.setStatusAgenda(statusDisponivel);
        return agendaRepository.save(agenda);
        }

        @Transactional
        public List<Agenda> criarHorariosEmLote(AgendaLoteDTO dto) {
        Veterinario veterinario = veterinarioRepository.findById(dto.getIdVeterinario())
            .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));
        Hospital hospital = hospitalRepository.findById(dto.getIdHospital())
            .orElseThrow(() -> new RuntimeException("Hospital não encontrado"));
        Servico servico = servicoService.buscarPorId(dto.getIdServico())
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        StatusAgenda statusDisponivel = statusAgendaService.buscarOuCriarDisponivel();
        List<Agenda> agendas = new ArrayList<>();
        for (Date dataHora : dto.getHorariosDisponiveis()) {
            Agenda agenda = new Agenda();
            agenda.setData_hora(dataHora);
            agenda.setVeterinario(veterinario);
            agenda.setHospital(hospital);
            agenda.setServico(servico);
            agenda.setStatusAgenda(statusDisponivel);
            agendas.add(agenda);
        }
        return agendaRepository.saveAll(agendas);
        }

        @Transactional
        public Agenda atualizarStatus(Long id, Long idNovoStatus) {
        Agenda agenda = agendaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agenda não encontrada"));
        StatusAgenda novoStatus = statusAgendaService.buscarPorId(idNovoStatus)
            .orElseThrow(() -> new RuntimeException("Status não encontrado"));
        agenda.setStatusAgenda(novoStatus);
        return agendaRepository.save(agenda);
        }

        @Transactional
        public void removerHorario(Long id) {
        Agenda agenda = agendaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Agenda não encontrada"));
        agendaRepository.delete(agenda);
        }
}
