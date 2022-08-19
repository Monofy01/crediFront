import { Component } from '@angular/core';
import {Persona} from "./persona";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crediFront';

  public onOpenModal(persona: Persona, mode: string) {
    const container = document.getElementById('persona-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonaModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
