import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../service/blog-service/blog-service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.scss'],
})
export class BlogDetail implements OnInit {
  blog: any = null;
  loading = true;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private change: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id) return [];
          this.loading = true;
          this.blog = null;
          return this.blogService.getBlogById(id);
        })
      )
      .subscribe({
        next: (res) => {
          this.blog = res;
          this.loading = false;

          // Force Angular to update template immediately
          this.change.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching blog:', err);
          this.loading = false;
          this.change.detectChanges();
        }
      });
  }
}