export interface Turma {
  id: number;
  codigo: string;
  vagas_ofertadas: number;
  vagas_ocupadas: number;
  vagas_disponiveis: number;
  disciplina_codigo: string;
  periodo_letivo_codigo: string;
  disciplina: {
    codigo: string;
    nome: string;
    creditos: number;
    carga_horaria: number;
  };
  professores: {
    codigo: string;
    nome: string;
  }[];
  horarios: {
    dia_semana: string;
    hora_inicio: string;
    hora_fim: string;
  }[];
}