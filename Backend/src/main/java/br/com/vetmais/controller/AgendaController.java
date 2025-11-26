package br.com.vetmais.controller;

import br.com.vetmais.dto.AgendaCompletaDTO;
import br.com.vetmais.dto.AgendaDisponivelDTO;
import br.com.vetmais.model.Agenda;
import br.com.vetmais.model.Servico;
import br.com.vetmais.model.StatusAgenda;
import br.com.vetmais.model.Veterinario;
import br.com.vetmais.repository.AgendaRepository;
import br.com.vetmais.repository.ServicoRepository;
import br.com.vetmais.repository.StatusAgendaRepository;
import br.com.vetmais.repository.VeterinarioRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/agendas") 
public class AgendaController {

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private StatusAgendaRepository statusAgendaRepository;

   @GetMapping("/todos") 
    public List<AgendaCompletaDTO> listarTodosDTO() {
        return agendaRepository.buscarTodosMapeadosParaDTO(); 
    }

    @GetMapping("/disponiveis")
    public List<AgendaDisponivelDTO> listarDisponiveis(
         @RequestParam(value = "especialidade", required = false) String especialidade,
    @RequestParam(value = "cidade", required = false) String cidade) {
    
    if (especialidade != null && especialidade.isEmpty()) { especialidade = null; }
    if (cidade != null && cidade.isEmpty()) { cidade = null; }

    return agendaRepository.buscarAgendasDisponiveis(especialidade, cidade);
    }

    @PostMapping("/salvar")
    @Transactional
    public void salvarAgenda(@RequestBody AgendaDisponivelDTO agendaDTO) {
    

    Veterinario vet = veterinarioRepository.findById(agendaDTO.getIdVeterinario())
            .orElseThrow(() -> new RuntimeException("Erro: Veterinário não encontrado (ID " + agendaDTO.getIdVeterinario() + ")"));

    if (vet.getHospital() == null) {
        throw new RuntimeException("Erro Crítico: O Veterinário não está vinculado a nenhum hospital no banco de dados.");
    }

    // Validando Serviço
    Servico servico = servicoRepository.findById(agendaDTO.getIdServico())
            .orElseThrow(() -> new RuntimeException("Erro: Serviço não encontrado (ID " + agendaDTO.getIdServico() + ")"));
    
    // Buscando o Status 'Disponível' (ID 1)
    StatusAgenda statusLivre = statusAgendaRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("Erro: Status de agenda (ID 1) não encontrado no banco."));

    // Quantidade de vagas a gerar
    int qtd = (agendaDTO.getQuantidade() != null && agendaDTO.getQuantidade() > 0) ? agendaDTO.getQuantidade() : 1;

    for (int i = 0; i < qtd; i++) {
        Agenda novaAgenda = new Agenda();
        
        novaAgenda.setVeterinario(vet);
        novaAgenda.setHospital(vet.getHospital()); 
        novaAgenda.setServico(servico);
        novaAgenda.setStatusAgenda(statusLivre); 

        // Calcula horário
        LocalDateTime horario = agendaDTO.getDataHora().plusMinutes(30 * i);
        novaAgenda.setDataHora(horario);
        
        agendaRepository.save(novaAgenda);
    }
}
}