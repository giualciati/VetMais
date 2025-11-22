package br.com.vetmais.dto;

import java.util.Date;
import java.util.List;

public class AgendaLoteDTO {
    private Long idVeterinario;
    private Long idHospital;
    private Long idServico;
    private List<Date> horariosDisponiveis;

    public Long getIdVeterinario() {
        return idVeterinario;
    }

    public void setIdVeterinario(Long idVeterinario) {
        this.idVeterinario = idVeterinario;
    }

    public Long getIdHospital() {
        return idHospital;
    }

    public void setIdHospital(Long idHospital) {
        this.idHospital = idHospital;
    }

    public Long getIdServico() {
        return idServico;
    }

    public void setIdServico(Long idServico) {
        this.idServico = idServico;
    }

    public List<Date> getHorariosDisponiveis() {
        return horariosDisponiveis;
    }

    public void setHorariosDisponiveis(List<Date> horariosDisponiveis) {
        this.horariosDisponiveis = horariosDisponiveis;
    }
}
