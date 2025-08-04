import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Matricula } from '../../interfaces/matricula';
import { Aluno } from '../../interfaces/aluno';
import { MatriculaDataService } from '../../services/matricula-data.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  aluno: Aluno;
  matriculas: Matricula[] = [];
  periodoAtual = '2024/1';
  isLoading = false;

  constructor(
    private router: Router,
    private matriculaDataService: MatriculaDataService,
    private apiService: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;
    
    // Carregar dados do aluno
    this.matriculaDataService.getAlunoLogado().subscribe({
      next: (aluno) => {
        this.aluno = aluno;
        this.loadMatriculas();
      },
      error: (error) => {
        console.error('Erro ao carregar dados do aluno:', error);
        this.isLoading = false;
      }
    });
  }

  private async loadMatriculas() {
    this.matriculaDataService.getMatriculasAluno(
      this.aluno.matricula, 
      this.periodoAtual
    ).subscribe({
      next: (matriculas) => {
        this.matriculas = matriculas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar matrículas:', error);
        this.isLoading = false;
      }
    });
  }



  verDetalhes(matricula: Matricula) {
    // Pass data through state or use a service
    this.router.navigate(['/detalhe'], { 
      state: { matricula, aluno: this.aluno }
    });
  }

  async doRefresh(event: any) {
    await this.loadMatriculas();
    event.target.complete();
  }

  navegarParaSolicitacoes() {
    this.router.navigate(['/solicitacoes']);
  }

  navegarParaComprovante() {
    this.router.navigate(['/comprovante']);
  }

  navegarParaHistorico() {
    this.router.navigate(['/historico']);
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'Confirmada':
        return 'success';
      case 'Recusada':
        return 'danger';
      case 'PreMatricula':
        return 'warning';
      default:
        return 'medium';
    }
  }

  getStatusText(status: string) {
    switch (status) {
      case 'Confirmada':
        return 'Confirmada';
      case 'Recusada':
        return 'Rejeitada';
      case 'PreMatricula':
        return 'Pré-Matrícula';
      default:
        return 'Indefinido';
    }
  }

  getMatriculasByStatus(status: string): Matricula[] {
    return this.matriculas.filter(m => m.status === status);
  }

  getTotalCreditos(): number {
    return this.matriculas
      .filter(m => m.status === 'Confirmada')
      .reduce((total, m) => total + (m.creditos || 0), 0);
  }
}