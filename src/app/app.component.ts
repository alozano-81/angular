import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ConsultarService } from 'src/app/services/consultar.service';


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

  onEdit(id:any){}

}
