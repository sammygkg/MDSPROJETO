import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Turma } from '../interfaces/turma';
import { Matricula, ComprovanteMatricula, HistoricoMatricula } from '../interfaces/matricula';
import { Aluno } from '../interfaces/aluno';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private alunoLogado: Aluno = {
    matricula: '12345',
    nome: 'Pedro Silva',
    ira: 7.5,
    email: 'pedro@aluno.unb.br',
    curso_codigo: '123'
  };

  private turmasDisponiveis: Turma[] = [
    {
      id: 1,
      codigo: 'A',
      vagas_ofertadas: 60,
      vagas_ocupadas: 45,
      vagas_disponiveis: 15,
      disciplina_codigo: 'MAT0025',
      periodo_letivo_codigo: '2024/1',
      disciplina: {
        codigo: 'MAT0025',
        nome: 'Cálculo 1',
        creditos: 6,
        carga_horaria: 90
      },
      professores: [
        { codigo: 'PROF002', nome: 'Prof. Maria Santos' }
      ],
      horarios: [
        { dia_semana: 'Segunda', hora_inicio: '08:00', hora_fim: '10:00' },
        { dia_semana: 'Quarta', hora_inicio: '08:00', hora_fim: '10:00' }
      ]
    },
    {
      id: 2,
      codigo: 'B',
      vagas_ofertadas: 60,
      vagas_ocupadas: 50,
      vagas_disponiveis: 10,
      disciplina_codigo: 'MAT0025',
      periodo_letivo_codigo: '2024/1',
      disciplina: {
        codigo: 'MAT0025',
        nome: 'Cálculo 1',
        creditos: 6,
        carga_horaria: 90
      },
      professores: [
        { codigo: 'PROF002', nome: 'Prof. Maria Santos' }
      ],
      horarios: [
        { dia_semana: 'Segunda', hora_inicio: '10:00', hora_fim: '12:00' },
        { dia_semana: 'Quarta', hora_inicio: '10:00', hora_fim: '12:00' }
      ]
    },
    {
      id: 3,
      codigo: 'A',
      vagas_ofertadas: 50,
      vagas_ocupadas: 35,
      vagas_disponiveis: 15,
      disciplina_codigo: 'CIC0004',
      periodo_letivo_codigo: '2024/1',
      disciplina: {
        codigo: 'CIC0004',
        nome: 'Algoritmos e Programação de Computadores',
        creditos: 6,
        carga_horaria: 90
      },
      professores: [
        { codigo: 'PROF001', nome: 'Prof. João Silva' }
      ],
      horarios: [
        { dia_semana: 'Terça', hora_inicio: '14:00', hora_fim: '16:00' },
        { dia_semana: 'Quinta', hora_inicio: '14:00', hora_fim: '16:00' }
      ]
    },
    {
      id: 4,
      codigo: 'A',
      vagas_ofertadas: 60,
      vagas_ocupadas: 58,
      vagas_disponiveis: 2,
      disciplina_codigo: 'ENE0454',
      periodo_letivo_codigo: '2024/1',
      disciplina: {
        codigo: 'ENE0454',
        nome: 'Introdução à Engenharia de Redes de Comunicação',
        creditos: 4,
        carga_horaria: 60
      },
      professores: [
        { codigo: 'PROF003', nome: 'Prof. Pedro Alves' }
      ],
      horarios: [
        { dia_semana: 'Quarta', hora_inicio: '08:00', hora_fim: '10:00' }
      ]
    },
    {
      id: 5,
      codigo: 'A',
      vagas_ofertadas: 40,
      vagas_ocupadas: 25,
      vagas_disponiveis: 15,
      disciplina_codigo: 'MAT0031',
      periodo_letivo_codigo: '2024/1',
      disciplina: {
        codigo: 'MAT0031',
        nome: 'Álgebra Linear',
        creditos: 4,
        carga_horaria: 60
      },
      professores: [
        { codigo: 'PROF002', nome: 'Prof. Maria Santos' }
      ],
      horarios: [
        { dia_semana: 'Segunda', hora_inicio: '16:00', hora_fim: '18:00' }
      ]
    },
    {
      id: 6,
      codigo: 'A',
      vagas_ofertadas: 45,
      vagas_ocupadas: 40,
      vagas_disponiveis: 5,
      disciplina_codigo: 'ENE0031',
      periodo_letivo_codigo: '2024/1',
      disciplina: {
        codigo: 'ENE0031',
        nome: 'Circuitos Elétricos',
        creditos: 6,
        carga_horaria: 90
      },
      professores: [
        { codigo: 'PROF003', nome: 'Prof. Pedro Alves' }
      ],
      horarios: [
        { dia_semana: 'Terça', hora_inicio: '08:00', hora_fim: '10:00' },
        { dia_semana: 'Quinta', hora_inicio: '08:00', hora_fim: '10:00' }
      ]
    }
  ];

  private matriculasIniciais: Matricula[] = [
    {
      codigo: 'ENE0454',
      nome: 'Introdução à Engenharia de Redes de Comunicação',
      status: 'PreMatricula',
      vagasOfertadas: 60,
      vagasOcupadas: 58,
      vagasDisponiveis: 2,
      horario: { dia: 'Quarta', horaInicio: '08:00', horaFim: '10:00' },
      creditos: 4,
      professores: ['Prof. Pedro Alves'],
      turma_id: 4,
      disciplina_codigo: 'ENE0454',
      periodo_letivo: '2024/1'
    },
    {
      codigo: 'MAT0025',
      nome: 'Cálculo 1',
      status: 'PreMatricula',
      vagasOfertadas: 60,
      vagasOcupadas: 45,
      vagasDisponiveis: 15,
      horario: { dia: 'Segunda', horaInicio: '08:00', horaFim: '10:00' },
      creditos: 6,
      professores: ['Prof. Maria Santos'],
      turma_id: 1,
      disciplina_codigo: 'MAT0025',
      periodo_letivo: '2024/1'
    }
  ];

  private historicoSolicitacoes: HistoricoMatricula[] = [
    {
      id: 1,
      disciplina_codigo: 'MAT0025',
      disciplina_nome: 'Cálculo 1',
      turma_codigo: 'A',
      prioridade: 1,
      fase: 'Matricula',
      status: 'Aprovada',
      data_solicitacao: new Date('2024-02-15T10:30:00')
    },
    {
      id: 2,
      disciplina_codigo: 'CIC0004',
      disciplina_nome: 'Algoritmos e Programação de Computadores',
      turma_codigo: 'A',
      prioridade: 2,
      fase: 'Matricula',
      status: 'Rejeitada',
      motivo_rejeicao: 'Não há vagas disponíveis para esta turma',
      data_solicitacao: new Date('2024-02-15T10:32:00')
    },
    {
      id: 3,
      disciplina_codigo: 'ENE0454',
      disciplina_nome: 'Introdução à Engenharia de Redes de Comunicação',
      turma_codigo: 'A',
      prioridade: 1,
      fase: 'Rematricula',
      status: 'Aprovada',
      data_solicitacao: new Date('2024-03-01T14:15:00')
    }
  ];

  constructor() { }

  // Aluno
  getAlunoLogado(): Observable<Aluno> {
    return of(this.alunoLogado).pipe(delay(300));
  }

  // Turmas
  getTurmasDisponiveis(periodoLetivo: string): Observable<Turma[]> {
    return of(this.turmasDisponiveis).pipe(delay(500));
  }

  getTurmaPorId(id: number): Observable<Turma | undefined> {
    const turma = this.turmasDisponiveis.find(t => t.id === id);
    return of(turma).pipe(delay(300));
  }

  // Matrículas
  getMatriculasAluno(alunoMatricula: string, periodoLetivo: string): Observable<Matricula[]> {
    const matriculasStorage = this.getMatriculasFromStorage();
    return of(matriculasStorage.length > 0 ? matriculasStorage : this.matriculasIniciais).pipe(delay(400));
  }

  private getMatriculasFromStorage(): Matricula[] {
    const stored = localStorage.getItem('matriculas_aluno');
    return stored ? JSON.parse(stored) : [];
  }

  private saveMatriculasToStorage(matriculas: Matricula[]): void {
    localStorage.setItem('matriculas_aluno', JSON.stringify(matriculas));
  }

  // Confirmar/Rejeitar Pré-matrícula
  confirmarPreMatricula(alunoMatricula: string, turmaId: number, aceitar: boolean): Observable<any> {
    const matriculas = this.getMatriculasFromStorage();
    const matriculaIndex = matriculas.findIndex(m => m.turma_id === turmaId);
    
    if (matriculaIndex >= 0) {
      matriculas[matriculaIndex].status = aceitar ? 'Confirmada' : 'Recusada';
      this.saveMatriculasToStorage(matriculas);
      
      return of({
        success: true,
        message: aceitar ? 'Matrícula confirmada!' : 'Pré-matrícula rejeitada!'
      }).pipe(delay(600));
    }
    
    return of({
      success: false,
      message: 'Matrícula não encontrada'
    }).pipe(delay(300));
  }

  // Solicitar turma adicional
  solicitarTurma(turmaId: number, prioridade: number, fase: string): Observable<any> {
    const turma = this.turmasDisponiveis.find(t => t.id === turmaId);
    
    if (!turma) {
      return of({
        success: false,
        message: 'Turma não encontrada'
      }).pipe(delay(300));
    }

    if (turma.vagas_disponiveis <= 0) {
      return of({
        success: false,
        message: 'Não há vagas disponíveis'
      }).pipe(delay(300));
    }

    // Simular processamento
    const aprovada = Math.random() > 0.3; // 70% chance de aprovação
    
    if (aprovada && fase === 'Extraordinaria') {
      // Matrícula extraordinária é processada imediatamente
      const novaMatricula: Matricula = {
        codigo: turma.disciplina.codigo,
        nome: turma.disciplina.nome,
        status: 'Confirmada',
        vagasOfertadas: turma.vagas_ofertadas,
        vagasOcupadas: turma.vagas_ocupadas + 1,
        vagasDisponiveis: turma.vagas_disponiveis - 1,
        horario: {
          dia: turma.horarios[0].dia_semana,
          horaInicio: turma.horarios[0].hora_inicio,
          horaFim: turma.horarios[0].hora_fim
        },
        creditos: turma.disciplina.creditos,
        professores: turma.professores.map(p => p.nome),
        turma_id: turma.id,
        disciplina_codigo: turma.disciplina.codigo,
        periodo_letivo: turma.periodo_letivo_codigo
      };

      const matriculas = this.getMatriculasFromStorage();
      matriculas.push(novaMatricula);
      this.saveMatriculasToStorage(matriculas);

      // Atualizar vagas da turma
      turma.vagas_ocupadas++;
      turma.vagas_disponiveis--;
    }

    return of({
      success: true,
      message: fase === 'Extraordinaria' 
        ? (aprovada ? 'Matrícula extraordinária aprovada!' : 'Matrícula extraordinária rejeitada!')
        : 'Solicitação registrada! Será processada na próxima fase.'
    }).pipe(delay(800));
  }

  // Cancelar matrícula
  cancelarMatricula(alunoMatricula: string, turmaId: number): Observable<any> {
    const matriculas = this.getMatriculasFromStorage();
    const matriculaIndex = matriculas.findIndex(m => m.turma_id === turmaId);
    
    if (matriculaIndex >= 0) {
      const matricula = matriculas[matriculaIndex];
      matricula.status = 'Cancelada';
      
      // Liberar vaga
      const turma = this.turmasDisponiveis.find(t => t.id === turmaId);
      if (turma) {
        turma.vagas_ocupadas--;
        turma.vagas_disponiveis++;
      }
      
      this.saveMatriculasToStorage(matriculas);
      
      return of({
        success: true,
        message: 'Matrícula cancelada com sucesso!'
      }).pipe(delay(500));
    }
    
    return of({
      success: false,
      message: 'Matrícula não encontrada'
    }).pipe(delay(300));
  }

  // Comprovante
  gerarComprovante(alunoMatricula: string, periodoLetivo: string): Observable<ComprovanteMatricula> {
    const matriculas = this.getMatriculasFromStorage();
    const matriculasConfirmadas = matriculas.filter(m => m.status === 'Confirmada');
    
    const comprovante: ComprovanteMatricula = {
      aluno: {
        matricula: this.alunoLogado.matricula,
        nome: this.alunoLogado.nome,
        curso: 'Engenharia Elétrica'
      },
      periodo_letivo: periodoLetivo,
      matriculas: matriculasConfirmadas.map(m => ({
        disciplina_codigo: m.codigo,
        disciplina_nome: m.nome,
        turma_codigo: this.getTurmaCodigoPorId(m.turma_id!),
        creditos: m.creditos || 0,
        professores: m.professores || [],
        horarios: [{
          dia: m.horario.dia,
          horaInicio: m.horario.horaInicio,
          horaFim: m.horario.horaFim
        }]
      })),
      total_creditos: matriculasConfirmadas.reduce((total, m) => total + (m.creditos || 0), 0),
      data_geracao: new Date()
    };
    
    return of(comprovante).pipe(delay(700));
  }

  private getTurmaCodigoPorId(turmaId: number): string {
    const turma = this.turmasDisponiveis.find(t => t.id === turmaId);
    return turma ? turma.codigo : 'A';
  }

  // Histórico
  getHistoricoSolicitacoes(alunoMatricula: string): Observable<HistoricoMatricula[]> {
    return of(this.historicoSolicitacoes).pipe(delay(400));
  }

  // Simular processamento em lote
  processarSolicitacoesLote(fase: string): Observable<any> {
    return of({
      success: true,
      message: `Processamento da fase ${fase} concluído!`,
      processadas: 156,
      aprovadas: 98,
      rejeitadas: 58
    }).pipe(delay(2000));
  }

  // Validações
  validarElegibilidade(alunoMatricula: string, turmaId: number): Observable<{valido: boolean, motivo?: string}> {
    const turma = this.turmasDisponiveis.find(t => t.id === turmaId);
    
    if (!turma) {
      return of({valido: false, motivo: 'Turma não encontrada'}).pipe(delay(300));
    }

    // Simular algumas validações
    const temPreRequisitos = Math.random() > 0.1; // 90% têm pré-requisitos
    const jaFezDisciplina = Math.random() > 0.95; // 5% já fizeram
    const dentroLimiteCreditos = Math.random() > 0.05; // 95% dentro do limite

    if (!temPreRequisitos) {
      return of({valido: false, motivo: 'Aluno não possui todos os pré-requisitos'}).pipe(delay(300));
    }

    if (jaFezDisciplina) {
      return of({valido: false, motivo: 'Aluno já foi aprovado nesta disciplina'}).pipe(delay(300));
    }

    if (!dentroLimiteCreditos) {
      return of({valido: false, motivo: 'Excede limite máximo de créditos'}).pipe(delay(300));
    }

    return of({valido: true}).pipe(delay(300));
  }

  // Reset dados para demonstração
  resetarDados(): void {
    localStorage.removeItem('matriculas_aluno');
    // Resetar vagas das turmas
    this.turmasDisponiveis.forEach(turma => {
      switch(turma.id) {
        case 1: turma.vagas_ocupadas = 45; turma.vagas_disponiveis = 15; break;
        case 2: turma.vagas_ocupadas = 50; turma.vagas_disponiveis = 10; break;
        case 3: turma.vagas_ocupadas = 35; turma.vagas_disponiveis = 15; break;
        case 4: turma.vagas_ocupadas = 58; turma.vagas_disponiveis = 2; break;
        case 5: turma.vagas_ocupadas = 25; turma.vagas_disponiveis = 15; break;
        case 6: turma.vagas_ocupadas = 40; turma.vagas_disponiveis = 5; break;
      }
    });
  }
}