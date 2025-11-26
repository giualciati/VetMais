package br.com.vetmais.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.dto.ProntuarioRequestDTO;
import br.com.vetmais.model.Animal;
import br.com.vetmais.model.Hospital;
import br.com.vetmais.model.Prontuario;
import br.com.vetmais.model.Veterinario;
import br.com.vetmais.repository.AnimalRepository;
import br.com.vetmais.repository.HospitalRepository;
import br.com.vetmais.repository.ProntuarioRepository;
import br.com.vetmais.repository.VeterinarioRepository;



@Service
public class ProntuarioService {

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private AnimalRepository animalRepository;

    public Prontuario cadastrarProntuario(ProntuarioRequestDTO dto) {
        Veterinario vet = veterinarioRepository.findById(dto.getVeterinarioId())
                .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));

        Hospital hosp = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new RuntimeException("Hospital não encontrado"));

        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new RuntimeException("Animal não encontrado"));

        Prontuario prontuario = new Prontuario();
        prontuario.setDt_atendimento(dto.getDtAtendimento());
        prontuario.setDs_sintomas(dto.getDsSintomas());
        prontuario.setDs_diagnostico(dto.getDsDiagnostico());
        prontuario.setDs_tratamento(dto.getDsTratamento());
        prontuario.setDs_observacoes(dto.getDsObservacoes());
        prontuario.setVeterinario(vet);
        prontuario.setHospital(hosp);
        prontuario.setAnimal(animal);

        return prontuarioRepository.save(prontuario);
    }
    public List<Prontuario> getAllProntuarios() {
    return prontuarioRepository.findAll();
}

public Prontuario updateProntuario(Long id, Prontuario p) {

        Prontuario original = prontuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prontuário não encontrado"));

        // Atualiza apenas os campos editáveis
        original.setDt_atendimento(p.getDt_atendimento());
        original.setDs_sintomas(p.getDs_sintomas());
        original.setDs_diagnostico(p.getDs_diagnostico());
        original.setDs_tratamento(p.getDs_tratamento());
        original.setDs_observacoes(p.getDs_observacoes());

        return prontuarioRepository.save(original);
    }


    // -------------------------
    // DELETAR PRONTUÁRIO
    // -------------------------
    public void deleteProntuario(Long id) {
        prontuarioRepository.deleteById(id);
    }

}
