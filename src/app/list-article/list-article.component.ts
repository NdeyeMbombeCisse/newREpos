
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  articles: any[] = [];

  constructor(private articleService: ArticleService, public router: Router) {
    this.router = router;
   }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/article', id]);
  }

  editArticle(id: number): void {
    this.router.navigate(['/article/edit', id]);
  }

  deleteArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== id);
    });
  }
}
