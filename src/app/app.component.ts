import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = "list";
  public notification: string = "";
  public todos: Todo[] = [];
  public title: string = "Minhas Tarefas";
  public form: FormGroup;
  public idAtual: number = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  showNotification() {
    this.notification = "Tarefa adicionada com sucesso!";
    setTimeout(() => {
      this.notification = "";
    }, 1500)
    
  }

  add() {
    this.idAtual += 1;
    const title = this.form.controls['title'].value;
    this.todos.push(new Todo(title, false, this.idAtual));
    this.save();
    this.showNotification();
  }

  clear() {
    this.form.reset()
  }

  remove(tarefa: Todo) {
    const index = this.todos.indexOf(tarefa);
    if (index !== -1) {
      this.todos.splice(index, 1); // indice, quantidade de itens que queremos deletar
    }
    this.save();
  }

  markAsDone(tarefa: Todo) {
    tarefa.done = true;
    this.save();
  }

  markAsUndone(tarefa: Todo) {
    tarefa.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(newMode: string){
    this.mode = newMode;
    if (this.mode == 'add') {
      this.title = "Nova Tarefa";
    } else {
      this.title = "Minhas Tarefas"
    }
  }
}
