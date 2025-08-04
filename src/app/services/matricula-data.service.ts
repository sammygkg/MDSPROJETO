import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula, ComprovanteMatricula, HistoricoMatricula } from '../interfaces/matricula';
import { Turma } from '../interfaces/turma';
import { Aluno } from '../interfaces/aluno';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaDataService {

  constructor(private mockDataService: MockDataService) { }

  // Aluno
  getAlunoLogado(): Observable<Aluno> {
    return this.mockDataService.getAlunoLogado();
  }

  // Matrículas
  getMatriculasAluno(alunoMatricula: string, periodoLetivo: string): Observable<Matricula[]> {
    return this.mockDataService.getMatriculasAluno(alunoMatricula, periodoLetivo);
  }

  confirmarMatricula(alunoMatricula: string, turmaId: number): Observable<any> {
    return this.mockDataService.confirmarPreMatricula(alunoMatricula, turmaId, true);
  }

  rejeitarMatricula(alunoMatricula: string, turmaId: number): Observable<any> {
    return this.mockDataService.confirmarPreMatricula(alunoMatricula, turmaId, false);
  }

  cancelarMatricula(alunoMatricula: string, turmaId: number): Observable<any> {
    return this.mockDataService.cancelarMatricula(alunoMatricula, turmaId);
  }

  // Turmas
  getTurmasDisponiveis(periodoLetivo: string): Observable<Turma[]> {
    return this.mockDataService.getTurmasDisponiveis(periodoLetivo);
  }

  getTurmaPorId(id: number): Observable<Turma | undefined> {
    return this.mockDataService.getTurmaPorId(id);
  }

  // Solicitações
  solicitarTurma(turmaId: number, prioridade: number, fase: string): Observable<any> {
    return this.mockDataService.solicitarTurma(turmaId, prioridade, fase);
  }

  // Comprovante
  gerarComprovante(alunoMatricula: string, periodoLetivo: string): Observable<ComprovanteMatricula> {
    return this.mockDataService.gerarComprovante(alunoMatricula, periodoLetivo);
  }

  // Histórico
  getHistoricoSolicitacoes(alunoMatricula: string): Observable<HistoricoMatricula[]> {
    return this.mockDataService.getHistoricoSolicitacoes(alunoMatricula);
  }

  // Validações
  validarElegibilidade(alunoMatricula: string, turmaId: number): Observable<{valido: boolean, motivo?: string}> {
    return this.mockDataService.validarElegibilidade(alunoMatricula, turmaId);
  }

  // Utilitários para demonstração
  resetarDados(): void {
    this.mockDataService.resetarDados();
  }

  // Métodos de compatibilidade (localStorage)
  private getStorageKey(matriculaCodigo: string, alunoMatricula: string): string {
    return `statusMatricula_${matriculaCodigo}_${alunoMatricula}`;
  }

  getMatriculaStatus(matriculaCodigo: string, alunoMatricula: string): 'PreMatricula' | 'Confirmada' | 'Recusada' {
    const key = this.getStorageKey(matriculaCodigo, alunoMatricula);
    const savedStatus = localStorage.getItem(key);
    return (savedStatus || 'PreMatricula') as 'PreMatricula' | 'Confirmada' | 'Recusada';
  }

  setMatriculaStatus(matriculaCodigo: string, alunoMatricula: string, status: 'Confirmada' | 'Recusada'): void {
    const key = this.getStorageKey(matriculaCodigo, alunoMatricula);
    localStorage.setItem(key, status);
  }
}