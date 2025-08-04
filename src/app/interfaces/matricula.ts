export interface Matricula {
  id?: number;
  codigo: string;
  nome: string;
  status: 'PreMatricula' | 'Confirmada' | 'Recusada' | 'Cancelada';
  vagasOfertadas: number;
  vagasOcupadas: number;
  vagasDisponiveis?: number;
  horario: Horario;
  creditos?: number;
  professores?: string[];
  turma_id?: number;
  disciplina_codigo?: string;
  periodo_letivo?: string;
}

export interface Horario {
  dia: string;
  horaInicio: string;
  horaFim: string;
}

export interface SolicitacaoMatricula {
  aluno_matricula: string;
  turma_id: number;
  prioridade: number;
  fase: 'Matricula' | 'Rematricula' | 'Extraordinaria';
}

export interface ComprovanteMatricula {
  aluno: {
    matricula: string;
    nome: string;
    curso: string;
  };
  periodo_letivo: string;
  matriculas: {
    disciplina_codigo: string;
    disciplina_nome: string;
    turma_codigo: string;
    creditos: number;
    professores: string[];
    horarios: Horario[];
  }[];
  total_creditos: number;
  data_geracao: Date;
}

export interface HistoricoMatricula {
  id: number;
  disciplina_codigo: string;
  disciplina_nome: string;
  turma_codigo: string;
  prioridade: number;
  fase: string;
  status: string;
  motivo_rejeicao?: string;
  data_solicitacao: Date;
}