import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  submenuVisibility: { [key: string]: boolean } = {
    "inEvidenza": false,
    "uomo": false,
    "donna": false,
    "kids": false
  };

  timer: any;
  query?: string;
  categorie: string[] = [];
  newArrival: boolean = true;
  products?: IProduct[];
  bestSellerGte?: number;
  bestSellerLte?: number;


  constructor(
    private fs: FiltersService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.fs.getCategorie()
      .subscribe({
        next: cat => {
          this.categorie = cat;
        },
        error: err => {
          console.error('Si è verificato un errore durante il recupero delle categorie', err);
        }
      });

  }
  menuItemMouseEnter(menu: string) {
    this.resetSubmenuVisibility();
    this.submenuVisibility[menu] = true;
  }

  menuItemMouseLeave() {
    this.resetSubmenuVisibility();
  }

  subMenuMouseLeave(menu: string) {
    this.delayHideSubMenu(menu);
  }

  delayHideSubMenu(menu: string) {
    this.timer = setTimeout(() => {
      this.submenuVisibility[menu] = false;
    }, 200);
  }

  onChange(): void {
    // console.log('Ricerca attivata con query:', this.query);
    if (this.query?.trim() !== '') {
      this.fs.setQuery(this.query!);
      this.router.navigateByUrl('/list');

    } else {
      this.fs.setQuery('');
    }
  }

  private resetSubmenuVisibility() {
    for (const key in this.submenuVisibility) {
      if (Object.prototype.hasOwnProperty.call(this.submenuVisibility, key)) {
        this.submenuVisibility[key] = false;
      }
    }
  }
}
