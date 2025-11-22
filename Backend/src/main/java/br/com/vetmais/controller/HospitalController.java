package br.com.vetmais.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vetmais.model.Hospital;
import br.com.vetmais.service.HospitalService;

@RequestMapping("/hospital")
@RestController
public class HospitalController {
    @Autowired
    private HospitalService hospitalService;

    @GetMapping
    public List<Hospital> findAll(){
        return hospitalService.getAllHospital();
    }
    
    @PostMapping
    public Hospital createHospital(@RequestBody Hospital hospital){
        return hospitalService.createHospital(hospital);
    }

}
