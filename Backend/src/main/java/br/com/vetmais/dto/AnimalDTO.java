package br.com.vetmais.dto;

import br.com.vetmais.model.Animal;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Date;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalDTO {
    private Long id;
    private String nome;
    private String especie;
    private String raca;
    private String sexo;
    private Date dataNascimento;

    public AnimalDTO(Animal animal) {
        this.id = animal.getId_animal();
        this.nome = animal.getNm_animal();
        this.especie = animal.getEspecie_animal();
        this.raca = animal.getRaca_animal();
        this.sexo = animal.getSexo_animal();
        this.dataNascimento = (Date) animal.getDt_nasc_animal();
    }
}