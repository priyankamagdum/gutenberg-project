import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-gutenberc-book-list',
  templateUrl: './gutenberc-book-list.component.html',
  styleUrls: ['./gutenberc-book-list.component.scss']
})
export class GutenbercBookListComponent implements OnInit {

  constructor(private route: Router, private bookService: BookServiceService) { }

  public placeholder = 'Search';
  public genre = '';
  public bookModel:any = [];
  public authorName:string = '';
  public imageName:string = '';
  public imagePath:string = '';
  public inputValue = '';
  public scrollArray:any = [];
  isLoading = false;
  isError = false;
  errorMessage = '';

  ngOnInit(): void {
    let bookgenre = localStorage.getItem('bookGenre');
    if (bookgenre) {
      this.genre = bookgenre;
    }
    this.getBooks(this.genre);
  }

  /** Method called when scrolled down */
  onScrollDown() {
    this.bookService.getNextPagination(this.scrollArray['next'], this.genre)
    .subscribe(
      (res) => {
        this.scrollArray = res;
        res.results.forEach((data) => {
          let authors:any = data['authors'];
          this.authorName = this.getAuthors(authors);
          let formats = data['formats'];
          this.imageName = formats['image/jpeg'];
          this.imagePath = this.getFormats(formats);
          this.bookModel.push({title: data['title'], author: this.authorName, imageName: this.imageName,
            imagePath: this.imagePath})
        })
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error;
      }
    );
  }

  /** Method called when scrolled up */
  onScrollUp() {
    this.bookService.getPrevPagination(this.scrollArray['previous'], this.genre)
    .subscribe(
      (res) => {
        this.scrollArray = res;
        res.results.forEach((data) => {
          let authors:any = data['authors'];
          this.authorName = this.getAuthors(authors);
          let formats = data['formats'];
          this.imageName = formats['image/jpeg'];
          this.imagePath = this.getFormats(formats);
          this.bookModel.push({title: data['title'], author: this.authorName, imageName: this.imageName,
            imagePath: this.imagePath})
        })
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error;
      }
    );
  }

  /** Method called to get author name of book */
  public getAuthors(authors: any) {
    if (authors.length != 0) {
      let author:any = authors[0]['name'];
      // author == 'Anonymous' ? author = authors[1]['name'] : author = authors[0]['name'];
      let name:any = author.split(',');
      if (name.length > 1) {
        this.authorName = name[1]+' '+name[0]
      } else {
        this.authorName =name[0]
      }
    }
    return this.authorName;
  }

  /** Method called to get formats of book */
  public getFormats(formats: any) {
    switch (formats) {
      case formats['text/html; charset=utf-8']:
        this.imagePath = formats['text/html; charset=utf-8'];
        break;
      case formats['text/html; charset=iso-8859-1']:
        this.imagePath = formats['text/html; charset=iso-8859-1'];
        break;
      case formats['application/pdf']:
        this.imagePath = formats['application/pdf'];
        break;
      case formats['text/plain; charset=utf-8']:
        this.imagePath = formats['text/plain; charset=utf-8'];
        break;
      case formats['text/plain; charset=iso-8859-1']:
        this.imagePath = formats['text/html; charset=iso-8859-1'];
        break;
      default:
        this.imagePath = '';

    }
    return this.imagePath
  }

  /** Method to call book list of selected genre/category */
  public getBooks(bookValue: any) {
    this.isLoading = true;
    this.bookService.filterBooksFromGenre(bookValue)
    .subscribe(
      (res) => {
        this.scrollArray = res;
        res.results.forEach((data) => {
          let authors:any = data['authors'];
          this.authorName = this.getAuthors(authors);
          let formats = data['formats'];
          this.imageName = formats['image/jpeg'];
          this.imagePath = this.getFormats(formats);
          this.bookModel.push({title: data['title'], author: this.authorName, imageName: this.imageName,
            imagePath: this.imagePath})
        })
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error;
      }
    );
  }
  /** Method to search book for entered keyword :
   *  Method called on enter as well as search icon clicked */
  public onEnter(value: any) {
    this.isLoading = true;
    let keyword = value;
    console.log(value);
    keyword ? keyword = value : keyword = value.value;
    this.bookModel = [];
    this.bookService.searchBooks(keyword, this.genre)
    .subscribe(
      (res) => {
        this.scrollArray = res;
        res.results.forEach((data) => {
          let authors:any = data['authors'];
          this.authorName = this.getAuthors(authors);
          let formats = data['formats'];
          this.imageName = formats['image/jpeg'];
          this.imagePath = this.getFormats(formats);
          this.bookModel.push({title: data['title'], author: this.authorName, imageName: this.imageName,
            imagePath: this.imagePath})
        })
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = error;
      }
    );
  }
  /** Method called when cover of book clicked */
  public goToImage(imageValue: any) {
    imageValue == '' ? alert('No viewable version avaliable') : window.location = imageValue;
  }
  public backtoHome() {
    this.route.navigate(['']);
  }
  public onFocus() {
    this.placeholder = '';
  }
  public clearField() {
    this.inputValue = '';
    this.bookModel = [];
    this.isError = false;
    this.errorMessage = '';
    this.getBooks(this.genre);
  }
  public onKeyUp(event: any) {
    this.inputValue = event.target.value;
  }
}
