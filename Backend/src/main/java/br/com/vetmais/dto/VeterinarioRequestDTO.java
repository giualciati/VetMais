package br.com.vetmais.dto;

public record VeterinarioRequestDTO (
    
    String crm_veterinario,

    String especialidade_vet,

    Long id_pessoa,

    Long id_hospital

){}
