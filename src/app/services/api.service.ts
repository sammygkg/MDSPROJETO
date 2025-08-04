import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Matricula, 
  SolicitacaoMatricula, 
  ComprovanteMatricula, 
  HistoricoMatricula 
} from '../interfaces/matricula';
import { Turma } from '../interfaces/turma';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8000/api';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Fase 2: Matrícula
  confirmarPreMatricula(alunoMatricula: string, turmaId: number, aceitar: boolean): Observable<any> {
    const params = {
      aluno_matricula: alunoMatricula,
      turma_id: turmaId,
      aceitar: aceitar
    };
    return this.http.post(`${this.baseUrl}/matricula/confirmar-pre-matricula`, null, {
      params: params,
      ...this.httpOptions
    });
  }

  solicitarTurma(solicitacao: SolicitacaoMatricula): Observable<any> {
    return this.http.post(`${this.baseUrl}/matricula/solicitar-turma`, solicitacao, this.httpOptions);
  }

  // Fase 4: Rematrícula
  cancelarMatricula(alunoMatricula: string, turmaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/matricula/cancelar/${alunoMatricula}/${turmaId}`);
  }

  // Fase 6: Matrícula Extraordinária
  matriculaExtraordinaria(solicitacao: SolicitacaoMatricula): Observable<any> {
    return this.http.post(`${this.baseUrl}/matricula/matricula-extraordinaria`, solicitacao, this.httpOptions);
  }

  // Fase 7: Comprovação
  obterComprovante(alunoMatricula: string, periodoLetivo: string): Observable<ComprovanteMatricula> {
    return this.http.get<ComprovanteMatricula>(`${this.baseUrl}/matricula/comprovante/${alunoMatricula}/${periodoLetivo}`);
  }

  obterHistorico(alunoMatricula: string): Observable<HistoricoMatricula[]> {
    return this.http.get<HistoricoMatricula[]>(`${this.baseUrl}/matricula/historico/${alunoMatricula}`);
  }

  // Consultas
  listarTurmasDisponiveis(periodoLetivo: string): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.baseUrl}/matricula/turmas-disponiveis/${periodoLetivo}`);
  }

  listarMatriculasAluno(alunoMatricula: string, periodoLetivo: string): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.baseUrl}/matricula/matriculas-aluno/${alunoMatricula}/${periodoLetivo}`);
  }

  // Processamento em lote (para administração)
  processarSolicitacoes(fase: 'Matricula' | 'Rematricula'): Observable<any> {
    return this.http.post(`${this.baseUrl}/matricula/processar-lote/${fase}`, {}, this.httpOptions);
  }
}