package br.com.vetmais.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.vetmais.dto.HospitalDTO;
import br.com.vetmais.model.Hospital;
import br.com.vetmais.repository.HospitalRepository;
import br.com.vetmais.service.HospitalService;

@RequestMapping("/hospital")
@RestController
public class HospitalController {
    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private HospitalRepository hospitalRepository;

    @GetMapping("/findAll")
    public List<Hospital> findAll(){
        return hospitalService.getAllHospital();
    }
    
    @PostMapping
    public Hospital createHospital(@RequestBody Hospital hospital){
        return hospitalService.createHospital(hospital);
    }

    @GetMapping
    public List<HospitalDTO> listarHospitais() {
        return hospitalRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private HospitalDTO convertToDTO(Hospital hospital) {
        HospitalDTO dto = new HospitalDTO();
        dto.setId(hospital.getId_hospvet()); 
        dto.setNome(hospital.getNm_hospital()); 
        return dto;
    }

}
