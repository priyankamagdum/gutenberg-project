import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookServiceService, private route: Router) { }

  genreArray = [
    {label: 'Fiction', value: 'fiction'},
    {label: 'Drama', value: 'drama'},
    {label: 'Humour', value: 'humour'},
    {label: 'Politics', value: 'politics'},
    {label: 'Philosophy', value: 'philosophy'},
    {label: 'History', value: 'history'},
    {label: 'Adventure', value: 'adventure'}]

  ngOnInit(): void {
  }

  /***
   * Call when genre card clicked
   */
  public getBooks(bookValue: any) {
    localStorage.setItem('bookGenre', bookValue);
    this.route.navigate(['/book-list']);
  }

}
