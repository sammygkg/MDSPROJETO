export interface Aluno {
  matricula: string;
  nome: string;
  ira: number;
  email?: string;
  curso_codigo: string;
  data_admissao?: Date;
  curso?: Curso;
}

export interface Curso {
  codigo: string;
  nome: string;
  creditos_minimos: number;
  creditos_maximos: number;
}