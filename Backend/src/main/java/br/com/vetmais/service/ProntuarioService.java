package br.com.vetmais.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.model.Prontuario;
import br.com.vetmais.repository.ProntuarioRepository;

@Service
public class ProntuarioService {
    @Autowired
    private ProntuarioRepository prontuarioRepository;

    public List<Prontuario> getAllProntuarios(){
        return prontuarioRepository.findAll();
    }

    public Prontuario createProntuario(Prontuario prontuario){
        return prontuarioRepository.save(prontuario);
    }
    
    public Prontuario updateProntuario(Long id, Prontuario novo) {
    return prontuarioRepository.findById(id)
        .map(prontuario -> {

            prontuario.setDt_atendimento(novo.getDt_atendimento());
            prontuario.setDs_sintomas(novo.getDs_sintomas());
            prontuario.setDs_diagnostico(novo.getDs_diagnostico());
            prontuario.setDs_tratamento(novo.getDs_tratamento());
            prontuario.setDs_medicacao(novo.getDs_medicacao());
            prontuario.setDs_observacoes(novo.getDs_observacoes());
            prontuario.setVeterinario(novo.getVeterinario());
            prontuario.setHospital(novo.getHospital());
            prontuario.setAnimal(novo.getAnimal());

            return prontuarioRepository.save(prontuario);
        })
        .orElseThrow(() -> new RuntimeException("Prontuário não encontrado"));
}
    public void deleteProntuario(Long id) {
    if (!prontuarioRepository.existsById(id)) {
        throw new RuntimeException("Prontuário não encontrado");
    }
    prontuarioRepository.deleteById(id);
}
}
