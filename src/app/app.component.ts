import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ConsultarService } from 'src/app/services/consultar.service';
import { FormsModule } from '@angular/forms';
import { noop } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebas';

  users: User[] = [];
  size: number = 10;
  search: string = 'null';
  pages: number[] = [];
  page: number = 1;
  totalElements: number = 0;
  items: any[] = [];
  nombreBuscar:string = "";
  id:number;
  nombreu:string = "";
  rol:any;
  activo:any;
  si:any;
  no:any;

  constructor(
    private service: ConsultarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers2();
    /* this.paginationService.paginationEvent.subscribe((page) => {
      this.page = page;
      this.getUsers();
    });
    this.searchService.searchiEvent.subscribe((search) => {
      this.search = search;
      if (!search) {
        this.search = 'null';
      }
      this.getUsers();
    }); */

  }


  getUsers2() {
    this.users = [];
    this.service.listar2().subscribe((list) => {
      this.users = list;
    });
  }

  onCreate(){
    alert("Crear usuario");
  }

  onEdit(id:any,nombre:any,rolid:any,activo:any){
    this.id = id;
    this.nombreu = nombre;
    //this.si = rolid;
    this.si = activo;
  }

  consultar(nombre:string){
    alert(nombre);
    if(nombre != ''){
      this.users = [];
      this.service.consultarPorNombre(nombre).subscribe((list) => {
      this.users = list;
    });
    }else{
      this.getUsers2();
    }

  }

  limpiar(){
    this.nombreBuscar="";
  }


  guardar(id:any,nom:string,rol:any,sii:any,noo:any){

    alert("ee: " +id+ " -- " +this.si+"--"+sii+ " -- " + this.nombreu + "" + nom);
    this.service.insertarUsuario(1,this.nombreu,2,sii).subscribe((data) => {
      this.getUsers2();
    });

    this.nombreu = "";

  }

  actualizar(id:any,nom:string,rol:any,sii:any,activo:any){
    alert("update: " +id+ " -- " +this.si+"--"+sii+ " -- " + this.nombreu + "-activo: -" + activo);
    this.service.actualizarUsuario(id,this.nombreu,sii,2).subscribe((data) => {
      this.getUsers2();
    });
    this.nombreu = "";
  }


  eliminar(id:any){
    alert("update: " +id);
    this.service.eliminarUsuario(id).subscribe((data) => {
      this.getUsers2();
    });
    this.nombreu = "";
  }

}
