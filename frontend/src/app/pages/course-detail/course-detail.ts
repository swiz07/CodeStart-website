import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../service/course-service/course-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.scss'],
})
export class CourseDetail implements OnInit {

  course: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Subscribe to route params changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.loadCourse(id);
    });
  }

  loadCourse(id: string) {
    this.loading = true; // show loading state on every new id
    this.courseService.getCourseById(id).subscribe({
      next: (res) => {
        this.course = Array.isArray(res) ? res[0] : res;
        this.loading = false;
        this.change.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.change.detectChanges();
      }
    });
  }
}