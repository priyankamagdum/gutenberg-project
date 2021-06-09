import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod'
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }

  public apiUrl = environment.BASE_URL+'books';

  /** service call for getting books */
  filterBooksFromGenre(keyword: string): Observable<Book> {
    return this.http
    .get<Book>(this.apiUrl + '?topic=' + keyword + '&mime_type=image%2Fjpeg')
    .pipe(
      map((data) => {
        let result = data;
        if (!result) {
          throw new Error("Something went wrong")
        }
        return result;
      })
    )
  }

  searchBooks(keyword: any, genre: any): Observable<Book> {
    return this.http
    .get<Book>(this.apiUrl + '?search=' + keyword + '&mime_type=image%2Fjpeg&topic=' + genre)
    .pipe(
      map((data) => {
        let result = data;
        if (!result) {
          throw new Error("Something went wrong")
        }
        return result;
      })
    )
  }

  /** service call for next and previous pagination */
  getNextPagination(next: any, keyword: any): Observable<Book> {
    next == null ? next = this.apiUrl + '?topic=' + keyword + '&mime_type=image%2Fjpeg' : 
    next = next;
    return this.http
    .get<Book>(next)
    .pipe(
      map((data) => {
        let result = data;
        if (!result) {
          throw new Error("Something went wrong")
        }
        return result;
      })
    )
  }

  getPrevPagination(previous: any, keyword: any): Observable<Book> {
    previous == null ? previous = this.apiUrl + '?topic=' + keyword + '&mime_type=image%2Fjpeg' : 
      previous = previous;
    return this.http
    .get<Book>(previous)
    .pipe(
      map((data) => {
        let result = data;
        if (!result) {
          throw new Error("Something went wrong")
        }
        return result;
      })
    )
  }

}
