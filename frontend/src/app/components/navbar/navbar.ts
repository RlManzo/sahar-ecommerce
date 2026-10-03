import {
  Component,
  HostListener,
  OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Header } from '../header/header';

import { ShopStore } from '../../shared/store/shop.store';
import { AuthService } from '../../shared/auth/auth.service';

import {
  ProductsCategory,
} from '../../shared/products-filter-state.service';

type ProductsBrand =
  | 'all'
  | 'Lattafa'
  | 'Afnan'
  | 'Armaf'
  | 'Al Haramain'
  | 'Al Wataniah'
  | 'Bharara'
  | 'French Avenue'
  | 'Maison Alhambra'
  | 'Rasasi'
  | 'Zimaya'
  | "Victoria's Secret";

type DropdownType =
  | 'perfumes'
  | 'insumos'
  | 'cuidado'
  | null;

interface MenuItem {
  label: string;
  category: ProductsCategory;
}

interface MegaMenuColumn {
  title: string;
  category: ProductsCategory;
  items: MenuItem[];
  viewAllLabel?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    Header,
  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnDestroy {

  readonly store = inject(ShopStore);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private dropdownCloseTimer:
    ReturnType<typeof setTimeout> | null = null;

  readonly menuOpen = signal(false);
  readonly userMenuOpen = signal(false);
  readonly productsOpen = signal(false);
  readonly adminOpen = signal(false);
  readonly libraryOpen = signal(false);

  readonly activeDropdown =
    signal<DropdownType>(null);

  readonly isDesktop = signal(
    window.innerWidth > 768
  );

  readonly isLogged = this.auth.isLogged;
  readonly email = this.auth.email;
  readonly isAdmin = this.auth.isAdmin;
  readonly isOperador = this.auth.isOperador;

  readonly isAdminOrOperador = computed(
    () =>
      this.isAdmin()
      ||
      this.isOperador()
  );

  readonly isOnlyOperador = computed(
    () =>
      this.isOperador()
      &&
      !this.isAdmin()
  );

  readonly libraryBrands: ProductsBrand[] = [
    'Lattafa',
    'Afnan',
    'Armaf',
    'Al Haramain',
    'Al Wataniah',
    'Bharara',
    'French Avenue',
    'Maison Alhambra',
    'Rasasi',
    'Zimaya',
    "Victoria's Secret",
  ];

  readonly megaMenuColumns:
    MegaMenuColumn[] = [
      {
        title: 'Perfumes',
        category: 'perfumes',
        items: [
          {
            label: 'Perfumes originales',
            category: 'perfumes',
          },
          {
            label: 'Body Splash',
            category: 'cuidado',
          },
        ],
        viewAllLabel: 'Ver todos',
      },
      {
        title: 'Decants & frascos',
        category: 'decants',
        items: [
          {
            label: 'Básicos',
            category: 'decants',
          },
          {
            label: 'Recargables',
            category: 'decants',
          },
          {
            label: 'Metalizados',
            category: 'decants',
          },
          {
            label: 'Línea Color',
            category: 'decants',
          },
          {
            label: 'Línea Gold',
            category: 'decants',
          },
        ],
        viewAllLabel: 'Ver todos',
      },
      {
        title: 'Accesorios',
        category: 'accesorios',
        items: [
          {
            label: 'Packagings',
            category: 'accesorios',
          },
          {
            label: 'Llaveros',
            category: 'accesorios',
          },
          {
            label: 'Extractores',
            category: 'accesorios',
          },
          {
            label: 'Exhibidores',
            category: 'accesorios',
          },
        ],
        viewAllLabel: 'Ver todos',
      },
      {
        title: 'Cuidado personal',
        category: 'cuidado',
        items: [
          {
            label: 'Body Splash',
            category: 'cuidado',
          },
          {
            label: 'Cuidado capilar',
            category: 'cuidado',
          },
          {
            label: 'Desodorantes',
            category: 'cuidado',
          },
        ],
        viewAllLabel: 'Ver todos',
      },
      {
        title: 'Embalaje',
        category: 'embalaje',
        items: [
          {
            label: 'Material de embalaje',
            category: 'embalaje',
          },
        ],
        viewAllLabel: 'Ver todos',
      },
    ];

  readonly perfumesMenu: MenuItem[] = [
    {
      label: 'Todos los perfumes',
      category: 'perfumes',
    },
    {
      label: 'Originales',
      category: 'perfumes',
    },
    {
      label: 'Body Splash',
      category: 'cuidado',
    },
  ];

  readonly insumosMenu: MenuItem[] = [
    {
      label: 'Decants & frascos',
      category: 'decants',
    },
    {
      label: 'Accesorios',
      category: 'accesorios',
    },
    {
      label: 'Embalaje',
      category: 'embalaje',
    },
  ];

  readonly cuidadoMenu: MenuItem[] = [
    {
      label: 'Body Splash',
      category: 'cuidado',
    },
    {
      label: 'Cuidado capilar',
      category: 'cuidado',
    },
    {
      label: 'Desodorantes',
      category: 'cuidado',
    },
  ];

  ngOnDestroy(): void {
    this.cancelDropdownClose();

    document.body.style.removeProperty(
      'overflow'
    );
  }

  toggleMenu(
    event?: Event
  ): void {

    event?.stopPropagation();

    const nextValue =
      !this.menuOpen();

    this.menuOpen.set(nextValue);

    if (nextValue) {
      this.userMenuOpen.set(false);
      this.productsOpen.set(false);
      this.activeDropdown.set(null);

      document.body.style.overflow =
        'hidden';

      return;
    }

    this.closeMobileMenuState();
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.closeMobileMenuState();
  }

  private closeMobileMenuState(): void {
    this.productsOpen.set(false);
    this.adminOpen.set(false);
    this.libraryOpen.set(false);
    this.activeDropdown.set(null);

    document.body.style.removeProperty(
      'overflow'
    );
  }

  closeAllMenus(): void {
    this.cancelDropdownClose();

    this.productsOpen.set(false);
    this.adminOpen.set(false);
    this.userMenuOpen.set(false);
    this.menuOpen.set(false);
    this.libraryOpen.set(false);
    this.activeDropdown.set(null);

    document.body.style.removeProperty(
      'overflow'
    );
  }

  openCart(): void {
    this.closeAllMenus();
    this.store.openCart();
  }

  toggleUserMenu(
    event?: Event
  ): void {

    event?.stopPropagation();

    this.productsOpen.set(false);
    this.activeDropdown.set(null);

    this.userMenuOpen.update(
      value => !value
    );
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.auth.logout();

    this.closeAllMenus();

    this.router.navigateByUrl('/');
  }

  goProfile(): void {
    this.closeAllMenus();

    this.router.navigateByUrl(
      '/perfil'
    );
  }

  goOrders(): void {
    this.closeAllMenus();

    const role =
      (
        this.auth.session()?.role ?? ''
      ).toUpperCase();

    const target =
      role === 'ADMIN'
        ? '/admin/orders'
        : '/orders';

    this.router.navigateByUrl(target);
  }

  goAdminHome(): void {
    this.closeAllMenus();

    this.router.navigateByUrl(
      '/admin'
    );
  }

  goAdminProducts(): void {
    this.closeAllMenus();

    this.router.navigateByUrl(
      '/admin/products'
    );
  }

  goAdminCustomers(): void {
    this.closeAllMenus();

    this.router.navigateByUrl(
      '/admin/customers'
    );
  }

  goManagePurchases(): void {
    this.closeAllMenus();

    this.router.navigateByUrl(
      '/admin/purchases'
    );
  }

  openProductsMenu(): void {
    if (window.innerWidth <= 768) {
      return;
    }

    this.cancelDropdownClose();

    this.productsOpen.set(true);
    this.activeDropdown.set(null);
    this.userMenuOpen.set(false);
  }

  closeProductsMenu(): void {
    if (window.innerWidth <= 768) {
      return;
    }

    this.productsOpen.set(false);
  }

  toggleProductsMenu(
    event: Event
  ): void {

    event.preventDefault();
    event.stopPropagation();

    const next =
      !this.productsOpen();

    this.productsOpen.set(next);

    this.activeDropdown.set(null);
    this.userMenuOpen.set(false);
  }

  openDropdown(
    dropdown:
      'perfumes'
      | 'insumos'
      | 'cuidado'
  ): void {

    if (window.innerWidth <= 768) {
      return;
    }

    this.cancelDropdownClose();

    this.activeDropdown.set(
      dropdown
    );

    this.productsOpen.set(false);
    this.userMenuOpen.set(false);
  }

  scheduleDropdownClose(): void {
    if (window.innerWidth <= 768) {
      return;
    }

    this.cancelDropdownClose();

    this.dropdownCloseTimer =
      setTimeout(
        () => {
          this.activeDropdown.set(null);
        },
        180
      );
  }

  cancelDropdownClose(): void {
    if (!this.dropdownCloseTimer) {
      return;
    }

    clearTimeout(
      this.dropdownCloseTimer
    );

    this.dropdownCloseTimer = null;
  }

  toggleLibraryMenu(
    event?: Event
  ): void {

    event?.preventDefault();
    event?.stopPropagation();

    this.libraryOpen.update(
      value => !value
    );
  }

  closeLibraryMenu(): void {
    this.libraryOpen.set(false);
  }

  private goToProductsRoute(
    category:
      ProductsCategory = 'all',
    brand:
      ProductsBrand = 'all'
  ): void {

    this.router.navigate(
      ['/productos'],
      {
        queryParams: {
          cat:
            category !== 'all'
              ? category
              : null,

          brand:
            brand !== 'all'
              ? brand
              : null,
        },
      }
    )
    .then(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  goProducts(
    category: ProductsCategory
  ): void {

    this.closeAllMenus();

    this.goToProductsRoute(
      category,
      'all'
    );
  }

  goProductsByBrand(
    brand: ProductsBrand
  ): void {

    this.closeAllMenus();

    this.goToProductsRoute(
      'perfumes',
      brand
    );
  }

  resetProductsFilters(): void {
    this.closeAllMenus();

    this.goToProductsRoute(
      'all',
      'all'
    );
  }

  goFaq(
    code:
      'como-compro'
      | 'metodos-envio'
  ): void {

    this.closeAllMenus();

    this.router.navigate(
      ['/'],
      {
        fragment: 'faq',

        queryParams: {
          faq: code,
        },
      }
    );
  }

  goContactoForm(): void {
    this.closeAllMenus();

    this.router.navigateByUrl(
      '/contacto'
    );
  }

  @HostListener(
    'document:click',
    ['$event']
  )
  onDocClick(
    event: MouseEvent
  ): void {

    const target =
      event.target as HTMLElement;

    if (
      target.closest('.mega-wrapper')
      ||
      target.closest('.dropdown-wrapper')
      ||
      target.closest('.user-menu')
    ) {
      return;
    }

    this.cancelDropdownClose();

    this.productsOpen.set(false);
    this.activeDropdown.set(null);
    this.adminOpen.set(false);
    this.libraryOpen.set(false);
    this.userMenuOpen.set(false);
  }

  @HostListener(
    'window:resize'
  )
  onResize(): void {

    const desktop =
      window.innerWidth > 768;

    this.isDesktop.set(desktop);

    if (desktop) {
      this.menuOpen.set(false);

      document.body.style.removeProperty(
        'overflow'
      );

      return;
    }

    this.cancelDropdownClose();

    this.productsOpen.set(false);
    this.activeDropdown.set(null);
    this.adminOpen.set(false);
    this.userMenuOpen.set(false);
  }

  @HostListener(
    'document:keydown.escape'
  )
  onEscape(): void {

    this.cancelDropdownClose();

    this.menuOpen.set(false);
    this.productsOpen.set(false);
    this.activeDropdown.set(null);
    this.libraryOpen.set(false);
    this.userMenuOpen.set(false);

    document.body.style.removeProperty(
      'overflow'
    );
  }
}
