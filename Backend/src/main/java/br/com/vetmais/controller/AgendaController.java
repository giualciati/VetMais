package br.com.vetmais.controller; // Confirme o pacote

import br.com.vetmais.dto.AgendaDisponivelDTO;
import br.com.vetmais.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/agendas") 
public class AgendaController {

    @Autowired
    private AgendaRepository agendaRepository;

    @GetMapping("/disponiveis")
    public List<AgendaDisponivelDTO> listarDisponiveis(
            @RequestParam(value = "especialidade", required = false) String especialidade) {
        
        if (especialidade != null && especialidade.isEmpty()) {
            especialidade = null;
        }
        return agendaRepository.buscarAgendasDisponiveis(especialidade);
    }
}