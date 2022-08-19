import { Component, OnInit } from '@angular/core';
import {Persona} from "../persona";
import {PersonaService} from "../persona.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  public personas: Persona[];
  public editPersona: Persona;
  public deletePersona: Persona;
  public statusList: string[] = ['Active', 'Inactive']
  public selectedData = 'Inactive'



  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getAllPersonas();
  }

  public getAllPersonas(): void {
    this.personaService.getAllPersonas().subscribe(
      (response: Persona[]) => {
        console.log(response)
        this.personas = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddPersona(addForm: NgForm): void {
    document.getElementById('add-persona-form')!.click();
    this.personaService.addPersona(addForm.value).subscribe(
      (response: Persona) => {
        this.getAllPersonas();
        addForm.reset();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onOpenModalPersona(persona: Persona, mode: string) {

    const container = document.getElementById('persona-container');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.selectedData = 'Inactive'
    if (mode === 'edit') {
      this.editPersona = persona
      if (this.editPersona.activo) {
        this.selectedData = 'Active'
      }
      button.setAttribute('data-target', '#updatePersonaModal');
    }
    if (mode === 'delete') {
      this.deletePersona = persona;
      button.setAttribute('data-target', '#deletePersonaModal');
    }
    container!.appendChild(button);
    button.click();
  }

  public onUpdatePersona(persona: Persona): void {
    persona.activo = <unknown>persona.activo == 'Active';
    this.personaService.updatePersona(persona).subscribe((response: Persona) => {
      this.getAllPersonas();
    }, (error: HttpErrorResponse) => {
      alert('Update error' + error.message);
    })
  }
  public onDeletePersona(personaId: number): void {
    this.personaService.deletePersona(personaId).subscribe(
      (response: string) => {
        console.log('response');
        this.getAllPersonas();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


}
