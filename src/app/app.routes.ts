import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importer CommonModule ici
import { ListArticleComponent } from './list-article/list-article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';


ListArticleComponent
export const routes: Routes = [
    {path:'',component:ListArticleComponent},
    { path: 'article/new', component: AddArticleComponent  },
    { path: 'article/:id', component: DetailArticleComponent},
    { path: 'article/edit/:id', component: ListArticleComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes),CommonModule],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
