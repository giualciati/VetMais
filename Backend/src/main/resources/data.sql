-- DATA LOAD SCRIPT FOR vetmais APPLICATION
-- Execute manually in MySQL (after CREATE DATABASE vetmais; USE vetmais;) or let Spring Boot run it if placed as data.sql.
-- WARNING: This will insert sample data. Remove sections you don't need.
-- If you want a clean load, uncomment TRUNCATE section below.

-- OPTIONAL CLEAN (uncomment if needed)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE tb_agendamento;
-- TRUNCATE tb_agenda;
-- TRUNCATE tb_prontuario;
-- TRUNCATE tb_animal;
-- TRUNCATE tb_tutor;
-- TRUNCATE tb_veterinario;
-- TRUNCATE tb_servico;
-- TRUNCATE tb_status_agenda;
-- TRUNCATE tb_situacao_agendamento;
-- TRUNCATE tb_hospvet;
-- TRUNCATE tb_pessoa;
-- SET FOREIGN_KEY_CHECKS = 1;

-- 1) Pessoas
INSERT INTO
    tb_pessoa (
        nm_pessoa,
        dt_nasc_pessoa,
        rg_pessoa,
        cpf_pessoa,
        tel_pessoa,
        email_pessoa,
        senha_pessoa
    )
VALUES (
        'Carlos Silva',
        '1985-03-10',
        '1234567',
        '11122233344',
        '11988880001',
        'carlos@exemplo.com',
        'senha123'
    ),
    (
        'Mariana Rocha',
        '1990-07-22',
        '2345678',
        '55566677788',
        '11988880002',
        'mariana@exemplo.com',
        'senha123'
    ),
    (
        'João Mendes',
        '1978-11-05',
        '3456789',
        '99911122233',
        '11988880003',
        'joao@exemplo.com',
        'senha123'
    ),
    (
        'Fernanda Alves',
        '1992-02-14',
        '4567890',
        '44455566677',
        '11988880004',
        'fernanda@exemplo.com',
        'senha123'
    ),
    (
        'Paulo Gomes',
        '1988-09-30',
        '5678901',
        '77788899900',
        '11988880005',
        'paulo@exemplo.com',
        'senha123'
    ),
    (
        'Laura Dias',
        '1995-12-19',
        '6789012',
        '22233344455',
        '11988880006',
        'laura@exemplo.com',
        'senha123'
    ),
    (
        'Ricardo Prado',
        '1983-06-02',
        '7890123',
        '66677788899',
        '11988880007',
        'ricardo@exemplo.com',
        'senha123'
    ),
    (
        'Patrícia Nunes',
        '1986-04-25',
        '8901234',
        '12345678901',
        '11988880008',
        'patricia@exemplo.com',
        'senha123'
    );

-- 2) Hospitais
INSERT INTO
    tb_hospvet (
        nm_hospital,
        cidade_hospital,
        end_hospital,
        tel_hospital,
        email_hospital
    )
VALUES (
        'Hospital Vet Central',
        'São Paulo',
        'Av. Paulista, 1000',
        '1133001000',
        'contato@vetcentral.com'
    ),
    (
        'Clínica Animais Felizes',
        'São Paulo',
        'Rua das Flores, 200',
        '1133002000',
        'contato@animaisfelizes.com'
    );

-- 3) Serviços
INSERT INTO
    tb_servico (nm_servico, ds_servico)
VALUES (
        'Consulta Geral',
        'Avaliação clínica completa'
    ),
    (
        'Vacinação',
        'Aplicação de vacinas essenciais'
    ),
    (
        'Exame Laboratorial',
        'Coleta e análise de amostras'
    ),
    (
        'Cirurgia',
        'Procedimentos cirúrgicos'
    ),
    (
        'Banho e Tosa',
        'Higiene e estética do animal'
    );

-- 4) Status Agenda
INSERT INTO
    tb_status_agenda (nm_status)
VALUES ('DISPONIVEL'),
    ('OCUPADO'),
    ('CANCELADO');

-- 5) Situações de Agendamento
INSERT INTO
    tb_situacao_agendamento (nm_situacao)
VALUES ('Agendado'),
    ('Em Atendimento'),
    ('Cancelado'),
    ('Concluído');

-- 6) Tutores (associados às primeiras pessoas)
INSERT INTO tb_tutor (id_pessoa) VALUES (1), (2), (3), (4);

-- 7) Veterinários (pessoas 5..8)
INSERT INTO
    tb_veterinario (
        crm_veterinario,
        especialidade_vet,
        id_pessoa,
        id_hospvet
    )
VALUES (
        'CRMV123',
        'Clinico Geral',
        5,
        1
    ),
    ('CRMV456', 'Cirurgião', 6, 1),
    (
        'CRMV789',
        'Dermatologista',
        7,
        2
    ),
    (
        'CRMV321',
        'Ortopedista',
        8,
        2
    );

-- 8) Animais
INSERT INTO
    tb_animal (
        nm_animal,
        especie_animal,
        raca_animal,
        desc_animal,
        dt_nasc_animal,
        RGA_animal,
        sexo_animal,
        id_tutor
    )
VALUES (
        'Rex',
        'Cão',
        'Labrador',
        'Saudável',
        '2021-05-01',
        'RGA001',
        'Macho',
        1
    ),
    (
        'Luna',
        'Gato',
        'Siamês',
        'Ansiosa',
        '2022-01-15',
        'RGA002',
        'Fêmea',
        1
    ),
    (
        'Thor',
        'Cão',
        'Pitbull',
        'Forte',
        '2020-08-20',
        'RGA003',
        'Macho',
        2
    ),
    (
        'Mimi',
        'Gato',
        'Persa',
        'Calma',
        '2019-11-11',
        'RGA004',
        'Fêmea',
        3
    ),
    (
        'Bob',
        'Cão',
        'Vira-Lata',
        'Agitado',
        '2023-03-05',
        'RGA005',
        'Macho',
        4
    );

-- 9) Agendas (inicialmente disponíveis)
INSERT INTO
    tb_agenda (
        data_hora,
        id_status_agenda,
        id_veterinario,
        id_hospvet,
        id_servico
    )
VALUES (
        '2025-11-22 09:00:00',
        1,
        1,
        1,
        1
    ),
    (
        '2025-11-22 10:00:00',
        1,
        1,
        1,
        2
    ),
    (
        '2025-11-22 11:00:00',
        1,
        2,
        1,
        3
    ),
    (
        '2025-11-22 14:00:00',
        1,
        3,
        2,
        1
    ),
    (
        '2025-11-22 15:00:00',
        1,
        3,
        2,
        4
    ),
    (
        '2025-11-23 09:30:00',
        1,
        4,
        2,
        2
    ),
    (
        '2025-11-23 10:30:00',
        1,
        4,
        2,
        5
    ),
    (
        '2025-11-23 11:30:00',
        1,
        2,
        1,
        1
    ),
    (
        '2025-11-24 09:00:00',
        1,
        1,
        1,
        4
    ),
    (
        '2025-11-24 10:00:00',
        1,
        2,
        1,
        5
    );

-- 10) Marcar algumas agendas como ocupadas
UPDATE tb_agenda SET id_status_agenda = 2 WHERE id IN (1, 3, 5, 7);

-- 11) Agendamentos (ligam tutor/animal/agenda/situação)
INSERT INTO
    tb_agendamento (
        id_agenda,
        id_tutor,
        id_animal,
        id_situacao,
        criado_em
    )
VALUES (1, 1, 1, 1, NOW()),
    (3, 2, 3, 1, NOW()),
    (5, 3, 4, 1, NOW()),
    (7, 4, 5, 1, NOW());

-- 12) Prontuários
INSERT INTO
    tb_prontuario (
        dt_atendimento,
        ds_sintomas,
        ds_diagnostico,
        ds_tratamento,
        ds_medicacao,
        ds_observacoes,
        id_veterinario,
        id_hospvet,
        id_animal
    )
VALUES (
        '2025-11-22',
        'Febre e apatia',
        'Infecção leve',
        'Repouso e hidratação',
        'Antibiótico 5 dias',
        'Retorno em 1 semana',
        1,
        1,
        1
    ),
    (
        '2025-11-22',
        'Coceira intensa',
        'Dermatite alérgica',
        'Pomada tópica',
        'Anti-histamínico',
        'Evitar alimento X',
        3,
        2,
        4
    );

-- 13) Mais agendas para teste de filtros
INSERT INTO
    tb_agenda (
        data_hora,
        id_status_agenda,
        id_veterinario,
        id_hospvet,
        id_servico
    )
VALUES (
        '2025-11-25 09:00:00',
        1,
        2,
        1,
        2
    ),
    (
        '2025-11-25 10:00:00',
        1,
        2,
        1,
        2
    ),
    (
        '2025-11-25 11:00:00',
        1,
        2,
        1,
        3
    ),
    (
        '2025-11-26 09:00:00',
        1,
        3,
        2,
        4
    ),
    (
        '2025-11-26 10:00:00',
        1,
        4,
        2,
        5
    );

-- Verification queries (optional)
-- SELECT * FROM tb_agenda WHERE id_status_agenda = 1 ORDER BY data_hora;
-- SELECT ag.id_agendamento, a.data_hora, v.especialidade_vet, s.nm_servico
-- FROM tb_agendamento ag
-- JOIN tb_agenda a ON a.id = ag.id_agenda
-- JOIN tb_veterinario v ON v.id_veterinario = a.id_veterinario
-- JOIN tb_servico s ON s.id_servico = a.id_servico;