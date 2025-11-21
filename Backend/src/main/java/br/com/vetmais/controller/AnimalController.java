package br.com.vetmais.controller;

import br.com.vetmais.dto.AnimalDTO;
import br.com.vetmais.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animais")
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping("/tutor/{id}")
    public List<AnimalDTO> listarPorTutor(@PathVariable("id") Long idTutor) {
        return animalRepository.buscarPorTutor(idTutor);
    }
}