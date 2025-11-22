package br.com.vetmais.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.dto.VeterinarioNovoDTO;
import br.com.vetmais.model.Hospital;
import br.com.vetmais.model.Pessoa;
import br.com.vetmais.model.Veterinario;
import br.com.vetmais.repository.VeterinarioRepository;

@Service
public class VeterinarioService {
    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private HospitalService hospitalService;

    public List <Veterinario> getAllVeterinarios(){
        return veterinarioRepository.findAll();
    }

    public Veterinario createVeterinario(VeterinarioNovoDTO veterinario){
            Veterinario vet = new Veterinario();
            vet.setCrm_veterinario(veterinario.getCrmv_veterinario());
            vet.setEspecialidade_vet(veterinario.getEspecialidade_vet());

            Hospital hospital = hospitalService.getHospitalById(veterinario.getId_hospvet())
                .orElseThrow(() -> new RuntimeException("Hospital não encontrado com id: " + veterinario.getId_hospvet()));
            vet.setHospital(hospital);

            Pessoa pessoa = pessoaService.getPessoaById(veterinario.getId_pessoa())
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada com id: " + veterinario.getId_pessoa()));
            vet.setPessoa(pessoa);
            
        return  veterinarioRepository.save(vet);
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
