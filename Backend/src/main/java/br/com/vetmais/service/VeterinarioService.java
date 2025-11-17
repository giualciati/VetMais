package br.com.vetmais.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.model.Veterinario;
import br.com.vetmais.repository.VeterinarioRepository;

@Service
public class VeterinarioService {
    @Autowired
    private VeterinarioRepository veterinarioRepository;

    public List <Veterinario> getAllVeterinarios(){
        return veterinarioRepository.findAll();
    }

    public Veterinario createVeterinario(Veterinario veterinario){
        return  veterinarioRepository.save(veterinario);
    }

    public Veterinario updateVeterinario(Long id, Veterinario novo){
    return veterinarioRepository.findById(id)
        .map(veterinario -> {

            veterinario.setCrm_veterinario(novo.getCrm_veterinario());
            veterinario.setEspecialidade_vet(novo.getEspecialidade_vet());
            veterinario.setPessoa(novo.getPessoa());
            veterinario.setHospital(novo.getHospital());

            return veterinarioRepository.save(veterinario);
        })
        .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));
}
    public void deleteVeterinario(Long id){
        if(!veterinarioRepository.existsById(id)){
            throw new RuntimeException("Veterinário não encontrado");
        }
        veterinarioRepository.deleteById(id);
    }
    

}
