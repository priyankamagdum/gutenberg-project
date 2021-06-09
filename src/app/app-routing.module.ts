import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GutenbercBookListComponent } from './components/gutenberc-book-list/gutenberc-book-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'book-list', component: GutenbercBookListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
