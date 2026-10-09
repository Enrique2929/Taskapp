import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/angular';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Tarea } from '../Models/tarea.model';
import { TareasService } from '../Service/tareas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton
  ]
})

export class HomePage {

  tareas: Tarea[] = [];

  formulario: FormGroup;
  mostrarFormulario = false;

  constructor(
    private tareasService: TareasService,
    private fb: FormBuilder
  ) {

    this.tareas = this.tareasService.obtenerTareas();

    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: [''],
      prioridad: ['Media', Validators.required]
    });

  }

  cambiarEstado(id: number) {
    this.tareasService.cambiarEstado(id);
  }

  eliminarTarea(id: number) {
    this.tareasService.eliminarTarea(id);
    this.tareas = this.tareasService.obtenerTareas();
  }

  mostrarCrearTarea() {
    this.mostrarFormulario = true;
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;

    this.formulario.reset({
      titulo: '',
      descripcion: '',
      prioridad: 'Media'
    });
  }

  guardarTarea() {

    if (this.formulario.invalid) {
      return;
    }

    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: this.formulario.value.titulo,
      descripcion: this.formulario.value.descripcion,
      prioridad: this.formulario.value.prioridad,
      completada: false
    };

    this.tareasService.agregarTarea(nuevaTarea);

    this.tareas = this.tareasService.obtenerTareas();

    this.cancelarFormulario();
  }

}