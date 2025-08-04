import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Matricula, Horario } from '../../interfaces/matricula';
import { Aluno } from '../../interfaces/aluno';
import { MatriculaDataService } from '../../services/matricula-data.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage implements OnInit {
  matricula: Matricula;
  aluno: Aluno;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matriculaDataService: MatriculaDataService,
    private apiService: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
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
        this.loadMatriculaData();
      },
      error: (error) => {
        console.error('Erro ao carregar dados do aluno:', error);
        this.isLoading = false;
      }
    });
  }

  private loadMatriculaData() {
    // Tentar obter dados passados pela navegação
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    
    if (state && state['matricula']) {
      this.matricula = state['matricula'];
      this.isLoading = false;
      return;
    }

    // Fallback: carregar primeira matrícula disponível
    this.matriculaDataService.getMatriculasAluno(this.aluno.matricula, '2024/1').subscribe({
      next: (matriculas) => {
        if (matriculas && matriculas.length > 0) {
          this.matricula = matriculas[0];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar matrícula:', error);
        this.isLoading = false;
      }
    });
  }

  private convertApiToLocal(apiMatricula: any): Matricula {
    return {
      codigo: apiMatricula.turma?.disciplina?.codigo || '',
      nome: apiMatricula.turma?.disciplina?.nome || '',
      status: apiMatricula.status as any,
      vagasOfertadas: apiMatricula.turma?.vagas_ofertadas || 0,
      vagasOcupadas: apiMatricula.turma?.vagas_ocupadas || 0,
      vagasDisponiveis: (apiMatricula.turma?.vagas_ofertadas || 0) - (apiMatricula.turma?.vagas_ocupadas || 0),
      horario: this.convertHorarios(apiMatricula.turma?.horarios || []),
      creditos: apiMatricula.turma?.disciplina?.creditos || 0,
      professores: apiMatricula.turma?.professores?.map((p: any) => p.nome) || [],
      turma_id: apiMatricula.turma_id,
      disciplina_codigo: apiMatricula.turma?.disciplina?.codigo,
      periodo_letivo: apiMatricula.turma?.periodo_letivo_codigo
    };
  }

  private convertHorarios(horarios: any[]): Horario {
    if (horarios && horarios.length > 0) {
      const horario = horarios[0];
      return {
        dia: horario.dia_semana,
        horaInicio: horario.hora_inicio,
        horaFim: horario.hora_fim
      };
    }
    return { dia: 'Quarta', horaInicio: '08:00', horaFim: '10:00' };
  }

  async confirmarMatricula() {
    const loading = await this.loadingController.create({
      message: 'Confirmando matrícula...'
    });
    await loading.present();

    if (this.matricula.turma_id) {
      this.matriculaDataService.confirmarMatricula(
        this.aluno.matricula, 
        this.matricula.turma_id
      ).subscribe({
        next: async (response) => {
          this.matricula.status = 'Confirmada';
          await this.presentToast(response.message || 'Matrícula confirmada!', 'success');
          await loading.dismiss();
        },
        error: async (error) => {
          console.error('Erro ao confirmar matrícula:', error);
          await this.presentToast('Erro ao confirmar matrícula', 'danger');
          await loading.dismiss();
        }
      });
    } else {
      await loading.dismiss();
      await this.presentToast('Erro: ID da turma não encontrado', 'danger');
    }
  }

  async cancelarMatricula() {
    const alert = await this.alertController.create({
      header: 'Confirmar Cancelamento',
      message: 'Tem certeza que deseja rejeitar esta pré-matrícula?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.executarCancelamento();
          }
        }
      ]
    });

    await alert.present();
  }

  private async executarCancelamento() {
    const loading = await this.loadingController.create({
      message: 'Rejeitando pré-matrícula...'
    });
    await loading.present();

    if (this.matricula.turma_id) {
      this.matriculaDataService.rejeitarMatricula(
        this.aluno.matricula, 
        this.matricula.turma_id
      ).subscribe({
        next: async (response) => {
          this.matricula.status = 'Recusada';
          await this.presentToast(response.message || 'Pré-matrícula rejeitada!', 'success');
          await loading.dismiss();
        },
        error: async (error) => {
          console.error('Erro ao rejeitar matrícula:', error);
          await this.presentToast('Erro ao rejeitar matrícula', 'danger');
          await loading.dismiss();
        }
      });
    } else {
      await loading.dismiss();
      await this.presentToast('Erro: ID da turma não encontrado', 'danger');
    }
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

  get statusColor() {
    switch (this.matricula?.status) {
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

  get statusText() {
    switch (this.matricula?.status) {
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
}