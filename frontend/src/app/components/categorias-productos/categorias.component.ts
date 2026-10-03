import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsCategory } from '../../shared/products-filter-state.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent {
  private readonly router = inject(Router);

  goToProductsRoute(category: ProductsCategory = 'all') {
    this.router.navigate(['/productos'], {
      queryParams: { cat: category === 'all' ? null : category },
    }).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}
