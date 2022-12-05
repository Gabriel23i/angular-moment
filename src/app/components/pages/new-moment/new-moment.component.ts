import { Component, OnInit } from '@angular/core';
import { IMoment } from './../../../interfaces/Moment';
import { MomentService } from './../../../services/moment/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  public btnText:string = 'Compartilhar!';

  constructor(private momentService: MomentService){} // Ser private é um dos requisitos para se utilizar ele aqui

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

    /* TODO */

    await this.momentService.createMoment(formData).subscribe();

    // Exibir mensagem

    // Redirect
  }
}
