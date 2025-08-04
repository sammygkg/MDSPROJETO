import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ComprovanteMatricula } from '../../interfaces/matricula';
import { Aluno } from '../../interfaces/aluno';
import { MatriculaDataService } from '../../services/matricula-data.service';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.page.html',
  styleUrls: ['./comprovante.page.scss'],
})
export class ComprovantePage implements OnInit {
  comprovante: ComprovanteMatricula | null = null;
  aluno: Aluno | null = null;
  periodoAtual = '2024/1';
  isLoading = false;

  constructor(
    private matriculaDataService: MatriculaDataService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;
    
    // Carregar dados do aluno
    this.matriculaDataService.getAlunoLogado().subscribe({
      next: (aluno) => {
        this.aluno = aluno;
        this.gerarComprovante();
      },
      error: (error) => {
        console.error('Erro ao carregar dados do aluno:', error);
        this.isLoading = false;
      }
    });
  }

  private gerarComprovante() {
    if (!this.aluno) return;

    this.matriculaDataService.gerarComprovante(this.aluno.matricula, this.periodoAtual).subscribe({
      next: (comprovante) => {
        this.comprovante = comprovante;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao gerar comprovante:', error);
        this.presentToast('Erro ao gerar comprovante', 'danger');
        this.isLoading = false;
      }
    });
  }

  async baixarComprovante() {
    if (!this.comprovante) {
      await this.presentToast('Nenhum comprovante disponível', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Preparando comprovante...'
    });
    await loading.present();

    try {
      // Simular preparação do arquivo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await this.presentToast('Comprovante salvo! (simulação)', 'success');
    } catch (error) {
      await this.presentToast('Erro ao salvar comprovante', 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  async compartilharComprovante() {
    if (!this.comprovante) {
      await this.presentToast('Nenhum comprovante disponível', 'warning');
      return;
    }

    // Simular compartilhamento
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Comprovante de Matrícula - UnB',
          text: `Comprovante de matrícula do período ${this.comprovante.periodo_letivo}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      await this.presentToast('Funcionalidade de compartilhamento não disponível', 'warning');
    }
  }

  async imprimirComprovante() {
    if (!this.comprovante) {
      await this.presentToast('Nenhum comprovante disponível', 'warning');
      return;
    }

    // Simular impressão
    if (window.print) {
      window.print();
    } else {
      await this.presentToast('Funcionalidade de impressão não disponível', 'warning');
    }
  }

  getStatusBadgeColor(): string {
    if (!this.comprovante || this.comprovante.matriculas.length === 0) {
      return 'medium';
    }
    return 'success';
  }

  getStatusText(): string {
    if (!this.comprovante || this.comprovante.matriculas.length === 0) {
      return 'Nenhuma matrícula confirmada';
    }
    return `${this.comprovante.matriculas.length} disciplina(s) confirmada(s)`;
  }

  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(data));
  }

  formatarHorarios(horarios: any[]): string {
    return horarios.map(h => 
      `${h.dia} ${h.horaInicio}-${h.horaFim}`
    ).join(', ');
  }

  private async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  async recarregarComprovante() {
    this.loadData();
  }
}