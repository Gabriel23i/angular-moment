import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment/moment.service';

import { IMoment } from 'src/app/interfaces/Moment';

import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allMoments: IMoment[] = []; //referência
  public moments: IMoment[] = []; // Exibido em tela
  public baseApiUrl = environment.baseApiUrl;
  public faSearch = faSearch;
  public searchTerm: string = '';

  constructor(private momentService: MomentService){}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item)=>{
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(e: Event): void {

    // Para recuperar o valor do input é feito dessa maneira porque o TS não permite que a gente pegue direto
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment)=>{ // como tem as chaves tem que declarar o return, sem elas o return é implícito
      return moment.title.toLowerCase().includes(value.toLowerCase());
    });
  }
}
