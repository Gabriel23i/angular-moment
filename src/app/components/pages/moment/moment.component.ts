import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MomentService } from 'src/app/services/moment/moment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { CommentService } from 'src/app/services/comment/comment.service';

import { environment } from 'src/environments/environment';

import { IMoment } from 'src/app/interfaces/Moment';
import { IComment } from 'src/app/interfaces/Comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  public moment?: IMoment;
  public baseApiUrl = environment.baseApiUrl;
  public faTimes = faTimes;
  public faEdit = faEdit;

  public commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe(
      (item) => (this.moment = item.data)
    );

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    if(id){
      await this.momentService.removeMoment(id).subscribe();

      this.messagesService.add('Momento excluído com sucesso!');

      this.router.navigate(['/']);
    }
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){
      return;
    }

    const data: IComment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe(
      (comment)=> this.moment!.comments!.push(comment.data)
    );

    this.messagesService.add('Comentário adicionado!');

    //reset do formulário com os dois abaixo
    this.commentForm.reset(); // limpa do front(no visual para usuário).
    formDirective.resetForm(); // limpa do model, que pega os dados do "commentForm" e insere.
  }
}
