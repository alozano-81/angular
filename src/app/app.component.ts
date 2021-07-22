import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ConsultarService } from 'src/app/services/consultar.service';
import { FormsModule } from '@angular/forms';
import { noop } from '@angular/compiler/src/render3/view/util';
import { Rol } from './models/rol.models';
import { $ } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebas';

  users: User[] = [];
  roles: Rol[] = [];
  rolselect:string = "";

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
    this.obtenerRoles();

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
    this.rolselect = rolid;
    if(activo == 1){
      this.si = 1;
    }else{
      this.si = 2;
    }

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
    this.nombreu = "";
    this.rolselect = "";
    this.si = "";
    this.no = "";
    this.id = null;
    this.getUsers2();
  }


  guardar(id:any,nom:string,rol:any,sii:any,noo:any){

    alert("ee: " + sii);
    this.service.insertarUsuario(1,this.nombreu,rol,sii).subscribe((data) => {
      this.getUsers2();
      this.nombreu = "";
    },
    (data) =>{
      window.location.reload();
    },
    );

  }

  actualizar(id:any,nom:string,rol:any,sii:any,activo:any){
    alert("update: " +id+ " -- " +this.si+"--"+sii+ " -- " + this.nombreu + " rol:  " + rol);
    if(sii != undefined){
      this.service.actualizarUsuario(id,this.nombreu,rol,sii).subscribe((data) => {
        this.getUsers2();
      },
      (data) =>{
        window.location.reload();
      },);
      this.nombreu = "";
    }
  }


  eliminar(id:any){

    if(confirm("Está seguro querer eliminar este regitro?")){
      this.service.eliminarUsuario(id).subscribe((data) => {
        this.getUsers2();
      },
      (data) =>{
        window.location.reload();
      },);
      this.nombreu = "";
    }

  }

  obtenerRoles(){
    this.service.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  findName(nombreBuscar:string){
    this.nombreBuscar = nombreBuscar;
  }

}
