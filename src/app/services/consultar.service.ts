import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ConsultarService {

  environment:string = "http://localhost:8083";
  private path: string = '/users';
  usuarios: User[] = [];

  constructor(private http: HttpClient) { }

  listar2(): Observable<any> {
    let url = `${this.environment}${this.path}/find/1`;
    console.log(url);
    return this.http.get(url).pipe(
      tap((result: any) => (this.usuarios = result)),
      map((result: any) => result)
    );
  }
}
