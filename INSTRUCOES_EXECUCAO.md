# 🚀 Instruções de Execução - Sistema de Matrícula UnB

## Pré-requisitos

- Python 3.11+ instalado ✅
- Node.js 16+ (para frontend)
- Git (para versionamento)

## 🔧 Configuração do Backend

1. **Navegar para o diretório do backend**
```bash
cd C:\Users\sammy\Workspace\mds\backend
```

2. **Ativar ambiente virtual**
```bash
.venv\Scripts\activate.bat
```

3. **Verificar dependências** (já instaladas)
```bash
python -c "import fastapi, sqlalchemy, uvicorn; print('✅ Dependências OK')"
```

4. **Popular banco de dados** (já executado)
```bash
python populate_db.py
```

5. **Iniciar API**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📱 Teste da Aplicação

### Opção 1: Teste via Browser (API)
1. Abrir navegador em: `http://localhost:8000/docs`
2. Testar endpoints interativamente
3. Ver dados em: `http://localhost:8000/api/matricula/turmas-disponiveis/2024/1`

### Opção 2: Teste via Arquivo HTML
O sistema funciona com dados mocados localmente para demonstração.

## 🧪 Dados de Teste Disponíveis

### Aluno Principal (para testes)
- **Nome**: Pedro
- **Matrícula**: 12345
- **Curso**: Engenharia Elétrica (123)
- **IRA**: 7.5

### Disciplinas Disponíveis
1. **ENE0454** - Introdução à Eng. de Redes (4 créditos)
   - Status: Pré-Matrícula
   - Vagas: 2 disponíveis de 60
   - Horário: Quarta 08:00-10:00

2. **MAT0025** - Cálculo 1 (6 créditos)
   - Turma A: Segunda 08:00-10:00
   - Turma B: Segunda 10:00-12:00

3. **CIC0004** - Algoritmos e Programação (6 créditos)
   - Turma A: Terça/Quinta 14:00-16:00

## 🔍 Funcionalidades para Testar

### 1. Confirmar/Rejeitar Pré-Matrícula
- Acessar detalhes da disciplina ENE0454
- Testar confirmação e rejeição
- Verificar mudança de status

### 2. Solicitar Turmas Adicionais
- Navegar para "Solicitar Turmas"
- Escolher tipo de solicitação
- Definir prioridades (1-10)
- Adicionar múltiplas disciplinas

### 3. Visualizar Comprovante
- Gerar comprovante de matrícula
- Ver disciplinas confirmadas
- Verificar total de créditos

### 4. Histórico de Solicitações
- Ver todas as solicitações realizadas
- Status de processamento
- Motivos de rejeição

## 🛠️ Resolução de Problemas

### API não inicia?
```bash
# Verificar se porta 8000 está livre
netstat -an | findstr :8000

# Tentar porta alternativa
uvicorn main:app --reload --port 8001
```

### Erro de banco de dados?
```bash
# Re-popular banco
python populate_db.py
```

### Dependências?
```bash
# Reinstalar se necessário
uv pip install -r requirements.txt
```

## 📋 Checklist de Validação

### ✅ Backend
- [ ] API iniciada em http://localhost:8000
- [ ] Documentação disponível em /docs
- [ ] Banco de dados populado
- [ ] Endpoints respondendo

### ✅ Funcionalidades
- [ ] Listagem de matrículas
- [ ] Confirmação de pré-matrícula
- [ ] Solicitação de turmas
- [ ] Diferentes tipos de matrícula
- [ ] Geração de comprovante
- [ ] Histórico de solicitações

### ✅ Regras de Negócio
- [ ] Validação de elegibilidade
- [ ] Sistema de prioridades
- [ ] Controle de vagas
- [ ] Conflito de horários
- [ ] Limite de créditos

## 🎯 Demonstração Rápida

1. **Abrir API**: `http://localhost:8000/docs`
2. **Testar**: GET `/api/matricula/turmas-disponiveis/2024/1`
3. **Verificar**: Lista de turmas retornada
4. **Confirmar**: Sistema funcionando ✅

## 📞 Suporte

- **Logs**: Verificar saída do terminal
- **Documentação**: README.md e ENTREGA_FINAL.md
- **API Docs**: http://localhost:8000/docs (quando rodando)

---

**Sistema pronto para demonstração e entrega! 🎉**