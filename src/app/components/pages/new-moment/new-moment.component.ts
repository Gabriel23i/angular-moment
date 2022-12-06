import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MomentService } from './../../../services/moment/moment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

import { IMoment } from './../../../interfaces/Moment';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  public btnText:string = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ){} // Ser private é um dos requisitos para se utilizar ele aqui

  ngOnInit(): void {

  }

  async createHandler(moment: IMoment){
    // Tem duas formas comuns de trabalhar com form: Formato JSON & FORM DATA(Já incluso no JS)
    console.log('Deu boa!');

    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image){
      formData.append('image', moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add('Momento adicionado com sucesso!');

    //this.router.navigate(['/']);
    this.router.navigateByUrl('/'); // método de navegação simplificado
  }
}
