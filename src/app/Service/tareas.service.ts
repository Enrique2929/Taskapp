import { Injectable } from '@angular/core';
import { Tarea } from '../Models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tareas: Tarea[] = [];

  constructor() {
    this.cargarTareas();
  }

  obtenerTareas(): Tarea[] {
    return this.tareas;
  }

  agregarTarea(tarea: Tarea): void {
    this.tareas.push(tarea);
    this.guardarTareas();
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    this.guardarTareas();
  }

  cambiarEstado(id: number): void {
    const tarea = this.tareas.find(tarea => tarea.id === id);

    if (tarea) {
      tarea.completada = !tarea.completada;
      this.guardarTareas();
    }
  }

  private guardarTareas(): void {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  private cargarTareas(): void {
    const tareasGuardadas = localStorage.getItem('tareas');

    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
  }
}