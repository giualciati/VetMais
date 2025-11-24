package br.com.vetmais.service;

import org.springframework.stereotype.Service;

import br.com.vetmais.model.Animal;
import br.com.vetmais.repository.AnimalRepository;

@Service
public class AnimalService {

    public AnimalRepository animalRepository;

    public Animal CreateAnimal(Animal animal){
        return animalRepository.save(animal);
    }

}
