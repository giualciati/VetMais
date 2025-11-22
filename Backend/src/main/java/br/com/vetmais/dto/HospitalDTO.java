package br.com.vetmais.dto;

public class HospitalDTO {
    private String nm_hospital;
    private String cidade_hospital;
    private String end_hospital;
    private String tel_hospital;
    private String email_hospital;

    public String getNm_hospital() {
        return nm_hospital;
    }

    public void setNm_hospital(String nm_hospital) {
        this.nm_hospital = nm_hospital;
    }

    public String getCidade_hospital() {
        return cidade_hospital;
    }

    public void setCidade_hospital(String cidade_hospital) {
        this.cidade_hospital = cidade_hospital;
    }

    public String getEnd_hospital() {
        return end_hospital;
    }

    public void setEnd_hospital(String end_hospital) {
        this.end_hospital = end_hospital;
    }

    public String getTel_hospital() {
        return tel_hospital;
    }

    public void setTel_hospital(String tel_hospital) {
        this.tel_hospital = tel_hospital;
    }

    public String getEmail_hospital() {
        return email_hospital;
    }

    public void setEmail_hospital(String email_hospital) {
        this.email_hospital = email_hospital;
    }
}
