# Sistema de Matrícula de Alunos - UnB

Sistema de automação do processo de matrícula de alunos da Universidade de Brasília.

## Arquitetura

- **Frontend**: Angular/Ionic (Aplicação Mobile/Web)
- **Backend**: Python FastAPI (SOA - Service Oriented Architecture)
- **Banco de Dados**: SQLite (para prototipagem)

## Fases Implementadas

- **Fase 2**: Matrícula (confirmação/rejeição de pré-matrícula + solicitações adicionais)
- **Fase 4**: Rematrícula (cancelar matrículas + solicitar novas turmas)
- **Fase 6**: Matrícula Extraordinária (casos excepcionais)
- **Fase 7**: Comprovação de Matrícula (visualizar comprovante + histórico)

## Estrutura do Projeto

```
mds/
├── frontend/          # Angular/Ionic App
├── backend/           # FastAPI Services
├── docs/             # Documentação
└── database/         # Scripts de banco de dados
```

## Como Executar

### Backend
```bash
cd backend
uv venv
.venv\Scripts\activate.bat
uv pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
ionic serve
```