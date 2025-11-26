package br.com.vetmais.controller;

import br.com.vetmais.dto.AnimalDTO;
import br.com.vetmais.model.Animal;
import br.com.vetmais.repository.AnimalRepository;
import br.com.vetmais.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animais")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AnimalService animalService;

    @GetMapping("/tutor/{id}")
    public List<AnimalDTO> listarPorTutor(@PathVariable("id") Long idTutor) {
        return animalRepository.buscarPorTutor(idTutor);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> buscarPorId(@PathVariable Long id) {
        return animalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/tutor/{idTutor}")
    public ResponseEntity<Animal> criarAnimal(@RequestBody Animal animal, @PathVariable Long idTutor) {
        return ResponseEntity.ok(animalService.CreateAnimal(animal, idTutor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!animalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        animalRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<AnimalDTO> listarTodosAnimais() {
        return animalService.listarTodosAnimais(); // já mapeia para AnimalDTO
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> atualizar(@PathVariable Long id, @RequestBody Animal animalAtualizado) {
        return animalRepository.findById(id)
                .map(animal -> {
              
                    animal.setNm_animal(animalAtualizado.getNm_animal()); 
                    animal.setRaca_animal(animalAtualizado.getRaca_animal());
                    animal.setEspecie_animal(animalAtualizado.getEspecie_animal());
                    animal.setSexo_animal(animalAtualizado.getSexo_animal());
                    animal.setDt_nasc_animal(animalAtualizado.getDt_nasc_animal());
                    // Salva
                    Animal atualizado = animalRepository.save(animal);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}