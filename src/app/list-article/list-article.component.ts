// import { Component, OnInit } from '@angular/core';
// import { ArticleService } from '../article.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-list-article',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './list-article.component.html',
//   styleUrls: ['./list-article.component.css']
// })
// export class ListArticleComponent implements OnInit {
//   articles: any[] = [];
//   articleForm: FormGroup;
//   isEditMode = false;
//   currentArticleId: number | null = null;

//   constructor(
//     public fb: FormBuilder,
//     public route: ActivatedRoute,
//     public router: Router,
//     public articleService: ArticleService
//   ) {
//     this.articleForm = this.fb.group({
//       title: ['', Validators.required],
//       body: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadArticles();
//     this.route.params.subscribe(params => {
//       const id = params['id'];
//       if (id) {
//         this.isEditMode = true;
//         this.currentArticleId = +id;
//         this.articleService.getArticle(this.currentArticleId).subscribe(
//           data => {
//             this.articleForm.patchValue(data);
//           },
//           error => {
//             console.error('Error fetching article:', error);
//           }
//         );
//       }
//     });
//   }

//   loadArticles(): void {
//     this.articleService.getArticles().subscribe(
//       data => {
//         this.articles = data;
//         console.log('Articles loaded:', this.articles);
//       },
//       error => {
//         console.error('Error loading articles:', error);
//       }
//     );
//   }

//   viewDetails(id: number): void {
//     this.router.navigate(['/article', id]);
//   }

//   editArticle(id: number): void {
//     this.router.navigate(['/article/edit', id]);
//   }

//   deleteArticle(id: number): void {
//     this.articleService.deleteArticle(id).subscribe(
//       () => {
//         this.articles = this.articles.filter(article => article.id !== id);
//         console.log('Article deleted:', id);
//       },
//       error => {
//         console.error('Error deleting article:', error);
//       }
//     );
//   }

//   onSubmit(): void {
//     if (this.isEditMode && this.currentArticleId !== null) {
//       this.articleService.updateArticle(this.currentArticleId, this.articleForm.value).subscribe(
//         () => {
//           this.loadArticles();
//           this.resetForm();
//         },
//         error => {
//           console.error('Error updating article:', error);
//         }
//       );
//     } else {
//       this.articleService.createArticle(this.articleForm.value).subscribe(
//         (newArticle) => {
//           this.articles.unshift(newArticle);
//           this.resetForm();
//         },
//         error => {
//           console.error('Error creating article:', error);
//         }
//       );
//     }
//   }

//   resetForm(): void {
//     this.articleForm.reset();
//     this.isEditMode = false;
//     this.currentArticleId = null;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  articles: any[] = [];
  articleForm: FormGroup;
  isEditMode = false;
  currentArticleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private articleService: ArticleService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadArticles();
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.currentArticleId = +id;
        this.loadArticleForEdit(this.currentArticleId);
      }
    });
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.error('Error loading articles:', error);
      }
    );
  }

  loadArticleForEdit(id: number): void {
    this.articleService.getArticle(id).subscribe(
      data => {
        this.articleForm.patchValue(data);
      },
      error => {
        console.error('Error fetching article:', error);
      }
    );
  }


  viewDetails(id: number): void {
        this.router.navigate(['/article', id]);
      }

  deleteArticle(id: number): void {
        this.articleService.deleteArticle(id).subscribe(
          () => {
            this.articles = this.articles.filter(article => article.id !== id);
            console.log('Article deleted:', id);
          },
          error => {
            console.error('Error deleting article:', error);
          }
        );
      }

  onSubmit(): void {
    if (this.isEditMode && this.currentArticleId !== null) {
      this.articleService.updateArticle(this.currentArticleId, this.articleForm.value).subscribe(
        () => {
          this.loadArticles();
          this.resetForm();
          this.router.navigate(['/']); // Navigate back to the home page
        },
        error => {
          console.error('Error updating article:', error);
        }
      );
    } else {
      this.articleService.createArticle(this.articleForm.value).subscribe(
        newArticle => {
          this.articles.unshift(newArticle);
          this.resetForm();
        },
        error => {
          console.error('Error creating article:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.articleForm.reset();
    this.isEditMode = false;
    this.currentArticleId = null;
  }
}
