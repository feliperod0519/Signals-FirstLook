import { NgFor } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(()=>this.counter() * 2);

  constructor(){
    effect(()=>console.log(this.counter()));
  }

  increment() {
    this.counter.update((oldCounter)=>{ return oldCounter + 1 });
    this.counter.set(this.counter() + 1);
    this.actions.mutate((oldActions)=>oldActions.push('INCREMENT by 2')); //push('INCREMENT by 2');
  }

  decrement() {
    this.counter.update((oldCounter)=>{ return oldCounter - 1 });;
    this.counter.set(this.counter() - 1);
    this.actions.update((oldActions)=>[...oldActions, 'DECREMENT by 2']); //this.actions.push('DECREMENT by 2');
  }
}
