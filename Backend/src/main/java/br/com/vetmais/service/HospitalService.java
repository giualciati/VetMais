package br.com.vetmais.service;

import br.com.vetmais.model.Hospital;
import br.com.vetmais.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {
    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> getHospitalById(Long id) {
        return hospitalRepository.findById(id);
    }

    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Hospital updateHospital(Long id, Hospital hospitalDetails) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital não encontrado com id: " + id));
        hospital.setNm_hospital(hospitalDetails.getNm_hospital());
        hospital.setCidade_hospital(hospitalDetails.getCidade_hospital());
        hospital.setEnd_hospital(hospitalDetails.getEnd_hospital());
        hospital.setTel_hospital(hospitalDetails.getTel_hospital());
        hospital.setEmail_hospital(hospitalDetails.getEmail_hospital());
        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital não encontrado com id: " + id));
        hospitalRepository.delete(hospital);
    }
}
