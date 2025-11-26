package br.com.vetmais.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.vetmais.dto.VeterinarioRequestDTO;
import br.com.vetmais.model.Hospital;
import br.com.vetmais.model.Pessoa;
import br.com.vetmais.model.Veterinario;
import br.com.vetmais.repository.HospitalRepository;
import br.com.vetmais.repository.PessoaRepository;
import br.com.vetmais.repository.VeterinarioRepository;
import jakarta.transaction.Transactional;

@Service
public class VeterinarioService {
    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private HospitalRepository hospitalRepository;         

    public List <Veterinario> getAllVeterinarios(){
        return veterinarioRepository.findAll();
    }

    @Transactional
    public void cadastrarVeterinario(VeterinarioRequestDTO dto) {

        Pessoa novaPessoa = new Pessoa();
        
        novaPessoa.setNm_pessoa(dto.getNome());
        novaPessoa.setTel_pessoa(dto.getTelefone());
        novaPessoa.setDt_nasc_pessoa(dto.getDataNascimento());
        novaPessoa.setEmail_pessoa(dto.getEmail());
        novaPessoa.setRg_pessoa(dto.getRg());
        novaPessoa.setSenha_pessoa(dto.getSenha());
        novaPessoa.setCpf_pessoa(dto.getCpf());
        
        Pessoa pessoaSalva = pessoaRepository.save(novaPessoa); 
        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new RuntimeException("Hospital não encontrado com ID: " + dto.getHospitalId()));

        Veterinario novoVeterinario = new Veterinario();
        novoVeterinario.setCrm_veterinario(dto.getCrm());
        novoVeterinario.setEspecialidade_vet(dto.getEspecialidade());
       
        novoVeterinario.setPessoa(pessoaSalva); 
        novoVeterinario.setHospital(hospital); 
        
        veterinarioRepository.save(novoVeterinario);
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
