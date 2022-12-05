import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMoment } from './../../interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<IMoment>(); // O que é mandado para fora do component

  @Input() btnText!: string; // O que é recebido no component

  momentForm!: FormGroup;

  constructor(){}

  //declaro todos os campos que vai ter no formulário
  ngOnInit(): void{
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')
    });
  }

  // A "!" nos geters é para informar ao Angular que os valores vão existir
  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }

  submit(){
    if(this.momentForm.invalid){
      return;
    }
    console.log('Enviou!', this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value);
  }
}
