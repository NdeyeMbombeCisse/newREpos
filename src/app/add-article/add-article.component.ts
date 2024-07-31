
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ArticleService } from '../article.service';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-add-article',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule ],
//   templateUrl: './add-article.component.html',
//   styleUrls: ['./add-article.component.css']  // Correction ici
// })
// export class AddArticleComponent implements OnInit {
//   articleForm: FormGroup;
//   isEditMode = false;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private articleService: ArticleService
//   ) {
//     this.articleForm = this.fb.group({
//       title: ['', Validators.required],
//       body: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.isEditMode = true;
//       this.articleService.getArticle(+id).subscribe(data => {
//         this.articleForm.patchValue(data);
//       });
//     }
//   }

//   onSubmit(): void {
//     if (this.isEditMode) {
//       this.articleService.updateArticle(this.route.snapshot.params['id'], this.articleForm.value)
//         .subscribe(() => this.router.navigate(['/']));
//     } else {
//       this.articleService.createArticle(this.articleForm.value)
//         .subscribe(() => this.router.navigate(['/']));
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  isEditMode = false;
  articleId?: number;

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
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
    if (this.articleId) {
      this.isEditMode = true;
      this.articleService.getArticle(this.articleId).subscribe(data => {
        this.articleForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      return; // Si le formulaire est invalide, ne pas soumettre
    }

    if (this.isEditMode && this.articleId) {
      this.articleService.updateArticle(this.articleId, this.articleForm.value)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.articleService.createArticle(this.articleForm.value)
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
