import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importer CommonModule ici
import { ListArticleComponent } from './list-article/list-article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AddArticleComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JSONPLACEHOLDER';
}
