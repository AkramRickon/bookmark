import { Bookmark } from './../interfaces/bookmark';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private http: HttpClient) { }

  baseUrl = " http://localhost:3000";
  updatedBookmarkList: Bookmark[] = [];

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }

  getBookmark(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(`${this.baseUrl}/bookmark`)
  }

  addCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/category`, data);
  }

  addBookmark(data: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.baseUrl}/bookmark`, data);
  }

  setUpdatedBookmark(data:Bookmark[]){
    this.updatedBookmarkList=data;
  }
  
   getUpdatedBookmarkList(){
    return this.updatedBookmarkList;
  }
  
}
