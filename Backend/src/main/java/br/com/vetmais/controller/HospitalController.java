package br.com.vetmais.controller;

import br.com.vetmais.dto.HospitalDTO;
import br.com.vetmais.model.Hospital;
import br.com.vetmais.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospital")
public class HospitalController {
    @Autowired
    private HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Long id) {
        return hospitalService.getHospitalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Hospital> createHospital(@RequestBody HospitalDTO hospitalDTO) {
        Hospital hospital = new Hospital();
        hospital.setNm_hospital(hospitalDTO.getNm_hospital());
        hospital.setCidade_hospital(hospitalDTO.getCidade_hospital());
        hospital.setEnd_hospital(hospitalDTO.getEnd_hospital());
        hospital.setTel_hospital(hospitalDTO.getTel_hospital());
        hospital.setEmail_hospital(hospitalDTO.getEmail_hospital());
        
        Hospital createdHospital = hospitalService.createHospital(hospital);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHospital);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody HospitalDTO hospitalDTO) {
        try {
            Hospital hospitalDetails = new Hospital();
            hospitalDetails.setNm_hospital(hospitalDTO.getNm_hospital());
            hospitalDetails.setCidade_hospital(hospitalDTO.getCidade_hospital());
            hospitalDetails.setEnd_hospital(hospitalDTO.getEnd_hospital());
            hospitalDetails.setTel_hospital(hospitalDTO.getTel_hospital());
            hospitalDetails.setEmail_hospital(hospitalDTO.getEmail_hospital());
            
            Hospital updatedHospital = hospitalService.updateHospital(id, hospitalDetails);
            return ResponseEntity.ok(updatedHospital);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id) {
        try {
            hospitalService.deleteHospital(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
