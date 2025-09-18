import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
// Remove ToastrService import as we'll use a simple alert for now

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  selectedChemistry: string = '';
  selectedFormat: string = '';
  selectedApplication: string = '';

  chemistries: string[] = ['Todos', 'LiFePO4', 'Li-Ion', 'Na-Ion'];
  formats: string[] = ['Todos', 'Prismática', '18650', '26650', '32700', 'BMS','Personalizada'];
  applications: string[] = ['Todos', 'Vehículos Eléctricos', 'Paneles Solares', 'Herramientas', 'Dispositivos Electrónicos', 'UPS/No Break', 'Almacenamiento Energía Solar', 'Bicicletas Eléctricas', 'Vapes', 'Linternas', 'Sistemas Aislados', 'General'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    
    // Escuchar cambios en los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedChemistry = params['chemistry'] || '';
      this.selectedFormat = params['format'] || '';
      this.selectedApplication = params['application'] || '';
      this.filterProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    let result = this.products;
    
    // Filtrar por búsqueda
    if (this.searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.chemistry.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.format.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.application.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    // Filtrar por química
    if (this.selectedChemistry && this.selectedChemistry !== 'Todos') {
      result = result.filter(product => product.chemistry === this.selectedChemistry);
    }
    
    // Filtrar por formato
    if (this.selectedFormat && this.selectedFormat !== 'Todos') {
      result = result.filter(product => product.format === this.selectedFormat);
    }
    
    // Filtrar por aplicación
    if (this.selectedApplication && this.selectedApplication !== 'Todos') {
      result = result.filter(product => product.application === this.selectedApplication);
    }
    
    this.filteredProducts = result;
  }

  onChemistryChange(chemistry: string): void {
    this.selectedChemistry = chemistry === 'Todos' ? '' : chemistry;
    this.filterProducts();
  }
  
  onFormatChange(format: string): void {
    this.selectedFormat = format === 'Todos' ? '' : format;
    this.filterProducts();
  }
  
  onApplicationChange(application: string): void {
    this.selectedApplication = application === 'Todos' ? '' : application;
    this.filterProducts();
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(product);
  }
}