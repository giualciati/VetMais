package br.com.vetmais.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.com.vetmais.model.Tutor;
import br.com.vetmais.service.TutorService;

@RestController
@RequestMapping("/tutores")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping
    public List<Tutor> findAll() {
        return tutorService.getAllTutores();
    }


    @PostMapping
    public Tutor create(@RequestBody Tutor tutor) {
        return tutorService.createTutor(tutor);
    }

    @PutMapping("/{id}")
    public Tutor update(@PathVariable Long id, @RequestBody Tutor tutor) {
        return tutorService.updateTutor(id, tutor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tutorService.deleteTutor(id);
    }
}
