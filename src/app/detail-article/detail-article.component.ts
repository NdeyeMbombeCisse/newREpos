// import { Component ,OnInit} from '@angular/core';
// import { ActivatedRoute,Router } from '@angular/router';
// import { ArticleService } from '../article.service';

// @Component({
//   selector: 'app-detail-article',
//   standalone: true,
//   imports: [],
//   templateUrl: './detail-article.component.html',
//   styleUrl: './detail-article.component.css'
// })
// export class DetailArticleComponent implements OnInit{
//   article: any;

//   constructor(private route: ActivatedRoute, private articleService: ArticleService,  public router: Router) { }

//   // ngOnInit(): void {
//   //   const id = +this.route.snapshot.paramMap.get('id')!;
//   //   this.articleService.getArticle(id).subscribe(data => {
//   //     this.article = data;
//   //   });
//   // }

//   ngOnInit(): void {
//     const id = +this.route.snapshot.paramMap.get('id')!;
//     this.articleService.getArticle(id).subscribe(data => {
//       this.article = data;
//     });
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Obtenir l'identifiant de l'article depuis l'URL
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    // Appeler le service pour obtenir les détails de l'article
    this.articleService.getArticle(id).subscribe(
      data => {
        this.article = data;
      },
      error => {
        console.error('Erreur lors de la récupération de l\'article', error);
      }
    );
  }

  editArticle(id: number): void {
    this.router.navigate(['']);
  }
}
