package br.com.vetmais.dto;

public class VeterinarioNovoDTO {
    private Long id_pessoa;
    private Long id_hospvet;
    private String crmv_veterinario;
    private String especialidade_vet;

    public Long getId_pessoa() {
        return id_pessoa;
    }

    public void setId_pessoa(Long id_pessoa) {
        this.id_pessoa = id_pessoa;
    }

    public Long getId_hospvet() {
        return id_hospvet;
    }

    public void setId_hospvet(Long id_hospvet) {
        this.id_hospvet = id_hospvet;
    }

    public String getCrmv_veterinario() {
        return crmv_veterinario;
    }

    public void setCrmv_veterinario(String crmv_veterinario) {
        this.crmv_veterinario = crmv_veterinario;
    }

    public String getEspecialidade_vet() {
        return especialidade_vet;
    }

    public void setEspecialidade_vet(String especialidade_vet) {
        this.especialidade_vet = especialidade_vet;
    }
}
