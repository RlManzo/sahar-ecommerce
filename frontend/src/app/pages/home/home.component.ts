import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoModal } from '../../components/producto-modal/producto-modal';
import { FooterComponent } from '../../components/footer/footer.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ProductosPreview } from '../../components/productos/productos-preview';
import { CategoriasComponent } from '../../components/categorias-productos/categorias.component';
import { HomeBeneficiosComponent } from '../../components/beneficios/home-beneficios.component';
import { NuevosIngresosComponent } from '../../components/nuevos-ingresos/nuevos-ingresos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ProductoModal,
    FooterComponent,
    FaqComponent,
    ProductosPreview,
    CategoriasComponent,
    HomeBeneficiosComponent,
    NuevosIngresosComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
