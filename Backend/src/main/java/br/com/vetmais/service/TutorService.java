package br.com.vetmais.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.model.Tutor;
import br.com.vetmais.repository.TutorRepository;

@Service
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository;


    public List<Tutor> getAllTutores() {
        return tutorRepository.findAll();
    }


    public Tutor createTutor(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

   
    public Tutor updateTutor(Long id, Tutor novo) {
        return tutorRepository.findById(id)
            .map(tutor -> {
                tutor.setPessoa(novo.getPessoa());
                return tutorRepository.save(tutor);
            })
            .orElseThrow(() -> new RuntimeException("Tutor não encontrado"));
    }

 
    public void deleteTutor(Long id) {
        if (!tutorRepository.existsById(id)) {
            throw new RuntimeException("Tutor não encontrado");
        }
        tutorRepository.deleteById(id);
    }
}
