package br.com.vetmais.model;

import jakarta.persistence.*;

@Entity
@Table(name = "meus_pets")
public class MeusPets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String dataNascimento;
    private String rga;
    private String raca;
    private String especie;
    private String genero;

    public MeusPets() {}

    public MeusPets(Long id, String nome, String dataNascimento, String rga, String raca, String especie, String genero) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.rga = rga;
        this.raca = raca;
        this.especie = especie;
        this.genero = genero;
    }

    // GETTERS E SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getRga() { return rga; }
    public void setRga(String rga) { this.rga = rga; }

    public String getRaca() { return raca; }
    public void setRaca(String raca) { this.raca = raca; }

    public String getEspecie() { return especie; }
    public void setEspecie(String especie) { this.especie = especie; }

    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
}
