import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

/*https://www.youtube.com/watch?v=kmM6mqvnxcs*/
@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  @ViewChild('text') text!: ElementRef;
  @ViewChild('book') book!: ElementRef;
  @ViewChild('parallax') parallax!: ElementRef;

  @HostListener('window:scroll', [])
  onScroll() {
    const value = Math.min(window.scrollY, window.innerHeight);

    this.book.nativeElement.style.transform =
      `translate(-50%, -50%) translateX(${-value * 2.9}px)`;

    this.text.nativeElement.style.transform =
      `translate(-50%, ${value * 2.5}px)`;
  }
}



