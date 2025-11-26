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
    public Veterinario cadastrarVeterinario(VeterinarioRequestDTO dto) {

    if (dto.getHospitalId() == null) {
        throw new RuntimeException("O ID do hospital é obrigatório.");
    }

    Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
            .orElseThrow(() -> new RuntimeException("Hospital não encontrado"));

    // Monta a Pessoa
    Pessoa pessoa = new Pessoa();
pessoa.setNm_pessoa(dto.getNome());
pessoa.setTel_pessoa(dto.getTelefone());
pessoa.setDt_nasc_pessoa(dto.getDataNascimento());
pessoa.setEmail_pessoa(dto.getEmail());
pessoa.setRg_pessoa(dto.getRg());
pessoa.setCpf_pessoa(dto.getCpf());
pessoa.setSenha_pessoa(dto.getSenha());

pessoaRepository.save(pessoa);


    Veterinario veterinario = new Veterinario();
veterinario.setEspecialidade_vet(dto.getEspecialidade());
veterinario.setCrm_veterinario(dto.getCrm());
veterinario.setPessoa(pessoa);
veterinario.setHospital(hospital);

return veterinarioRepository.save(veterinario);

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
