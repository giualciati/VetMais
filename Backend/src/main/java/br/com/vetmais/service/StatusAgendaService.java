package br.com.vetmais.service;

import br.com.vetmais.model.StatusAgenda;
import br.com.vetmais.repository.StatusAgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusAgendaService {
    
    @Autowired
    private StatusAgendaRepository statusAgendaRepository;

    public List<StatusAgenda> buscarTodos() {
        return statusAgendaRepository.findAll();
    }

    public Optional<StatusAgenda> buscarPorId(Long id) {
        return statusAgendaRepository.findById(id);
    }

    public StatusAgenda criar(StatusAgenda status) {
        return statusAgendaRepository.save(status);
    }

    public StatusAgenda buscarOuCriarDisponivel() {
        return statusAgendaRepository.findAll().stream()
                .filter(s -> "DISPONIVEL".equalsIgnoreCase(s.getNm_status()))
                .findFirst()
                .orElseGet(() -> {
                    StatusAgenda novoStatus = new StatusAgenda();
                    novoStatus.setNm_status("DISPONIVEL");
                    return statusAgendaRepository.save(novoStatus);
                });
    }
}
