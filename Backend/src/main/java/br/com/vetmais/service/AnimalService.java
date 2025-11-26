package br.com.vetmais.service;

import br.com.vetmais.model.Animal;
import br.com.vetmais.model.Tutor;
import br.com.vetmais.repository.AnimalRepository;
import br.com.vetmais.repository.TutorRepository; // Não esqueça desse import!
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private TutorRepository tutorRepository;

    public Animal CreateAnimal(Animal animal, Long idTutor) {
        
        Tutor tutor = tutorRepository.findById(idTutor)
            .orElseThrow(() -> new RuntimeException("Tutor não encontrado com ID: " + idTutor));

        // VINCULAÇÃO: Avisa ao animal quem é o dono dele
        animal.setTutor(tutor); 
        return animalRepository.save(animal);
    }
}