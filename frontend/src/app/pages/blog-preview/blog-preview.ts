import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../service/blog-service/blog-service';

@Component({
  selector: 'app-blog-preview',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-preview.html',
  styleUrl: './blog-preview.scss',
})
export class BlogPreview implements OnInit{
 //stores list of all blogs
  blogs:any []=[];
  loading=true;
  constructor(private blogService:BlogService,  private change: ChangeDetectorRef){
    
  }


  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (res) => {
        this.blogs = res; 
        console.log(res);
        this.loading = false;
        this.change.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching blogs', err);
        this.loading = false;
        this.change.detectChanges();
      }
    });
  }
}
