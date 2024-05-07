// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-slider',
//   templateUrl: './slider.component.html',
//   styleUrls: ['./slider.component.css']
// })
// export class SliderComponent {
//   @Input()
//   title?: string;
//   @Input()
//   items?: { title: string, imageUrl: string }[];
//   currentSlide = 0;
//   transform = 'translateX(0)';

//   nextSlide() {
//     if (this.currentSlide >= this.items!.length) {
//       this.currentSlide = 0;
//       this.items!.push(this.items![0]);
//     } else {
//       this.currentSlide++;
//     }
//     this.transform = `translateX(-${this.currentSlide * (100 / this.items!.length + 13.5)}em)`;
//   }
// }
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @Input() title?: string;
  @Input() items?: { title: string, imageUrl: string }[];
  currentIndex = 0;

  get currentItems() {
    // Calcoliamo l'indice di partenza in base al currentIndex
    const startIndex = this.currentIndex % this.items!.length;
    // Restituiamo una porzione di items in base all'indice di partenza
    return [...this.items!.slice(startIndex), ...this.items!.slice(0, startIndex)];
  }

  previousSlide() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.items!.length - 1;
    }
  }

  nextSlide() {
    this.currentIndex++;
  }
}





