package br.com.vetmais.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.model.Prontuario;
import br.com.vetmais.repository.AnimalRepository;
import br.com.vetmais.repository.HospitalRepository;
import br.com.vetmais.repository.ProntuarioRepository;
import br.com.vetmais.repository.VeterinarioRepository;

@Service
public class ProntuarioService {

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private AnimalRepository animalRepository;

    public Prontuario createProntuario(Prontuario prontuario){

        // Buscar entidades reais pelo ID informado no JSON
        var vet = veterinarioRepository.findById(prontuario.getVeterinario().getId_veterinario())
                        .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));

        var hosp = hospitalRepository.findById(prontuario.getHospital().getId_hospvet())
                        .orElseThrow(() -> new RuntimeException("Hospital não encontrado"));

        var ani = animalRepository.findById(prontuario.getAnimal().getId_animal())
                        .orElseThrow(() -> new RuntimeException("Animal não encontrado"));

        // Substituir os objetos "transient" pelos objetos carregados do banco
        prontuario.setVeterinario(vet);
        prontuario.setHospital(hosp);
        prontuario.setAnimal(ani);

        return prontuarioRepository.save(prontuario);
    }
}
