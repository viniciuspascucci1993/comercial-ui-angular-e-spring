import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {

  oportunidade = {};
  oportunidades = [];

  constructor(
    private oportunidadeService: OportunidadeService, private messageService: MessageService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.oportunidadeService.listar()
      .subscribe( resposta => this.oportunidades = <any> resposta);
  }

  incluirOportunidade() {
    this.oportunidadeService.incluirOportunidadeService( this.oportunidade )
      .subscribe( () => {
         this.oportunidade = {};
         this.consultar(); 

         this.messageService.add({
           severity: 'success',
           summary: 'Oportunidade incluida com sucesso'
         });
      },
      resposta => {
        let msg = "Ocorreu um erro ao tentar incluir uma oportunidade. Tente novamente"

        if (resposta.error.message) {
          msg = resposta.error.message;
        }

        this.messageService.add({
          severity: 'error',
          summary: msg
        });
      });
  }

}
