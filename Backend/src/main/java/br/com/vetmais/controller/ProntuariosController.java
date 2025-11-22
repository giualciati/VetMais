package br.com.vetmais.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <--- Faltava este import

import br.com.vetmais.model.Prontuario;
import br.com.vetmais.service.ProntuarioService;
import br.com.vetmais.repository.ProntuarioRepository; // <--- Faltava este import
import br.com.vetmais.dto.ProntuarioDetalhesDTO; // <--- Faltava este import
import br.com.vetmais.dto.ProntuarioResumoDTO;

@RestController
@RequestMapping("/prontuarios")
@CrossOrigin(origins = "*") // <--- Importante para seu React conseguir acessar
public class ProntuariosController {

    @Autowired
    private ProntuarioService prontuarioService;

    @Autowired
    private ProntuarioRepository prontuarioRepository; // <--- Faltava injetar isso

    @GetMapping
    public List<Prontuario> findAll(){
        return prontuarioService.getAllProntuarios();
    }

    @PostMapping
    public Prontuario createProntuario(@RequestBody Prontuario prontuario){
        return prontuarioService.createProntuario(prontuario);
    }

    @PutMapping("/{id}")
    public Prontuario update(@PathVariable Long id, @RequestBody Prontuario prontuario) {
        return prontuarioService.updateProntuario(id, prontuario);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        prontuarioService.deleteProntuario(id);
    }    

    @GetMapping("/{id}")
    public ResponseEntity<ProntuarioDetalhesDTO> buscarPorId(@PathVariable Long id) {
       
        return prontuarioRepository.findById(id)
                .map(prontuario -> {
                    ProntuarioDetalhesDTO dto = new ProntuarioDetalhesDTO();
                    
                    dto.setProtocolo(prontuario.getId_prontuario());

                
                    dto.setNomeAnimal(prontuario.getAnimal().getNm_animal());
                    dto.setSexo(prontuario.getAnimal().getSexo_animal());
                    dto.setDataNascimento(prontuario.getAnimal().getDt_nasc_animal());
                    dto.setEspecie(prontuario.getAnimal().getEspecie_animal());
                    dto.setRaca(prontuario.getAnimal().getRaca_animal());
                    dto.setRga(prontuario.getAnimal().getRGA_animal());
                    dto.setDescricaoAnimal(prontuario.getAnimal().getDesc_animal());
                    
                    
                    dto.setNomeTutor(prontuario.getAnimal().getTutor().getPessoa().getNm_pessoa());

                   
                    dto.setNomeVeterinario(prontuario.getVeterinario().getPessoa().getNm_pessoa());
                    dto.setNomeHospital(prontuario.getHospital().getNm_hospital());
                    dto.setDataAtendimento(prontuario.getDt_atendimento());

                  
                    dto.setSintomas(prontuario.getDs_sintomas());
                    dto.setDiagnostico(prontuario.getDs_diagnostico());
                    dto.setTratamento(prontuario.getDs_tratamento());
                    dto.setObservacoes(prontuario.getDs_observacoes());

                    return ResponseEntity.ok(dto);
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tutor/{idTutor}")
    public ResponseEntity<List<ProntuarioResumoDTO>> listarPorTutor(@PathVariable Long idTutor) {
        List<ProntuarioResumoDTO> lista = prontuarioRepository.buscarPorTutor(idTutor);
        
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 se não tiver nada
        }
        
        return ResponseEntity.ok(lista);
    }
}