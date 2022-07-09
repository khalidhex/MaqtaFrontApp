import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<any>("https://localhost:7085/api/employees")
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getEmployee(id: number) {
    return this.http.get<any>("https://localhost:7085/api/employees/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  postEmployee(data: any) {
    return this.http.post<any>("https://localhost:7085/api/employees", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateEmployee(data: any, id: number) {
    return this.http.put<any>("https://localhost:7085/api/employees/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>("https://localhost:7085/api/employees/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
