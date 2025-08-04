import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Turma } from '../../interfaces/turma';
import { SolicitacaoMatricula } from '../../interfaces/matricula';
import { ApiService } from '../../services/api.service';
import { MatriculaDataService } from '../../services/matricula-data.service';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.page.html',
  styleUrls: ['./solicitacoes.page.scss'],
})
export class SolicitacoesPage implements OnInit {
  turmasDisponiveis: Turma[] = [];
  solicitacoes: (SolicitacaoMatricula & { turma?: Turma })[] = [];
  periodoAtual = '2024/1';
  alunoMatricula = '12345';
  isLoading = false;
  fase: 'Matricula' | 'Rematricula' | 'Extraordinaria' = 'Matricula';

  constructor(
    private apiService: ApiService,
    private matriculaDataService: MatriculaDataService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTurmasDisponiveis();
  }

  async loadTurmasDisponiveis() {
    this.isLoading = true;
    
    this.matriculaDataService.getTurmasDisponiveis(this.periodoAtual).subscribe({
      next: (turmas) => {
        this.turmasDisponiveis = turmas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar turmas:', error);
        this.isLoading = false;
      }
    });
  }

  private loadMockTurmas() {
    this.turmasDisponiveis = [
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
      }
    ];
  }

  async adicionarSolicitacao(turma: Turma) {
    const alert = await this.alertController.create({
      header: 'Solicitar Matrícula',
      message: `Deseja solicitar matrícula em ${turma.disciplina.nome}?`,
      inputs: [
        {
          name: 'prioridade',
          type: 'number',
          placeholder: 'Prioridade (1-10)',
          min: 1,
          max: 10,
          value: this.getProximaPrioridade()
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Solicitar',
          handler: (data) => {
            if (data.prioridade >= 1 && data.prioridade <= 10) {
              this.criarSolicitacao(turma, parseInt(data.prioridade));
            } else {
              this.presentToast('Prioridade deve ser entre 1 e 10', 'danger');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async criarSolicitacao(turma: Turma, prioridade: number) {
    // Verificar se prioridade já existe
    const prioridadeExiste = this.solicitacoes.some(s => s.prioridade === prioridade);
    if (prioridadeExiste) {
      await this.presentToast('Esta prioridade já está sendo usada', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Criando solicitação...'
    });
    await loading.present();

    this.matriculaDataService.solicitarTurma(turma.id, prioridade, this.fase).subscribe({
      next: async (response) => {
        // Adicionar à lista local
        const solicitacao: SolicitacaoMatricula & { turma?: Turma } = {
          aluno_matricula: this.alunoMatricula,
          turma_id: turma.id,
          prioridade: prioridade,
          fase: this.fase,
          turma: turma
        };
        
        this.solicitacoes.push(solicitacao);
        this.solicitacoes.sort((a, b) => a.prioridade - b.prioridade);
        
        await this.presentToast(response.message || 'Solicitação criada!', 'success');
        await loading.dismiss();
      },
      error: async (error) => {
        console.error('Erro ao criar solicitação:', error);
        await this.presentToast('Erro ao criar solicitação', 'danger');
        await loading.dismiss();
      }
    });
  }

  async removerSolicitacao(index: number) {
    const alert = await this.alertController.create({
      header: 'Remover Solicitação',
      message: 'Tem certeza que deseja remover esta solicitação?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Remover',
          handler: () => {
            this.solicitacoes.splice(index, 1);
            this.presentToast('Solicitação removida', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  async alterarPrioridade(index: number, novaPrioridade: number) {
    if (novaPrioridade < 1 || novaPrioridade > 10) {
      await this.presentToast('Prioridade deve ser entre 1 e 10', 'danger');
      return;
    }

    // Verificar se prioridade já existe (exceto na posição atual)
    const prioridadeExiste = this.solicitacoes.some((s, i) => 
      i !== index && s.prioridade === novaPrioridade
    );
    
    if (prioridadeExiste) {
      await this.presentToast('Esta prioridade já está sendo usada', 'danger');
      return;
    }

    this.solicitacoes[index].prioridade = novaPrioridade;
    this.solicitacoes.sort((a, b) => a.prioridade - b.prioridade);
    
    await this.presentToast('Prioridade alterada', 'success');
  }

  private getProximaPrioridade(): number {
    if (this.solicitacoes.length === 0) return 1;
    
    const prioridadesUsadas = this.solicitacoes.map(s => s.prioridade).sort((a, b) => a - b);
    
    for (let i = 1; i <= 10; i++) {
      if (!prioridadesUsadas.includes(i)) {
        return i;
      }
    }
    
    return 10; // fallback
  }

  getTurmasNaoSolicitadas(): Turma[] {
    const turmasJaSolicitadas = this.solicitacoes.map(s => s.turma_id);
    return this.turmasDisponiveis.filter(t => !turmasJaSolicitadas.includes(t.id));
  }

  getHorariosString(turma: Turma): string {
    return turma.horarios.map(h => 
      `${h.dia_semana} ${h.hora_inicio}-${h.hora_fim}`
    ).join(', ');
  }

  getProfessoresString(turma: Turma): string {
    return turma.professores.map(p => p.nome).join(', ');
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  onFaseChange() {
    this.solicitacoes = []; // Clear solicitations when changing phase
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
}