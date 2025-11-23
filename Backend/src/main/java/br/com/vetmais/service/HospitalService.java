package br.com.vetmais.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.model.Hospital;
import br.com.vetmais.repository.HospitalRepository;

@Service
public class HospitalService {
    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> getAllHospital(){
        return hospitalRepository.findAll();
    }

    public Hospital createHospital(Hospital hospital){
        return hospitalRepository.save(hospital);
    }
}
